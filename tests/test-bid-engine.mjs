import {
  extractTenderRequirements,
  generateBidMatrixCsv,
} from "../src/lib/bids/extractor.ts";
import {
  SAMPLE_TRANSIT_RFP,
  SAMPLE_HEALTHCARE_RFP,
} from "../src/lib/bids/sampleTenders.ts";

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
console.log("  NUUVIXX BID INTELLIGENCE: DOCUMENT ANALYZER TEST SUITE         ");
console.log("==================================================================");

// --- TEST GROUP 1: Transit Authority RFP ---
console.log("\n--- TEST GROUP 1: Transit Authority RFP Extraction ---");
const transitResult = extractTenderRequirements(
  SAMPLE_TRANSIT_RFP.content,
  SAMPLE_TRANSIT_RFP.filename
);

assert(transitResult.metadata.rfpNumber === "2026-IT-094", "Extracted RFP number #2026-IT-094");
assert(transitResult.metadata.title?.includes("Autonomous Dispatch"), "Extracted RFP title");
assert(transitResult.metadata.submissionDeadline?.includes("November 28, 2026"), "Extracted submission deadline");
assert(transitResult.metadata.preBidConference?.includes("November 14, 2026"), "Extracted mandatory pre-bid conference date");

assert(transitResult.passFailCount >= 3, `Identified mandatory pass/fail criteria (got ${transitResult.passFailCount})`);
assert(transitResult.criteria.some((c) => c.requirementText.includes("five (5) consecutive years")), "Extracted 5-year experience requirement");
assert(transitResult.criteria.some((c) => c.requirementText.includes("SOC2") || c.requirementText.includes("ISO")), "Extracted SOC2 / ISO certification requirement");
assert(transitResult.criteria.some((c) => c.category === "financial_compliance"), "Extracted 5% Bid Bond requirement");
assert(transitResult.criteria.some((c) => c.category === "legal_terms"), "Extracted Liquidated damages penalty");

// --- TEST GROUP 2: State Healthcare RFP ---
console.log("\n--- TEST GROUP 2: State Healthcare RFP Extraction ---");
const healthResult = extractTenderRequirements(
  SAMPLE_HEALTHCARE_RFP.content,
  SAMPLE_HEALTHCARE_RFP.filename
);

assert(healthResult.metadata.rfpNumber === "HHS-2026-CLOUD-901", "Extracted HHS Solicitation number");
assert(healthResult.criteria.some((c) => c.requirementText.includes("HITRUST")), "Extracted HITRUST certification mandate");
assert(healthResult.criteria.some((c) => c.requirementText.includes("10%")), "Extracted 10% Cashier's check / bid bond");

// --- TEST GROUP 3: Compliance Matrix CSV Export ---
console.log("\n--- TEST GROUP 3: CSV Compliance Matrix Export ---");
const csv = generateBidMatrixCsv(transitResult);
assert(csv.includes("ID,Category,Clause Reference"), "CSV contains standard matrix headers");
assert(csv.includes("2026-IT-094"), "CSV includes tender RFP number in metadata");
assert(csv.includes("financial_compliance"), "CSV exports financial category row");
assert(csv.includes("DISCLAIMER:"), "CSV contains procurement disclaimer notice");

console.log("\n==================================================================");
console.log(`✅ ALL ${passedTests}/${totalTests} BID INTELLIGENCE TESTS PASSED!`);
console.log("==================================================================");

