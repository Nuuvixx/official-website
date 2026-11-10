import { parseCsvFeed } from "../src/lib/commerce/parsers/csvParser.ts";
import { parseXmlFeed, validateXmlSecurity } from "../src/lib/commerce/parsers/xmlParser.ts";
import { validateProductFeed } from "../src/lib/commerce/validator.ts";
import { validateGtinChecksum, parseGmcPrice } from "../src/lib/commerce/rules.ts";
import { generateCsvReport, generateJsonReport } from "../src/lib/commerce/exportReports.ts";
import {
  SAMPLE_BROKEN_XML_FEED,
  SAMPLE_BROKEN_CSV_FEED,
  SAMPLE_CLEAN_CSV_FEED,
} from "../src/lib/commerce/sampleFeeds.ts";

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
console.log("  COMMERCE RESCUE V1: ENGINE UNIT & SECURITY AUDIT TEST SUITE    ");
console.log("==================================================================");

// -----------------------------------------------------------------------------
// 1. GTIN GS1 Modulo-10 Checksum Tests
// -----------------------------------------------------------------------------
console.log("\n--- TEST GROUP 1: GS1 GTIN Modulo-10 Checksum ---");
// Valid GTINs:
// GTIN-14: 00012345678905 -> check digit 5
assert(validateGtinChecksum("00012345678905") === true, "Valid 14-digit GTIN passes checksum");
assert(validateGtinChecksum("012345678905") === true, "Valid 12-digit UPC-A (012345678905) passes checksum");
assert(validateGtinChecksum("9780201379624") === true, "Valid 13-digit ISBN/EAN (9780201379624) passes checksum");

// Invalid GTINs:
assert(validateGtinChecksum("012345678909") === false, "Invalid check digit in UPC-A fails");
assert(validateGtinChecksum("123456789013") === false, "Corrupted GTIN-12 fails checksum");
assert(validateGtinChecksum("abc123456789") === false, "Non-numeric GTIN fails immediately");
assert(validateGtinChecksum("12345") === false, "Incomplete 5-digit GTIN fails length check");

// -----------------------------------------------------------------------------
// 2. Price Parsing Tests
// -----------------------------------------------------------------------------
console.log("\n--- TEST GROUP 2: Google Merchant Center Price Parsing ---");
const p1 = parseGmcPrice("19.99 USD");
assert(p1.valid === true && p1.amount === 19.99 && p1.currency === "USD", "Standard '19.99 USD' parsed correctly");

const p2 = parseGmcPrice("145.00 EUR");
assert(p2.valid === true && p2.amount === 145.0 && p2.currency === "EUR", "Euro currency '145.00 EUR' parsed correctly");

const pBad1 = parseGmcPrice("$19.99");
assert(pBad1.valid === false && pBad1.error?.includes("Missing ISO 4217"), "Missing currency symbol '$19.99' rejected");

const pBad2 = parseGmcPrice("19,99 USD");
assert(pBad2.valid === false && pBad2.error?.includes("Comma used as decimal"), "Comma decimal separator rejected");

const pBad3 = parseGmcPrice("0.00 USD");
assert(pBad3.valid === false, "Zero or negative price rejected");

// -----------------------------------------------------------------------------
// 3. Security: XXE and Billion Laughs Defense
// -----------------------------------------------------------------------------
console.log("\n--- TEST GROUP 3: XML Security & Entity Defense ---");
const maliciousXml1 = `<?xml version="1.0"?>
<!DOCTYPE lolz [
 <!ENTITY lol "lol">
 <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
]>
<rss><channel><item><g:title>&lol2;</g:title></item></channel></rss>`;

const sec1 = validateXmlSecurity(maliciousXml1);
assert(sec1.safe === false, "Entity expansion / Billion Laughs attack rejected");
assert(sec1.error?.includes("ENTITY declarations are prohibited"), "Error informs of XXE defense");

const maliciousXml2 = `<?xml version="1.0"?>
<!DOCTYPE feed SYSTEM "http://malicious-site.internal/secret.dtd">
<rss><channel><item><g:title>Test</g:title></item></channel></rss>`;

const sec2 = validateXmlSecurity(maliciousXml2);
assert(sec2.safe === false, "External SYSTEM DTD reference rejected");

const safeXmlRes = parseXmlFeed(maliciousXml1);
assert(safeXmlRes.products.length === 0, "Parser refuses to process malicious XML constructs");
assert(safeXmlRes.errors.length > 0, "Security error recorded in parse errors");

// -----------------------------------------------------------------------------
// 4. CSV Feed Parsing & Validation
// -----------------------------------------------------------------------------
console.log("\n--- TEST GROUP 4: CSV Feed Parsing ---");
const csvParse = parseCsvFeed(SAMPLE_BROKEN_CSV_FEED);
assert(csvParse.products.length === 3, "Parsed 3 products from broken CSV sample");
assert(csvParse.products[0].id === "SKU-WATCH-001", "Header normalization mapped 'id' correctly");

