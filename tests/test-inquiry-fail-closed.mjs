import { getLeadStorageAdapter } from "../src/lib/leads/storage.ts";
import { POST } from "../src/app/api/inquire/route.ts";

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

console.log("==================================================================");
console.log("  INQUIRY PERSISTENCE FAIL-CLOSED ARCHITECTURE TEST SUITE         ");
console.log("==================================================================");

// Save initial env
const originalEnv = { ...process.env };

async function runTests() {
  try {
    // -------------------------------------------------------------------------
    // TEST 1: Missing DB in production mode fails closed with HTTP 503
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 1: Production Mode Missing DB (Fail-Closed) ---");
    process.env.NODE_ENV = "production";
    process.env.LEADS_IP_SALT = "test-only-salt-for-fail-closed-checks";
    delete process.env.DATABASE_URL;
    delete process.env.POSTGRES_URL;
    delete process.env.APP_DATABASE_URL;
    delete process.env.SUPABASE_DATABASE_URL;

    const { adapter, mode } = getLeadStorageAdapter();
    assert(adapter === null, "Storage adapter is null in production when DB unconfigured");
    assert(mode === "unconfigured_production", "Mode is explicitly unconfigured_production");

    // Call POST handler
    const req = new Request("http://localhost:3000/api/inquire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Production Test User",
        email: "prod-test@example.com",
        companyOrWebsite: "Acme Corp",
        service: "nuuvixx-secure",
        problem: "Testing production fail-closed behavior without database.",
        consent: true,
      }),
    });

    const res = await POST(req);
    assert(res.status === 503, `API returns HTTP 503 (got ${res.status})`);
    const json = await res.json();
    assert(json.success === false, "Response success is false");
    assert(json.error.includes("scheduled infrastructure updates") || json.error.includes("email"), "Helpful fallback contact guidance provided");

    // -------------------------------------------------------------------------
    // TEST 2: Unreachable Database in production returns HTTP 503 (No False Success)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 2: Unreachable Database Host (No False Success) ---");
    process.env.NODE_ENV = "production";
    // Set unreachable mock port on localhost that refuses connection
    process.env.DATABASE_URL = "postgresql://invalid_user:invalid_pass@127.0.0.1:54399/invalid_db";

    const reqUnreachable = new Request("http://localhost:3000/api/inquire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Unreachable DB User",
        email: "unreachable@example.com",
        companyOrWebsite: "Offline DB Corp",
        service: "commerce-rescue",
        problem: "Testing database connection refusal failure response.",
        consent: true,
      }),
    });

    const resUnreachable = await POST(reqUnreachable);
    assert(resUnreachable.status === 503, `API returns HTTP 503 when DB is unreachable (got ${resUnreachable.status})`);
    const jsonUnreachable = await resUnreachable.json();
    assert(jsonUnreachable.success === false, "Response success is false on DB failure");

    // -------------------------------------------------------------------------
    // TEST 3: Development Mode allows local file fallback
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 3: Development Mode Local Fallback ---");
    process.env.NODE_ENV = "development";
    delete process.env.DATABASE_URL;
    delete process.env.POSTGRES_URL;
    delete process.env.APP_DATABASE_URL;
    delete process.env.SUPABASE_DATABASE_URL;

    const devStorage = getLeadStorageAdapter();
    assert(devStorage.mode === "local_dev", "Development mode safely falls back to local_dev");
    assert(devStorage.adapter !== null, "Development adapter is instantiated");

    console.log("\n==================================================================");
    console.log(`✅ ALL ${passedTests}/${totalTests} INQUIRY PERSISTENCE TESTS PASSED!`);
    console.log("==================================================================");
  } finally {
    process.env = originalEnv;
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});

