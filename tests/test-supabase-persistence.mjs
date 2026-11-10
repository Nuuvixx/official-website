import { spawn, execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import pg from "pg";
const { Client } = pg;

const TEST_PORT = 4325;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runVerification() {
  console.log("==================================================================");
  console.log("  NUUVIXX PHASE 3: LIVE SUPABASE POSTGRESQL PERSISTENCE TEST SUITE ");
  console.log("==================================================================");

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not defined in process.env");
  }

  // Generate dynamic test run octet to prevent in-memory IP collisions on repeated runs
  const runOctet = Math.floor(Math.random() * 200) + 10;
  const testIp1 = `198.51.${runOctet}.10`;
  const rateLimitIp = `198.51.${runOctet}.99`;

  // 1. Establish direct database connection for verification & cleanup with strict TLS verification
  const caCertPath = path.join(process.cwd(), "src", "lib", "leads", "certs", "supabase-root-ca.crt");
  const ca = await fs.readFile(caCertPath, "utf-8");
  const dbClient = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: true, ca },
  });
  await dbClient.connect();

  const userCheck = await dbClient.query("SELECT current_user, session_user");
  console.log(`[OK] Direct verification client connected as role: '${userCheck.rows[0].current_user}' (STRICT TLS VERIFIED).`);

  // Authorize test cleanup client for synthetic test records only
  let cleanupClient = null;
  if (process.env.ADMIN_DATABASE_URL) {
    cleanupClient = new Client({
      connectionString: process.env.ADMIN_DATABASE_URL,
      ssl: { rejectUnauthorized: true, ca },
    });
    await cleanupClient.connect();
  }

  // Pre-cleanup of any prior synthetic test leads
  await (cleanupClient || dbClient).query("DELETE FROM commercial_inquiries WHERE email LIKE '%@nuuvixx-test.internal'");

  // 2. Launch Next.js production server with DATABASE_URL loaded
  console.log(`[INFO] Spawning Next.js production server on port ${TEST_PORT}...`);
  const nextProcess = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "start", "-p", String(TEST_PORT)],
    {
      cwd: process.cwd(),
      shell: true,
      env: {
        ...process.env,
        PORT: String(TEST_PORT),
        NODE_ENV: "production",
      },
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  function stopNextServer() {
    if (nextProcess && nextProcess.pid) {
      try {
        if (process.platform === "win32") {
          execSync(`taskkill /pid ${nextProcess.pid} /T /F`, { stdio: "ignore" });
        } else {
          nextProcess.kill("SIGTERM");
        }
      } catch {}
    }
  }

  // Wait for server to become responsive
  const startWait = Date.now();
  let serverReady = false;
  while (!serverReady && Date.now() - startWait < 20000) {
    try {
      const res = await fetch(`${BASE_URL}/api/inquire`, { method: "GET" }).catch(() => null);
      if (res && res.status === 405) {
        serverReady = true;
        break;
      }
    } catch {}
    await sleep(400);
  }

  if (!serverReady) {
    stopNextServer();
    await dbClient.end();
    throw new Error("Next.js server failed to respond within 20 seconds.");
  }
  console.log(`[OK] Next.js production server responsive on ${BASE_URL}\n`);

  try {
    // -------------------------------------------------------------------------
    // TEST 1 & 2: Submit a synthetic test inquiry
    // -------------------------------------------------------------------------
    console.log("--- STEP 1 & 2: Synthetic Commercial Inquiry Submission ---");
    const syntheticLead1 = {
      name: "Alex Vance",
      email: "qa-synthetic-lead-01@nuuvixx-test.internal",
      companyOrWebsite: "Apex Commerce Ltd",
      service: "commerce-rescue",
      problem: "Intermittent database connection pool exhaustion during flash sales on Shopify Plus integration.",
      budget: "$25k - $50k",
      timeline: "Immediate (within 48 hours)",
      sourceContext: "Commerce Rescue landing page",
      consent: true,
    };

    const res1 = await fetch(`${BASE_URL}/api/inquire`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": testIp1,
      },
      body: JSON.stringify(syntheticLead1),
    });

    assert(res1.status === 200, "API returned HTTP 200 OK for valid synthetic inquiry");
    const body1 = await res1.json();
    assert(body1.success === true, "Response payload indicated success = true");
    assert(typeof body1.inquiryId === "string" && body1.inquiryId.startsWith("inq_"), "Received reference ID formatted as inq_*");
    console.log(`  -> Inquiry ID generated: ${body1.inquiryId}`);

    // -------------------------------------------------------------------------
    // TEST 3 & 4: Confirm record stored in Supabase PostgreSQL & verify fields
    // -------------------------------------------------------------------------
    console.log("\n--- STEP 3 & 4: Live Supabase PostgreSQL Verification ---");
    const dbQuery1 = await dbClient.query(
      "SELECT * FROM commercial_inquiries WHERE email = $1",
      [syntheticLead1.email]
    );

    assert(dbQuery1.rows.length === 1, "Exactly 1 record persisted in Supabase commercial_inquiries");
    const stored = dbQuery1.rows[0];

    assert(stored.name === syntheticLead1.name, "Persisted name matches input");
    assert(stored.email === syntheticLead1.email, "Persisted email matches input");
    assert(stored.company_or_website === syntheticLead1.companyOrWebsite, "Persisted company matches input");
    assert(stored.service === syntheticLead1.service, "Persisted service division matches input");
    assert(stored.problem === syntheticLead1.problem, "Persisted problem description matches input");
    assert(stored.budget === syntheticLead1.budget, "Persisted budget matches input");
    assert(stored.timeline === syntheticLead1.timeline, "Persisted timeline matches input");
    assert(stored.source_context === syntheticLead1.sourceContext, "Persisted source_context matches input");
    assert(stored.status === "NEW", "Initial lead status is 'NEW'");
    assert(stored.ip_hash.length === 32, "Client IP is stored as 32-char HMAC hash (GDPR zero-PII)");
    assert(stored.idempotency_hash.length === 64, "Idempotency hash is 64-char SHA-256");

    // -------------------------------------------------------------------------
    // TEST 5: Verify generated reference ID
    // -------------------------------------------------------------------------
    console.log("\n--- STEP 5: Reference ID Integrity Verification ---");
    assert(stored.inquiry_ref === body1.inquiryId, "Database inquiry_ref matches client returned inquiryId");
    assert(/^inq_\d+_[a-f0-9]{8}$/.test(stored.inquiry_ref), "Reference ID strictly matches format: inq_<timestamp>_<hex8>");

    // -------------------------------------------------------------------------
    // TEST 6: Deduplication & Idempotency
    // -------------------------------------------------------------------------
    console.log("\n--- STEP 6: Deduplication & Idempotency Testing ---");
    const resDup = await fetch(`${BASE_URL}/api/inquire`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": testIp1,
      },
      body: JSON.stringify(syntheticLead1),
    });

    assert(resDup.status === 200, "Duplicate submission returned HTTP 200 OK");
    const bodyDup = await resDup.json();
    assert(bodyDup.success === true, "Duplicate submission handled gracefully");
    assert(bodyDup.inquiryId === body1.inquiryId, "Duplicate submission returned the original inquiry reference ID");

    const dbQueryDup = await dbClient.query(
      "SELECT COUNT(*)::int AS count FROM commercial_inquiries WHERE idempotency_hash = $1",
      [stored.idempotency_hash]
    );
    assert(dbQueryDup.rows[0].count === 1, "Database still contains exactly 1 row (duplicate insert suppressed)");

    // -------------------------------------------------------------------------
    // TEST 7: Input Validation Boundaries
    // -------------------------------------------------------------------------
    console.log("\n--- STEP 7: Input Validation Boundaries ---");

    // 7a. Missing name
    const resBadName = await fetch(`${BASE_URL}/api/inquire`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": `198.51.${runOctet}.21` },
      body: JSON.stringify({ ...syntheticLead1, name: " " }),
    });
    assert(resBadName.status === 400, "Invalid name rejected with HTTP 400");

    // 7b. Invalid email
    const resBadEmail = await fetch(`${BASE_URL}/api/inquire`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": `198.51.${runOctet}.22` },
      body: JSON.stringify({ ...syntheticLead1, email: "invalid-email-address" }),
    });
    assert(resBadEmail.status === 400, "Invalid email rejected with HTTP 400");

    // 7c. Unlisted service division
    const resBadService = await fetch(`${BASE_URL}/api/inquire`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": `198.51.${runOctet}.23` },
      body: JSON.stringify({ ...syntheticLead1, service: "unsupported-division-xyz" }),
    });
    assert(resBadService.status === 400, "Unlisted service division rejected with HTTP 400");

    // 7d. Missing consent
    const resNoConsent = await fetch(`${BASE_URL}/api/inquire`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": `198.51.${runOctet}.24` },
      body: JSON.stringify({ ...syntheticLead1, consent: false }),
    });
    assert(resNoConsent.status === 400, "Missing consent rejected with HTTP 400");

    // 7e. Honeypot spam trap
    const resHoneypot = await fetch(`${BASE_URL}/api/inquire`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": `198.51.${runOctet}.25` },
      body: JSON.stringify({ ...syntheticLead1, email: "bot-trap@nuuvixx-test.internal", honeypot: "I am a spam bot" }),
    });
    assert(resHoneypot.status === 200, "Honeypot submission quietly accepted with HTTP 200");
    const checkBot = await dbClient.query("SELECT * FROM commercial_inquiries WHERE email = 'bot-trap@nuuvixx-test.internal'");
    assert(checkBot.rows.length === 0, "Honeypot bot lead was NOT saved to PostgreSQL");

    // 7f. Non-POST rejection
    const resGet = await fetch(`${BASE_URL}/api/inquire`, { method: "GET" });
    assert(resGet.status === 405, "GET request rejected with HTTP 405 Method Not Allowed");

    // -------------------------------------------------------------------------
    // TEST 8: Database-Backed Rate Limiting (Multi-request threshold)
    // -------------------------------------------------------------------------
    console.log("\n--- STEP 8: Rate Limiting Verification ---");
    let hitRateLimit = false;
    let rateLimitResponse = null;

    // Send 6 distinct inquiries from rateLimitIp (limit is 5 per 10 minutes)
    for (let i = 1; i <= 6; i++) {
      const resp = await fetch(`${BASE_URL}/api/inquire`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": rateLimitIp,
        },
        body: JSON.stringify({
          name: `Rate Tester ${i}`,
          email: `qa-rate-${i}@nuuvixx-test.internal`,
          companyOrWebsite: "Rate Limiting Corp",
          service: "nuuvixx-secure",
          problem: `Distinct problem description for rate test iteration ${i} with sufficient length.`,
          consent: true,
        }),
      });

      if (resp.status === 429) {
        hitRateLimit = true;
        rateLimitResponse = resp;
        break;
      }
    }

    assert(hitRateLimit === true, "Rate limiting successfully triggered HTTP 429 after exceeding quota");
    assert(rateLimitResponse?.headers.has("retry-after"), "HTTP 429 response includes Retry-After header");

    // -------------------------------------------------------------------------
    // TEST 9: Concurrent Submissions
    // -------------------------------------------------------------------------
    console.log("\n--- STEP 9: Concurrent Submissions Verification ---");
    const concurrencyCount = 5;
    const concurrentPromises = [];

    for (let i = 1; i <= concurrencyCount; i++) {
      concurrentPromises.push(
        fetch(`${BASE_URL}/api/inquire`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Forwarded-For": `198.51.${runOctet}.${100 + i}`,
          },
          body: JSON.stringify({
            name: `Concurrent User ${i}`,
            email: `qa-concurrent-${i}@nuuvixx-test.internal`,
            companyOrWebsite: `Concurrent Company ${i}`,
            service: "trade-intelligence",
            problem: `High concurrency stress test inquiry number ${i} verifying connection pool stability.`,
            consent: true,
          }),
        })
      );
    }

    const concurrentResults = await Promise.all(concurrentPromises);
    const allSuccessful = concurrentResults.every((r) => r.status === 200);
    assert(allSuccessful, `All ${concurrencyCount} concurrent submissions succeeded with HTTP 200`);

    const dbQueryConcurrent = await dbClient.query(
      "SELECT COUNT(*)::int AS count FROM commercial_inquiries WHERE email LIKE 'qa-concurrent-%@nuuvixx-test.internal'"
    );
    assert(
      dbQueryConcurrent.rows[0].count === concurrencyCount,
      `All ${concurrencyCount} concurrent records verified in Supabase PostgreSQL`
    );

    // -------------------------------------------------------------------------
    // TEST 10: Clean up ONLY synthetic test records
    // -------------------------------------------------------------------------
    console.log("\n--- STEP 10: Post-Test Synthetic Data Cleanup ---");
    const cleanupRes = await (cleanupClient || dbClient).query(
      "DELETE FROM commercial_inquiries WHERE email LIKE '%@nuuvixx-test.internal' RETURNING id"
    );
    console.log(`  -> Cleaned up ${cleanupRes.rows.length} synthetic test records.`);

    // Verify no test records remain
    const verifyClean = await dbClient.query(
      "SELECT COUNT(*)::int AS count FROM commercial_inquiries WHERE email LIKE '%@nuuvixx-test.internal'"
    );
    assert(verifyClean.rows[0].count === 0, "Verified all synthetic test records purged; zero orphaned test data");

    if (cleanupClient) {
      await cleanupClient.end().catch(() => {});
    }

    console.log("\n==================================================================");
    console.log(`  VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
    console.log("==================================================================");
  } finally {
    // Teardown
    console.log("[TEARDOWN] Stopping test Next.js server...");
    stopNextServer();
    await dbClient.end();
  }
}

runVerification().catch((err) => {
  console.error("\n[FATAL ERROR IN VERIFICATION]:", err);
  process.exit(1);
});