const csvAudit = validateProductFeed("test-broken.csv", SAMPLE_BROKEN_CSV_FEED.length, csvParse.products);
assert(csvAudit.totalProducts === 3, "Audit evaluated 3 products");
assert(csvAudit.errorsDetected >= 1, "Errors detected in broken products");
assert(csvAudit.criticalIssueCount > 0, "Critical issues flagged");
assert(csvAudit.complianceScore < 100, "Non-compliant score calculated");

// Check clean CSV feed
const cleanCsvParse = parseCsvFeed(SAMPLE_CLEAN_CSV_FEED);
assert(cleanCsvParse.products.length === 3, "Parsed 3 clean products");
const cleanAudit = validateProductFeed("test-clean.csv", SAMPLE_CLEAN_CSV_FEED.length, cleanCsvParse.products);
assert(cleanAudit.complianceScore === 100, "100% compliant feed receives 100% score");
assert(cleanAudit.errorsDetected === 0, "0 error products in clean feed");
assert(cleanAudit.passedLocalChecks === 3, "All 3 products marked passed_local_checks");

// -----------------------------------------------------------------------------
// 5. XML Feed Parsing & Policy Rule Verification
// -----------------------------------------------------------------------------
console.log("\n--- TEST GROUP 5: Google Base RSS 2.0 XML Audit ---");
const xmlParse = parseXmlFeed(SAMPLE_BROKEN_XML_FEED);
assert(xmlParse.products.length === 4, "Extracted 4 products from RSS 2.0 XML feed");
assert(xmlParse.feedType === "rss2", "Feed flavor detected as RSS 2.0");

const xmlAudit = validateProductFeed("catalog.xml", SAMPLE_BROKEN_XML_FEED.length, xmlParse.products);
assert(xmlAudit.totalProducts === 4, "Audited 4 XML products");

// Item 1 checks:
const item1 = xmlAudit.findings.find(f => f.sku === "APX-JACKET-RED-L");
assert(item1 !== undefined, "Found Item 1 (APX-JACKET-RED-L)");
const item1Issues = item1.issues.map(i => i.ruleId);
assert(item1Issues.includes("IMAGE_INSECURE_HTTP"), "Flagged insecure HTTP image link");
assert(item1Issues.includes("AVAILABILITY_INVALID_ENUM"), "Flagged invalid availability enum 'in stock'");
assert(item1Issues.includes("SALE_PRICE_NOT_LOWER"), "Flagged sale price greater than regular price");
assert(item1Issues.includes("TITLE_PROMOTIONAL_TEXT"), "Flagged promotional text in title");

// Item 2 checks:
const item2 = xmlAudit.findings.find(f => f.sku === "APX-BOOTS-TRAIL-42");
assert(item2 !== undefined, "Found Item 2 (APX-BOOTS-TRAIL-42)");
const item2Issues = item2.issues.map(i => i.ruleId);
assert(item2Issues.includes("GTIN_INVALID_CHECKSUM"), "Flagged invalid GTIN check digit");
assert(
  item2Issues.includes("IDENTIFIER_EXISTS_CONFLICT") || item2Issues.includes("IDENTIFIER_EXISTS_POLICY_RISK"),
  "Flagged identifier_exists=no policy conflict on branded goods"
);
assert(item2Issues.includes("TITLE_CAPITALIZATION"), "Flagged all-caps title");
assert(item2.issues.every(i => !/will disapprove|triggers Google policy disapproval|penalizes or disapproves/i.test(i.message)), "Sample findings avoid predicting Merchant Center decisions");
assert(xmlAudit.findings.every(f => f.issues.every(i => !/disapproval risk/i.test(i.title))), "Finding titles describe local issues without predicting disapproval");

// Duplicate ID check:
assert(item1Issues.includes("ID_UNIQUE"), "Duplicate SKU APX-JACKET-RED-L flagged across both items");

// Item 4 check (Clean product):
const item4 = xmlAudit.findings.find(f => f.sku === "APX-THERMAL-SOCKS-01");
assert(item4 !== undefined && item4.status === "passed_local_checks", "Item 4 marked passed_local_checks with zero critical issues");

// -----------------------------------------------------------------------------
// 6. Report Exporting Tests (CSV & JSON)
// -----------------------------------------------------------------------------
console.log("\n--- TEST GROUP 6: Downloadable Report Exports ---");
const csvReport = generateCsvReport(xmlAudit);
assert(csvReport.startsWith("Row,SKU,Product Title"), "CSV report starts with expected header columns");
assert(csvReport.includes("APX-JACKET-RED-L"), "CSV report contains product finding rows");
assert(csvReport.includes("IMAGE_INSECURE_HTTP"), "CSV report includes rule IDs");

const jsonReport = generateJsonReport(xmlAudit);
const parsedJson = JSON.parse(jsonReport);
assert(parsedJson.complianceStandard.includes("Google Merchant Center"), "JSON report has compliance standard");
assert(parsedJson.auditScorecard.testedCheckPassRate === "25%", "JSON scorecard matches calculated score");
assert(parsedJson.findings.length === 4, "JSON report contains 4 findings");

console.log("\n==================================================================");
console.log(`✅ ALL ${passedTests}/${totalTests} COMMERCE RESCUE TESTS PASSED!`);
console.log("==================================================================");
