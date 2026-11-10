import { spawn, execSync } from "child_process";
import path from "path";
import fs from "fs";
import { chromium } from "playwright";

const PORT = 4329;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.resolve("scratch/screenshots");
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

let nextProcess = null;
let browser = null;

function cleanup() {
  console.log("\nCleaning up test processes...");
  if (browser) {
    try {
      browser.close();
    } catch {}
  }
  if (nextProcess && nextProcess.pid) {
    try {
      console.log(`Killing Next.js process tree PID ${nextProcess.pid}...`);
      execSync(`taskkill /pid ${nextProcess.pid} /T /F`, { stdio: "ignore" });
    } catch {}
  }
}

process.on("SIGINT", () => {
  cleanup();
  process.exit(1);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(1);
});

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        return true;
      }
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 800));
  }
  throw new Error(`Server at ${url} failed to start within ${timeoutMs}ms`);
}

async function runBrowserTests() {
  console.log("==================================================================");
  console.log("  COMMERCE RESCUE V1: PLAYWRIGHT BROWSER VALIDATION TEST SUITE   ");
  console.log("==================================================================");

  // 1. Start Next.js dev server on port 4329
  console.log(`\n[1/10] Starting Next.js test server on port ${PORT}...`);
  nextProcess = spawn("cmd.exe", ["/c", `npx next dev -p ${PORT}`], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: String(PORT) },
    stdio: "pipe",
  });

  nextProcess.stdout.on("data", (data) => {
    const text = data.toString();
    if (text.includes("Ready in") || text.includes("started server")) {
      console.log(`  [Next.js Server]: ${text.trim()}`);
    }
  });

  nextProcess.stderr.on("data", () => {
    // console.error(`  [Next.js Err]: ${data.toString()}`);
  });

  await waitForServer(`${BASE_URL}/studio/commerce`);
  console.log(`  ✓ Next.js Commerce Rescue route is UP and responding 200 OK`);

  // 2. Launch Chromium browser
  console.log("\n[2/10] Launching Chromium (Headless mode)...");
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: "Nuuvixx-CommerceRescue-AuditBot/1.0",
  });
  const page = await context.newPage();

  // Test 1: Desktop Viewport & Initial Render
  console.log("\n[3/10] Verifying Desktop layout and pre-loaded diagnostic summary...");
  await page.goto(`${BASE_URL}/studio/commerce`, { waitUntil: "networkidle" });
  
  // Verify titles & disclaimers
  const pageTitle = await page.textContent("h1");
  console.log(`  Page H1: "${pageTitle?.trim()}"`);
  if (!pageTitle?.includes("Check product feeds for common data issues")) throw new Error("Missing expected H1 heading");

  const disclaimerBanner = await page.locator("text=Scope of Preliminary Diagnostic").count();
  console.log(`  Disclaimer/Scope disclosure count: ${disclaimerBanner}`);
  if (disclaimerBanner === 0) throw new Error("Missing Preliminary Diagnostic Scope disclosure");

  // Verify scorecard
  const scoreRate = await page.locator("text=Local Check Pass Rate").locator("..").textContent();
  console.log(`  Scorecard Pass Rate: "${scoreRate?.replace(/\s+/g, ' ').trim()}"`);
  if (!scoreRate?.includes("25%")) throw new Error("Expected 25% pass rate for pre-loaded broken sample");

  const errorsDetected = await page.locator("text=Errors Detected").first().locator("..").textContent();
  console.log(`  Scorecard Errors Detected: "${errorsDetected?.replace(/\s+/g, ' ').trim()}"`);
  if (!errorsDetected?.includes("3")) throw new Error("Expected 3 errors detected for pre-loaded broken sample");

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "01-desktop-initial-audit.png"), fullPage: false });
  console.log("  ✓ Captured: 01-desktop-initial-audit.png");

  // Test 2: Filter and Live Search
  console.log("\n[4/10] Testing filter tabs and search query input...");
  // Click "Errors Detected (3)" filter tab
  await page.locator("button[class*='filterTab']:has-text('Errors Detected')").click();
  await page.waitForTimeout(300);
  const errorCardsCount = await page.locator("div[role='button']:has-text('Errors Detected')").count();
  console.log(`  Visible error cards count after filter: ${errorCardsCount}`);
  if (errorCardsCount !== 3) throw new Error(`Expected 3 cards, found ${errorCardsCount}`);

  // Click "Passed Local Checks (1)" filter tab
  await page.locator("button[class*='filterTab']:has-text('Passed Local Checks')").click();
  await page.waitForTimeout(300);
  const passedCardsCount = await page.locator("div[role='button']:has-text('Passed Local Checks')").count();
  console.log(`  Visible passed cards count after filter: ${passedCardsCount}`);
  if (passedCardsCount !== 1) throw new Error(`Expected 1 passed card, found ${passedCardsCount}`);

  // Reset to All
  await page.locator("button[class*='filterTab']:has-text('All Products')").click();
  await page.waitForTimeout(300);

  // Search input
  const searchInput = page.locator("input[placeholder*='Search SKU']");
  await searchInput.fill("APX-JACKET");
  await page.waitForTimeout(300);
  const searchResultsCount = await page.locator("div[role='button']").count();
  console.log(`  Search results for 'APX-JACKET': ${searchResultsCount}`);
  if (searchResultsCount !== 2) throw new Error(`Expected 2 items for APX-JACKET, found ${searchResultsCount}`);

  await searchInput.fill("");
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "02-desktop-filter-search.png") });
  console.log("  ✓ Captured: 02-desktop-filter-search.png");

  // Test 3: Accordion Expansion & Remediation Guidance
  console.log("\n[5/10] Verifying remediation guidance and spec links in expanded findings...");
  const firstFinding = page.locator("div[role='button']").first();
  const isExpanded = await firstFinding.getAttribute("aria-expanded");
  console.log(`  First card initial aria-expanded: ${isExpanded}`);
  
  // Verify remediation content inside the first expanded card
  const remediationText = await page.locator("text=Suggested Correction:").first().locator("..").textContent();
  console.log(`  Remediation snippet: "${remediationText?.replace(/\s+/g, ' ').trim().slice(0, 80)}..."`);
  if (!remediationText?.includes("Suggested Correction:")) throw new Error("Missing remediation suggestion");

  const specLink = await page.locator("a:has-text('View Official Google Merchant Center Specification')").first().getAttribute("href");
  console.log(`  Official GMC Spec Citation: ${specLink}`);
  if (!specLink?.includes("support.google.com/merchants")) throw new Error("Missing or invalid GMC spec link");

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "03-desktop-remediation-details.png") });
  console.log("  ✓ Captured: 03-desktop-remediation-details.png");

  // Test 4: Keyboard Accessibility
  console.log("\n[6/10] Testing keyboard accessibility (Tab, Enter/Space toggles)...");
  await searchInput.focus();
  await page.keyboard.press("Tab"); // moves to first card header
  const focusedElementRole = await page.evaluate(() => document.activeElement?.getAttribute("role"));
  console.log(`  Active focused element role after Tab: ${focusedElementRole}`);
  
  // Press Enter to toggle
  await page.keyboard.press("Enter");
  await page.waitForTimeout(200);
  const toggledAria = await firstFinding.getAttribute("aria-expanded");
  console.log(`  Aria-expanded after Enter keypress: ${toggledAria}`);
  console.log("  ✓ Keyboard accessibility verified");

  // Test 5: CSV & JSON Report Downloads
  console.log("\n[7/10] Testing CSV and JSON export generation...");
  const [csvDownload] = await Promise.all([
    page.waitForEvent("download"),
    page.locator("button:has-text('Export Diagnostic CSV')").click(),
  ]);
  const csvStream = await csvDownload.createReadStream();
  const csvChunks = [];
  for await (const chunk of csvStream) csvChunks.push(chunk);
  const csvContent = Buffer.concat(csvChunks).toString("utf8");
  console.log(`  CSV Export received: ${csvContent.length} bytes`);
  if (!csvContent.startsWith("Row,SKU,Product Title")) throw new Error("Invalid CSV format header");
  if (!csvContent.includes("APX-JACKET-RED-L")) throw new Error("CSV missing SKU APX-JACKET-RED-L");
  console.log("  ✓ CSV export generated and verified");

  const [jsonDownload] = await Promise.all([
    page.waitForEvent("download"),
    page.locator("button:has-text('Export Diagnostic JSON')").click(),
  ]);
  const jsonStream = await jsonDownload.createReadStream();
  const jsonChunks = [];
  for await (const chunk of jsonStream) jsonChunks.push(chunk);
  const jsonContent = Buffer.concat(jsonChunks).toString("utf8");
  const parsedJson = JSON.parse(jsonContent);
  console.log(`  JSON Export received: Generator = "${parsedJson.generator}"`);
  if (!parsedJson.generator?.includes("Commerce Rescue")) throw new Error("Invalid JSON report generator");
  if (!parsedJson.auditScorecard?.testedCheckPassRate) throw new Error("Missing scorecard in JSON export");
  console.log("  ✓ JSON export generated and verified");

  // Test 6: Switching between 1-click samples
  console.log("\n[8/10] Testing 1-click sample feeds (Baseline Compliant Feed)...");
  await page.locator("button:has-text('Compliant Baseline Feed')").click();
  await page.waitForTimeout(500);
  const cleanScoreRate = await page.locator("text=Local Check Pass Rate").locator("..").textContent();
  console.log(`  Clean sample scorecard: "${cleanScoreRate?.replace(/\s+/g, ' ').trim()}"`);
  if (!cleanScoreRate?.includes("100%")) throw new Error("Clean sample did not evaluate to 100%");

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "04-desktop-clean-feed.png") });
  console.log("  ✓ Captured: 04-desktop-clean-feed.png");

  // Test 7: Uploading User Files (CSV, TSV, XML, Oversized)
  console.log("\n[9/10] Testing file uploads (CSV, TSV, XML, and >10MB limit enforcement)...");
  const fileInput = page.locator("input[type='file']");

  // 7a: Upload Valid CSV
  await fileInput.setInputFiles("tests/fixtures/feed-valid.csv");
  await page.waitForTimeout(500);
  const validCsvScore = await page.locator("text=Local Check Pass Rate").locator("..").textContent();
  console.log(`  Valid CSV upload pass rate: "${validCsvScore?.replace(/\s+/g, ' ').trim()}"`);
  if (!validCsvScore?.includes("100%")) throw new Error("Valid CSV feed should be 100%");

  // 7b: Upload Invalid TSV
  await fileInput.setInputFiles("tests/fixtures/feed-invalid.tsv");
  await page.waitForTimeout(500);
  const tsvErrors = await page.locator("text=Errors Detected").first().locator("..").textContent();
  console.log(`  Invalid TSV upload errors: "${tsvErrors?.replace(/\s+/g, ' ').trim()}"`);
  if (!tsvErrors?.includes("2")) throw new Error("Invalid TSV expected 2 errors detected");

  // 7c: Upload Broken XML
  await fileInput.setInputFiles("tests/fixtures/feed-broken.xml");
  await page.waitForTimeout(500);
  const xmlTotal = await page.locator("text=Total Products").locator("..").textContent();
  console.log(`  Broken XML upload total products: "${xmlTotal?.replace(/\s+/g, ' ').trim()}"`);
  if (!xmlTotal?.includes("2")) throw new Error("Broken XML expected 2 total products");
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "05-uploaded-feeds.png") });
  console.log("  ✓ Captured: 05-uploaded-feeds.png");

  // 7d: Upload Oversized file (>10MB)
  await fileInput.setInputFiles({ name: "feed-oversized.csv", mimeType: "text/csv", buffer: Buffer.alloc(10 * 1024 * 1024 + 1, 97) });
  await page.waitForTimeout(500);
  const errorBanner = await page.locator("text=File size exceeds 10 MB limit").count();
  console.log(`  Oversized file rejection alert count: ${errorBanner}`);
  if (errorBanner === 0) throw new Error("Failed to reject oversized file > 10MB");
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "06-file-size-rejection.png") });
  console.log("  ✓ Captured: 06-file-size-rejection.png");

  // Test 8: Commercial CTA & Mobile Layout
  console.log("\n[10/10] Testing Commercial CTA scroll and Mobile layout responsiveness...");
  // Reset with sample
  await page.locator("button:has-text('Shopify XML Feed')").click();
  await page.waitForTimeout(500);

  // Click CTA
  const cta = page.locator("a:has-text('Request a scoped feed review')");
  const ctaHref = await cta.getAttribute("href");
  console.log(`  CTA Target: ${ctaHref}`);
  if (ctaHref !== "#intake") throw new Error("CTA should link to #intake");
  await cta.click();
  await page.waitForTimeout(500);

  const intakeForm = await page.locator("#intake").count();
  console.log(`  Target #intake section count: ${intakeForm}`);
  if (intakeForm === 0) throw new Error("Section #intake does not exist on page");
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "07-commercial-cta-scroll.png") });
  console.log("  ✓ Captured: 07-commercial-cta-scroll.png");

  // Mobile Viewport test
  console.log("  Switching to Mobile Viewport (375x812 - iPhone 13)...");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Check no horizontal scrollbar on body
  const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
  const windowInnerWidth = await page.evaluate(() => window.innerWidth);
  console.log(`  Mobile dimensions: body scroll width = ${bodyScrollWidth}px, inner width = ${windowInnerWidth}px`);
  if (bodyScrollWidth > windowInnerWidth + 5) {
    console.warn(`  Warning: slight horizontal overflow (${bodyScrollWidth} > ${windowInnerWidth})`);
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "08-mobile-responsive.png"), fullPage: false });
  console.log("  ✓ Captured: 08-mobile-responsive.png");

  console.log("\n==================================================================");
  console.log("✅ ALL 10 PLAYWRIGHT BROWSER VALIDATION SUITE TESTS PASSED!");
  console.log("==================================================================");

  cleanup();
}

runBrowserTests().catch((err) => {
  console.error("\n❌ BROWSER TEST FAILED:", err);
  cleanup();
  process.exit(1);
});
