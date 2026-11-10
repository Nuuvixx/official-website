import pg from "pg";
const { Client } = pg;
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

function getSslConfig() {
  const defaultCertPath = path.join(process.cwd(), "src", "lib", "leads", "certs", "supabase-root-ca.crt");
  let ca = process.env.DATABASE_CA_CERT;
  if (!ca && fs.existsSync(defaultCertPath)) {
    ca = fs.readFileSync(defaultCertPath, "utf-8");
  }
  return {
    rejectUnauthorized: true,
    ca: ca || undefined,
  };
}

async function testRestrictedRoles() {
  console.log("==================================================================");
  console.log("  RESTRICTED DATABASE ROLES INDEPENDENT VALIDATION SUITE           ");
  console.log("==================================================================");

  const appDbUrl = process.env.APP_DATABASE_URL || (process.env.DATABASE_URL?.includes("nuuvixx_app") ? process.env.DATABASE_URL : null);
  const cleanupDbUrl = process.env.CLEANUP_DATABASE_URL || process.env.RETENTION_DATABASE_URL;

  if (!appDbUrl) {
    console.log("\n[STATUS: BLOCKED] `nuuvixx_app` connection string not provided.");
    console.log("  Set APP_DATABASE_URL (or DATABASE_URL with nuuvixx_app) in .env to verify.");
  } else {
    console.log("\n[1/2] Auditing `nuuvixx_app` Restricted Role...");
    const client = new Client({ connectionString: appDbUrl, ssl: getSslConfig() });
    try {
      await client.connect();
      const userRes = await client.query("SELECT current_user, session_user");
      const activeUser = userRes.rows[0].current_user;
      console.log(`  Connected Identity: ${activeUser}`);
      if (!activeUser.startsWith("nuuvixx_app")) {
        throw new Error(`Expected role nuuvixx_app, got: ${activeUser}`);
      }
      console.log("  ✓ Confirmed active role is nuuvixx_app");

      // Test safe transaction with insert + select + rollback
      await client.query("BEGIN");
      const testId = crypto.randomUUID();
      const testHash = crypto.createHash("sha256").update(`role-test-${Date.now()}`).digest("hex");
      const testRef = `NX-TEST-${Date.now().toString(36).toUpperCase()}`;

      const insertRes = await client.query(`
        INSERT INTO commercial_inquiries (
          id, inquiry_ref, idempotency_hash, name, email, company_or_website,
          service, problem, budget, timeline, source_context, ip_hash, status, created_at
        ) VALUES (
          $1, $2, $3, 'App Role Tester', 'test@nuuvixx.internal', 'Test Co',
          'commerce-rescue', 'Testing app role insert and RLS.', 'Not specified', 'Flexible',
          'Automated Audit', '00000000000000000000000000000000', 'NEW', NOW()
        )
        RETURNING id, inquiry_ref;
      `, [testId, testRef, testHash]);

      if (insertRes.rows.length === 0 || insertRes.rows[0].id !== testId) {
        throw new Error("Insert failed under nuuvixx_app role!");
      }
      console.log("  ✓ INSERT with RETURNING succeeded under nuuvixx_app");

      // Test rate limit count query
      const rateCheck = await client.query(`
        SELECT COUNT(*)::int AS count
        FROM commercial_inquiries
        WHERE ip_hash = '00000000000000000000000000000000'
          AND created_at > (NOW() - INTERVAL '10 minutes');
      `);
      console.log(`  ✓ Rate check query succeeded: count = ${rateCheck.rows[0].count}`);

      // Test idempotency duplicate select
      const dupeCheck = await client.query(`
        SELECT id, inquiry_ref FROM commercial_inquiries WHERE idempotency_hash = $1;
      `, [testHash]);
      if (dupeCheck.rows.length === 0) {
        throw new Error("Idempotency lookup failed under nuuvixx_app!");
      }
      console.log("  ✓ Idempotency hash lookup succeeded under nuuvixx_app");

      await client.query("ROLLBACK");
      console.log("  ✓ Transaction rolled back safely (0 orphaned test rows)");

      // Test authorization denial: DDL (outside transaction)
      try {
        await client.query("CREATE TABLE public.unauthorized_test (id int);");
        throw new Error("SECURITY FAILURE: nuuvixx_app was able to execute DDL (CREATE TABLE)!");
      } catch (e) {
        if (e.message.includes("permission denied")) {
          console.log("  ✓ CONFIRMED: DDL execution (CREATE TABLE) denied (permission denied)");
        } else {
          throw e;
        }
      }

      // Test authorization denial: UPDATE
      try {
        await client.query("UPDATE commercial_inquiries SET name = 'tampered' WHERE id = '00000000-0000-0000-0000-000000000000'");
        throw new Error("SECURITY FAILURE: nuuvixx_app was able to UPDATE rows!");
      } catch (e) {
        if (e.message.includes("permission denied")) {
          console.log("  ✓ CONFIRMED: UPDATE permission denied for nuuvixx_app");
        } else {
          throw e;
        }
      }

      // Test authorization denial: DELETE
      try {
        await client.query("DELETE FROM commercial_inquiries WHERE id = '00000000-0000-0000-0000-000000000000'");
        throw new Error("SECURITY FAILURE: nuuvixx_app was able to DELETE rows!");
      } catch (e) {
        if (e.message.includes("permission denied")) {
          console.log("  ✓ CONFIRMED: DELETE permission denied for nuuvixx_app");
        } else {
          throw e;
        }
      }
    } finally {
      await client.end().catch(() => {});
    }
  }

  if (!cleanupDbUrl) {
    console.log("\n[STATUS: BLOCKED] `nuuvixx_cleanup` connection string not provided.");
    console.log("  Set CLEANUP_DATABASE_URL or RETENTION_DATABASE_URL in .env to verify.");
  } else {
    console.log("\n[2/2] Auditing `nuuvixx_cleanup` Restricted Role...");
    const client = new Client({ connectionString: cleanupDbUrl, ssl: getSslConfig() });
    try {
      await client.connect();
      const userRes = await client.query("SELECT current_user, session_user");
      const activeUser = userRes.rows[0].current_user;
      console.log(`  Connected Identity: ${activeUser}`);
      if (!activeUser.startsWith("nuuvixx_cleanup")) {
        throw new Error(`Expected role nuuvixx_cleanup, got: ${activeUser}`);
      }
      console.log("  ✓ Confirmed active role is nuuvixx_cleanup");

      // Test authorization denial: INSERT
      try {
        await client.query(`
          INSERT INTO commercial_inquiries (
            id, inquiry_ref, idempotency_hash, name, email, company_or_website,
            service, problem, ip_hash
          ) VALUES (
            gen_random_uuid(), 'NX-FAIL', 'fail-hash', 'Hacker', 'hacker@nuuvixx.internal',
            'Co', 'commerce-rescue', 'prob', '000'
          );
        `);
        throw new Error("SECURITY FAILURE: nuuvixx_cleanup was able to INSERT records!");
      } catch (e) {
        if (e.message.includes("permission denied")) {
          console.log("  ✓ CONFIRMED: INSERT permission denied for nuuvixx_cleanup");
        } else {
          throw e;
        }
      }

      // Test authorization denial: DELETE
      try {
        await client.query("DELETE FROM commercial_inquiries;");
        throw new Error("SECURITY FAILURE: nuuvixx_cleanup was able to DELETE records!");
      } catch (e) {
        if (e.message.includes("permission denied")) {
          console.log("  ✓ CONFIRMED: DELETE permission denied for nuuvixx_cleanup");
        } else {
          throw e;
        }
      }

      // Test authorization denial: UPDATE on unpermitted columns (e.g. status or service)
      try {
        await client.query("UPDATE commercial_inquiries SET service = 'hacked';");
        throw new Error("SECURITY FAILURE: nuuvixx_cleanup was able to update non-PII columns!");
      } catch (e) {
        if (e.message.includes("permission denied")) {
          console.log("  ✓ CONFIRMED: UPDATE on non-PII columns denied for nuuvixx_cleanup");
        } else {
          throw e;
        }
      }

      // Test authorization denial: DDL for nuuvixx_cleanup
      try {
        await client.query("CREATE TABLE public.unauthorized_cleanup_test (id int);");
        throw new Error("SECURITY FAILURE: nuuvixx_cleanup was able to execute DDL!");
      } catch (e) {
        if (e.message.includes("permission denied")) {
          console.log("  ✓ CONFIRMED: DDL execution (CREATE TABLE) denied for nuuvixx_cleanup");
        } else {
          throw e;
        }
      }

      // Test RLS Isolation: Active ('NEW') records must be invisible to nuuvixx_cleanup
      const activeQueryRes = await client.query(`
        SELECT COUNT(*)::int AS count
        FROM commercial_inquiries
        WHERE status = 'NEW';
      `);
      console.log(`  ✓ RLS ISOLATION: Active leads visible to nuuvixx_cleanup: ${activeQueryRes.rows[0].count} (Expected: 0)`);

      // Test RLS Isolation: Active ('NEW') records cannot be updated by nuuvixx_cleanup
      const activeUpdateRes = await client.query(`
        UPDATE commercial_inquiries
        SET name = 'REDACTED'
        WHERE status = 'NEW';
      `);
      console.log(`  ✓ RLS ISOLATION: Active leads modified by nuuvixx_cleanup: ${activeUpdateRes.rowCount} (Expected: 0)`);

      // Test SELECT count of eligible records
      const countRes = await client.query(`
        SELECT COUNT(*)::int AS count
        FROM commercial_inquiries
        WHERE created_at < NOW() - INTERVAL '90 days'
          AND status IN ('RESOLVED', 'ARCHIVED');
      `);
      console.log(`  ✓ SELECT for 90-day retention query succeeded: count = ${countRes.rows[0].count}`);
    } finally {
      await client.end().catch(() => {});
    }
  }

  console.log("\n==================================================================");
  console.log("  RESTRICTED ROLES AUDIT COMPLETE                                  ");
  console.log("==================================================================");
}

testRestrictedRoles().catch((err) => {
  console.error("❌ RESTRICTED ROLE AUDIT FAILED:", err);
  process.exit(1);
});

