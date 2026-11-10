import {
  reconcileTradeDocuments,
  generateTradeReconciliationCsv,
} from "../src/lib/trade/reconciler.ts";
import {
  SAMPLE_DISCREPANT_TRADE,
  SAMPLE_ALIGNED_TRADE,
} from "../src/lib/trade/sampleTradeDocs.ts";

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
console.log("  NUUVIXX TRADE INTELLIGENCE: RECONCILER TEST SUITE              ");
console.log("==================================================================");

// --- TEST GROUP 1: Discrepant Trade Docs ---
console.log("\n--- TEST GROUP 1: Discrepant Trade Documents ---");
const resultDiscrepant = reconcileTradeDocuments(
  SAMPLE_DISCREPANT_TRADE.invoice,
  SAMPLE_DISCREPANT_TRADE.packingList
);

assert(resultDiscrepant.invoiceNumber === "CI-2026-881", "Parsed Invoice number CI-2026-881");
assert(resultDiscrepant.packingListNumber === "PL-2026-881", "Parsed Packing List number PL-2026-881");
assert(resultDiscrepant.consignee.includes("Rotterdam"), "Parsed consignee location");
assert(resultDiscrepant.discrepancies.length >= 2, `Detected at least 2 critical discrepancies (got ${resultDiscrepant.discrepancies.length})`);

const hsDisc = resultDiscrepant.discrepancies.find((d) => d.type === "hs_code_mismatch");
assert(hsDisc !== undefined, "Found HS code mismatch");
assert(hsDisc.invoiceValue === "8471.30.0100", "Identified invoice HS code 8471.30.0100");
assert(hsDisc.packingListValue === "8471.50.0100", "Identified packing list HS code 8471.50.0100");

const wtDisc = resultDiscrepant.discrepancies.find((d) => d.type === "weight_variance");
assert(wtDisc !== undefined, "Found weight variance discrepancy");
assert(wtDisc.difference.includes("320"), "Calculated exact +320 KG tare weight variance");

assert(resultDiscrepant.clearanceStatus === "mandatory_inspection_risk", "Clearance status flagged as mandatory inspection risk");
assert(resultDiscrepant.customsRiskScore >= 80, `Customs risk score elevated (got ${resultDiscrepant.customsRiskScore})`);

// --- TEST GROUP 2: Aligned Clean Trade Docs ---
console.log("\n--- TEST GROUP 2: Aligned Clean Trade Documents ---");
const resultAligned = reconcileTradeDocuments(
  SAMPLE_ALIGNED_TRADE.invoice,
  SAMPLE_ALIGNED_TRADE.packingList
);

assert(resultAligned.discrepancies.length === 0, `0 discrepancies in aligned trade documents (got ${resultAligned.discrepancies.length})`);
assert(resultAligned.customsRiskScore === 0, "Customs risk score is 0");
assert(resultAligned.clearanceStatus === "clean_clearance", "Clearance status is CLEAN_CLEARANCE");

// --- TEST GROUP 3: CSV Reconciliation Report ---
console.log("\n--- TEST GROUP 3: Reconciliation CSV Export ---");
const csv = generateTradeReconciliationCsv(resultDiscrepant);
assert(csv.includes("Discrepancy ID,Type,Severity"), "CSV includes discrepancy table headers");
assert(csv.includes("CI-2026-881"), "CSV metadata includes Invoice reference");
assert(csv.includes("hs_code_mismatch"), "CSV records HS code discrepancy row");
assert(csv.includes("DISCLAIMER:"), "CSV includes regulatory compliance disclaimer");
assert(csv.includes("no customs decision is predicted") && !csv.includes("mandatory red-channel physical inspection"), "CSV states the decision boundary and omits enforcement predictions");

console.log("\n==================================================================");
console.log(`✅ ALL ${passedTests}/${totalTests} TRADE RECONCILIATION TESTS PASSED!`);
console.log("==================================================================");

