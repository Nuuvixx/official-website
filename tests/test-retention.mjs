import fs from "node:fs/promises";
import path from "node:path";
import pg from "pg";
const { Client } = pg;

async function testRetention() {
  console.log("==================================================================");
  console.log("  90-DAY RETENTION CLEANUP ROLE & RLS VERIFICATION TEST           ");
  console.log("==================================================================");

  const adminDbUrl = process.env.ADMIN_DATABASE_URL || process.env.DATABASE_URL;
  const cleanupDbUrl = process.env.CLEANUP_DATABASE_URL || process.env.RETENTION_DATABASE_URL;

  if (!cleanupDbUrl) {
    throw new Error("CLEANUP_DATABASE_URL / RETENTION_DATABASE_URL is missing.");
  }

  const caCertPath = path.join(process.cwd(), "src", "lib", "leads", "certs", "supabase-root-ca.crt");
  const ca = await fs.readFile(caCertPath, "utf-8");

  // Admin client for test fixture seeding and cleanup
  const adminClient = new Client({
    connectionString: adminDbUrl,
    ssl: { rejectUnauthorized: true, ca },
  });
  await adminClient.connect();

  // Cleanup client connecting as restricted nuuvixx_cleanup role
  const cleanupClient = new Client({
    connectionString: cleanupDbUrl,
    ssl: { rejectUnauthorized: true, ca },
  });
  await cleanupClient.connect();

  const userCheck = await cleanupClient.query("SELECT current_user, session_user");
  console.log(`[OK] Cleanup client connected as: '${userCheck.rows[0].current_user}' (STRICT TLS VERIFIED).`);
  if (!userCheck.rows[0].current_user.startsWith("nuuvixx_cleanup")) {
    throw new Error(`Expected role nuuvixx_cleanup, got ${userCheck.rows[0].current_user}`);
  }

  // Pre-clean prior test records
  await adminClient.query("DELETE FROM commercial_inquiries WHERE email LIKE '%@retention-test.internal'");

  // 1. Old (100 days) + RESOLVED -> Eligible for PII redaction
  const idOldResolved = "11111111-1111-4111-8111-111111111111";
  await adminClient.query(`
    INSERT INTO commercial_inquiries (
      id, inquiry_ref, idempotency_hash, name, email, company_or_website,
      service, problem, ip_hash, status, created_at
    ) VALUES (
      $1::uuid, 'inq_ret_01', 'ret_hash_01', 'Old Resolved Customer', 'old.resolved@retention-test.internal', 'OldCo',
      'commerce-rescue', 'Original customer sensitive problem description.', 'hash1', 'RESOLVED', NOW() - INTERVAL '100 days'
    )
  `, [idOldResolved]);

  // 2. Recent (10 days) + RESOLVED -> Ineligible (< 90 days)
  const idRecentResolved = "22222222-2222-4222-8222-222222222222";
  await adminClient.query(`
    INSERT INTO commercial_inquiries (
      id, inquiry_ref, idempotency_hash, name, email, company_or_website,
      service, problem, ip_hash, status, created_at
    ) VALUES (
      $1::uuid, 'inq_ret_02', 'ret_hash_02', 'Recent Customer', 'recent@retention-test.internal', 'RecentCo',
      'commerce-rescue', 'Recent problem statement.', 'hash2', 'RESOLVED', NOW() - INTERVAL '10 days'
    )
  `, [idRecentResolved]);

  // 3. Old (100 days) + NEW (Active) -> Ineligible (Must NEVER be redacted)
  const idOldNew = "33333333-3333-4333-8333-333333333333";
  await adminClient.query(`
    INSERT INTO commercial_inquiries (
      id, inquiry_ref, idempotency_hash, name, email, company_or_website,
      service, problem, ip_hash, status, created_at
    ) VALUES (
      $1::uuid, 'inq_ret_03', 'ret_hash_03', 'Old Active Customer', 'old.active@retention-test.internal', 'ActiveCo',
      'commerce-rescue', 'Old unresolved issue.', 'hash3', 'NEW', NOW() - INTERVAL '100 days'
    )
  `, [idOldNew]);

  console.log("[INFO] Seeded 3 synthetic test fixtures. Running retention query as `nuuvixx_cleanup`...");

  // Execute retention update strictly using cleanupClient (nuuvixx_cleanup role)
  const purgeRes = await cleanupClient.query(`
    UPDATE commercial_inquiries
    SET name = 'REDACTED',
        email = 'redacted@nuuvixx.internal',
        company_or_website = 'REDACTED',
        problem = '[RETENTION PURGED]'
    WHERE created_at < NOW() - INTERVAL '90 days'
      AND status IN ('RESOLVED', 'ARCHIVED')
      AND (name != 'REDACTED' OR email != 'redacted@nuuvixx.internal')
    RETURNING id;
  `);

  console.log(`[INFO] Rows redacted by nuuvixx_cleanup: ${purgeRes.rows.length}`);
  if (purgeRes.rows.length !== 1 || purgeRes.rows[0].id !== idOldResolved) {
    throw new Error(`Expected exactly 1 row (idOldResolved) to be purged, got: ${JSON.stringify(purgeRes.rows)}`);
  }
  console.log("  ✓ PASS: Eligible record (>90d, RESOLVED) successfully redacted by nuuvixx_cleanup.");

  // Verify fields via adminClient
  const recOldResolved = await adminClient.query("SELECT * FROM commercial_inquiries WHERE id = $1", [idOldResolved]);
  if (recOldResolved.rows[0].name !== "REDACTED" || recOldResolved.rows[0].email !== "redacted@nuuvixx.internal") {
    throw new Error("Old resolved customer PII was not properly redacted!");
  }

  const recRecent = await adminClient.query("SELECT * FROM commercial_inquiries WHERE id = $1", [idRecentResolved]);
  if (recRecent.rows[0].name !== "Recent Customer") {
    throw new Error("Recent customer was unexpectedly modified!");
  }
  console.log("  ✓ PASS: Recent resolved inquiry (< 90 days) preserved untouched.");

  const recOldNew = await adminClient.query("SELECT * FROM commercial_inquiries WHERE id = $1", [idOldNew]);
  if (recOldNew.rows[0].name !== "Old Active Customer") {
    throw new Error("Old active customer was unexpectedly modified!");
  }
  console.log("  ✓ PASS: Old active inquiry (status NEW) preserved untouched.");

  // Clean up synthetic records via adminClient
  await adminClient.query("DELETE FROM commercial_inquiries WHERE id IN ($1, $2, $3)", [idOldResolved, idRecentResolved, idOldNew]);
  console.log("[INFO] Cleaned up synthetic fixtures.");

  await cleanupClient.end();
  await adminClient.end();
  console.log("\n==================================================================");
  console.log("  RETENTION VERIFICATION COMPLETE: ALL CHECKS PASSED!");
  console.log("==================================================================");
}

testRetention().catch((err) => {
  console.error("❌ RETENTION TEST FAILED:", err);
  process.exit(1);
});
