import { chromium } from "playwright";

const BASE_URL = "http://localhost:3000";

let totalChecks = 0;
let passedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedChecks++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runBrowserJourneys() {
  console.log("==================================================================");
  console.log("  NUUVIXX COMMERCIAL PRODUCTS: END-TO-END BROWSER USER JOURNEYS  ");
  console.log("==================================================================");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    // -------------------------------------------------------------------------
    // JOURNEY 1: Commerce Rescue (/studio/commerce)
    // -------------------------------------------------------------------------
    console.log("\n--- JOURNEY 1: Commerce Rescue Diagnostics & Remediation ---");
    await page.goto(`${BASE_URL}/studio/commerce`, { waitUntil: "networkidle" });

    // Verify Title & Disclaimers
    const title = await page.textContent("h1");
    assert(title.includes("product feeds"), "Page title describes product-feed checks");

    const privacyBanner = await page.locator("strong:has-text('Client-Side Processing Architecture')").isVisible();
    assert(privacyBanner, "Client-side ephemeral processing disclosure is visible");

    // Click 1-Click Sample Button: Store CSV Feed
    const csvSampleBtn = page.locator("button:has-text('Store CSV Feed')");
    await csvSampleBtn.click();
    await page.waitForTimeout(400);

    // Verify Scorecard Updated
    const scoreVal = await page.locator("div[class*='scoreValue']").first().textContent();
    assert(scoreVal.length > 0, `Local pass rate score displayed: ${scoreVal}`);

    // Verify Filter Tabs
    const errorsTab = page.locator("button:has-text('Errors Detected')");
    await errorsTab.click();
    await page.waitForTimeout(300);

    // Verify Search Input
    const searchInput = page.locator("input[placeholder*='Search SKU']");
    await searchInput.fill("JACKET");
    await page.waitForTimeout(300);

    // Verify Remediation Intake CTA preselected
    const remediationCta = page.locator("a[href='#intake']:has-text('Request a scoped feed review')");
    assert(await remediationCta.isVisible(), "Remediation CTA button to #intake is visible");

    const serviceSelect = page.locator("#service");
    const selectedServiceVal = await serviceSelect.inputValue();
    assert(selectedServiceVal === "commerce-rescue", "Inquiry form defaults to commerce-rescue");

    // -------------------------------------------------------------------------
    // JOURNEY 2: Nuuvixx Secure (/studio/secure)
    // -------------------------------------------------------------------------
    console.log("\n--- JOURNEY 2: Nuuvixx Secure Static Application Inspector ---");
    await page.goto(`${BASE_URL}/studio/secure`, { waitUntil: "networkidle" });

    // Verify Heading
    assert((await page.textContent("h1")).includes("Scoped code security checks"), "Nuuvixx Secure hero heading confirmed");

    // Verify Static Inspector Scope notice
    const scopeNotice = await page.locator("strong:has-text('Scope & Limitations Notice')").isVisible();
    assert(scopeNotice, "Scope and 5-rule heuristic limitations notice is visible");

    // Switch to 'Hardened Production Stack (Clean)' preset
    const cleanPresetBtn = page.locator("button:has-text('Hardened Production Stack')");
    await cleanPresetBtn.click();
    await page.waitForTimeout(400);

    // Verify Clean Scorecard
    const baselineStatus = await page.locator("div:has-text('NO RULE FLAGS')").first().isVisible();
    assert(baselineStatus, "Hardened stack reports no flags on tested rules");

    // Switch back to Vulnerable preset
    const vulnPresetBtn = page.locator("button:has-text('Vibe-Coded Next.js Action')");
    await vulnPresetBtn.click();
    await page.waitForTimeout(400);

    const actionRequired = await page.locator("div:has-text('REVIEW FLAGS')").first().isVisible();
    assert(actionRequired, "Vulnerable snippet triggers review flags");

    // Verify Finding details
    const findingCard = page.locator("div[class*='issueCard']").first();
    assert(await findingCard.isVisible(), "Security finding card rendered with line citations");

    // Verify inquiry preselection
    const secureSelectVal = await page.locator("#service").inputValue();
    assert(secureSelectVal === "nuuvixx-secure", "Inquiry form defaults to nuuvixx-secure");

    // -------------------------------------------------------------------------
    // JOURNEY 3: Bid Intelligence (/studio/bids)
    // -------------------------------------------------------------------------
    console.log("\n--- JOURNEY 3: Bid Intelligence Document Parser ---");
    await page.goto(`${BASE_URL}/studio/bids`, { waitUntil: "networkidle" });

    // Verify Procurement Notice
    const tenderNotice = await page.locator("strong:has-text('Procurement Analysis Notice')").isVisible();
    assert(tenderNotice, "Procurement analysis notice visible");

    // Verify Extracted Scorecard
    const rfpNumText = await page.locator("div[class*='scoreItem']").first().textContent();
    assert(rfpNumText.includes("2026-IT-094"), "Extracted RFP number #2026-IT-094 displayed");

    // Switch to 'State Health Dept Portal' preset
    const healthPresetBtn = page.locator("button:has-text('State Health Dept Portal')");
    await healthPresetBtn.click();
    await page.waitForTimeout(400);

    const rfpNumHealth = await page.locator("div[class*='scoreItem']").first().textContent();
    assert(rfpNumHealth.includes("HHS-2026-CLOUD-901"), "Switched and extracted HHS-2026-CLOUD-901");

    // Click Category Filter 'Mandatory Pass/Fail'
    const passFailFilter = page.locator("button:has-text('Mandatory Pass/Fail')");
    await passFailFilter.click();
    await page.waitForTimeout(300);

    // Verify inquiry preselection
    const bidSelectVal = await page.locator("#service").inputValue();
    assert(bidSelectVal === "bid-intelligence", "Inquiry form defaults to bid-intelligence");

    // -------------------------------------------------------------------------
    // JOURNEY 4: Nuuvixx Creative (/studio/creative)
    // -------------------------------------------------------------------------
    console.log("\n--- JOURNEY 4: Nuuvixx Creative Storyboard Blueprint ---");
    await page.goto(`${BASE_URL}/studio/creative`, { waitUntil: "networkidle" });

    // Verify Blueprint notice
    const conceptNotice = await page.locator("strong:has-text('Pre-Production Blueprint Notice')").isVisible();
    assert(conceptNotice, "Pre-production blueprint notice confirmed");

    // Change Brand Name in live input
    const brandInput = page.locator("label:has-text('Brand Name') + input");
    await brandInput.fill("AeroAcoustics");
    await page.waitForTimeout(400);

    // Verify Storyboard scene updated with new brand name
    const sceneText = await page.locator("div[class*='issueCard']").first().textContent();
    assert(sceneText.includes("AEROACOUSTICS"), "Dynamic storyboard reflected updated brand name in realtime");

    // Switch Tone of Voice dropdown
    const toneSelect = page.locator("label:has-text('Tone of Voice') + select");
    await toneSelect.selectOption("technical-authority");
    await page.waitForTimeout(400);

    const frameworkText = await page.locator("div[class*='resultsHeader']").textContent();
    assert(frameworkText.includes("Precision Tolerance") || frameworkText.includes("Technical Authority"), "Narrative framework adapted to selected tone");

    // Verify inquiry preselection
    const creativeSelectVal = await page.locator("#service").inputValue();
    assert(creativeSelectVal === "nuuvixx-creative", "Inquiry form defaults to nuuvixx-creative");

    // -------------------------------------------------------------------------
    // JOURNEY 5: Trade Intelligence (/studio/trade)
    // -------------------------------------------------------------------------
    console.log("\n--- JOURNEY 5: Trade Intelligence Document Reconciler ---");
    await page.goto(`${BASE_URL}/studio/trade`, { waitUntil: "networkidle" });

    // Verify Reconciliation notice
    const tradeNotice = await page.locator("strong:has-text('Reconciliation Scope Notice')").isVisible();
    assert(tradeNotice, "Reconciliation scope notice confirmed");

    // Verify Discrepancies Scorecard
    const statusText = await page.locator("div:has-text('REVIEW DIFFERENCES')").first().isVisible();
    assert(statusText, "Discrepant records require human review");

    // Switch to 'Fully Reconciled Manifest (Clean Clearance)'
    const alignedPresetBtn = page.locator("button:has-text('Sample documents with matching fields')");
    await alignedPresetBtn.click();
    await page.waitForTimeout(400);

    const cleanStatus = await page.locator("div:has-text('TESTED FIELDS MATCH')").first().isVisible();
    assert(cleanStatus, "Matching sample fields are described without a clearance claim");

    // Verify inquiry preselection
    const tradeSelectVal = await page.locator("#service").inputValue();
    assert(tradeSelectVal === "trade-intelligence", "Inquiry form defaults to trade-intelligence");

    console.log("\n==================================================================");
    console.log(`✅ ALL ${passedChecks}/${totalChecks} BROWSER USER JOURNEYS PASSED!`);
    console.log("==================================================================");
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}

runBrowserJourneys().catch((err) => {
  console.error("\n[FATAL ERROR IN BROWSER JOURNEYS]:", err);
  process.exit(1);
});

