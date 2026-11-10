import { analyzeSecuritySnippet } from "../src/lib/secure/analyzer.ts";
import {
  SAMPLE_VULNERABLE_ACTION,
  SAMPLE_SQL_MIGRATION,
  SAMPLE_HARDENED_APP,
} from "../src/lib/secure/sampleSnippets.ts";

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  passedTests++;
  console.log(`  ✓ PASS: ${message}`);
}

console.log("==================================================================");
console.log("  NUUVIXX SECURE: STATIC SECURITY & RLS ANALYZER TEST SUITE      ");
console.log("==================================================================");

// --- TEST GROUP 1: Vulnerable Vibe-Coded App ---
console.log("\n--- TEST GROUP 1: Vulnerable Vibe-Coded Next.js Action ---");
const vuln1Result = analyzeSecuritySnippet(SAMPLE_VULNERABLE_ACTION.code, SAMPLE_VULNERABLE_ACTION.filename);

assert(vuln1Result.criticalCount >= 2, `Detected at least 2 critical issues (got ${vuln1Result.criticalCount})`);
assert(vuln1Result.tenantIsolationStatus === "breached", "Tenant isolation status is BREACHED");
assert(vuln1Result.score < 50, `Health score heavily penalized (got ${vuln1Result.score})`);

const leakedKeyFinding = vuln1Result.findings.find((f) => f.ruleId === "SEC_SUPABASE_SERVICE_KEY_LEAK");
assert(leakedKeyFinding !== undefined, "Found SEC_SUPABASE_SERVICE_KEY_LEAK");
assert(leakedKeyFinding.cwe === "CWE-798", "CWE-798 associated with leaked secret");

const unauthActionFinding = vuln1Result.findings.find((f) => f.ruleId === "SEC_UNAUTHENTICATED_SERVER_ACTION");
assert(unauthActionFinding !== undefined, "Found SEC_UNAUTHENTICATED_SERVER_ACTION");
assert(unauthActionFinding.lineStart > 0, "Line number accurately identified");

// --- TEST GROUP 2: Permissive SQL & Concatenation ---
console.log("\n--- TEST GROUP 2: Permissive SQL & Direct SQL Concatenation ---");
const vuln2Result = analyzeSecuritySnippet(SAMPLE_SQL_MIGRATION.code, SAMPLE_SQL_MIGRATION.filename);

assert(vuln2Result.findings.some((f) => f.ruleId === "SEC_PERMISSIVE_RLS_POLICY"), "Detected permissive RLS policy");
assert(vuln2Result.findings.some((f) => f.ruleId === "SEC_UNSAFE_DIRECT_SQL"), "Detected unsafe direct SQL concatenation");
assert(vuln2Result.tenantIsolationStatus === "breached", "Permissive RLS flags tenant isolation breach");

// --- TEST GROUP 3: Hardened Secure Application ---
console.log("\n--- TEST GROUP 3: Hardened Clean Application ---");
const cleanResult = analyzeSecuritySnippet(SAMPLE_HARDENED_APP.code, SAMPLE_HARDENED_APP.filename);

assert(cleanResult.findings.length === 0, `Clean code produces 0 findings (got ${cleanResult.findings.length})`);
assert(cleanResult.score === 100, `Clean code receives 100/100 score (got ${cleanResult.score})`);
assert(cleanResult.tenantIsolationStatus === "intact", "Tenant isolation verified intact");

// --- TEST GROUP 4: Custom Edge Cases ---
console.log("\n--- TEST GROUP 4: Custom Edge Cases ---");
// Test: Template literal SQL injection
const customSql = `const res = await db.query(\`SELECT * FROM accounts WHERE id = '\${accountId}'\`);`;
const sqlResult = analyzeSecuritySnippet(customSql, "db.ts");
assert(sqlResult.findings.some((f) => f.ruleId === "SEC_UNSAFE_DIRECT_SQL"), "Template literal SQL injection detected");

// Test: Client component referencing service role key
const clientComponent = `"use client";\nconst key = process.env.SUPABASE_SERVICE_ROLE_KEY;\nexport function Button() { return <button/>; }`;
const clientResult = analyzeSecuritySnippet(clientComponent, "Button.tsx");
assert(clientResult.findings.some((f) => f.ruleId === "SEC_SUPABASE_SERVICE_KEY_LEAK"), "Client component service key leak detected");

console.log("\n==================================================================");
console.log(`✅ ALL ${passedTests}/${totalTests} NUUVIXX SECURE TESTS PASSED!`);
console.log("==================================================================");

