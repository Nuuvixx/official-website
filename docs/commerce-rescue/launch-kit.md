# Nuuvixx Commerce Rescue — First Customer Launch Kit (v1.0)

> **Document Type:** Operational Go-To-Market & Delivery Playbook  
> **Target Audience:** Founding Engineering Team & Client Operations  
> **Product:** Nuuvixx Commerce Rescue (Feed Diagnostics & GMC Remediation)  
> **Status:** Ready for First Real Merchant Engagement  

---

## 1. One-Paragraph Commerce Rescue Summary

**Nuuvixx Commerce Rescue** is an engineering-driven diagnostic and catalog remediation service designed for Shopify and e-commerce merchants facing Google Merchant Center (GMC) product disapprovals. Using our browser-based feed engine, merchants instantly audit product feeds (CSV, TSV, Google Base XML) against official Google specifications with zero server-side storage of their catalog data. When errors threaten campaign visibility, Nuuvixx provides fixed-fee, human-engineered code fixes—resolving GTIN checksum failures, price/currency format discrepancies, variant ID collisions, and Liquid microdata conflicts directly at the source—so merchants can resubmit compliant feeds to Google Shopping without costly trial-and-error.

---

## 2. Introductory Service Scopes & Realistic SLAs

All pricing is structured as **introductory test hypotheses** for rapid pilot validation. Larger catalogs (>10,000 SKUs) or custom automated data pipelines are individually quoted.

| Package Tier | Fixed Price | Catalog Capacity | Realistic Turnaround SLA | Primary Applicable Issues |
| :--- | :--- | :--- | :--- | :--- |
| **Catalog Remediation Pilot (Standard)** | **$99 Flat** | Up to 2,500 active SKUs | **24–48 Business Hours** | Attribute errors, missing required fields, GTIN check digit fixes, currency mismatches, unescaped XML entities. |
| **Catalog Remediation Pilot (Expanded)** | **$249 Flat** | 2,501 – 10,000 active SKUs | **48–72 Business Hours** | Multi-variant ID collisions, apparel attribute matrices (`size`, `color`, `gender`), Liquid JSON-LD schema mismatches. |
| **Custom Integration / Enterprise** | **Individually Quoted** | > 10,000 SKUs or Custom ERP | Custom Milestone | Dedicated proxy feed endpoints, automated ERP synchronization, multi-country feed translation. |

> **Turnaround & Resolution Reality Check:**
> * **What We CAN Resolve in 24–48 Hours:** Technical feed attribute syntax, GTIN checksum mathematics, pricing decimal formats, broken XML headers, and storefront JSON-LD microdata alignment.
> * **What Requires Additional Google Processing Time:** Google crawler re-crawl cycles and Merchant Center account-level policy reviews ("Misrepresentation" or "Website Needs Improvement"). We provide the required technical prerequisite data fixes; Google's automated crawlers typically re-evaluate landing pages within 24 to 72 hours following resubmission.

---

## 3. Package Inclusions & Exclusions Matrix

| Service Component | Standard Pilot ($99) | Expanded Pilot ($249) | Enterprise / Custom |
| :--- | :---: | :---: | :---: |
| Full static feed parsing & specification audit | **YES** | **YES** | **YES** |
| GS1 GTIN Modulo-10 checksum validation & MPN checks | **YES** | **YES** | **YES** |
| ISO 4217 currency & price formatting remediation | **YES** | **YES** | **YES** |
| Variant-level uniqueness & title length optimization | **YES** | **YES** | **YES** |
| Delivery of verified, ready-to-upload feed artifact | **YES** | **YES** | **YES** |
| Storefront Liquid / JSON-LD schema code patch | Included if single theme | Included up to 3 templates | Included |
| Automated Feed Transformation Script (Node/Python) | *Excluded* | **YES** | **YES** |
| Multi-region / multi-currency feed variants | *Excluded* | Single country/currency | Multi-region |
| Ongoing scheduled feed proxy hosting | *Excluded* | *Excluded* | Available add-on |
| Guarantee of Google policy reinstatement | **EXCLUDED** | **EXCLUDED** | **EXCLUDED** |
| Ongoing Google Ads PPC campaign management | **EXCLUDED** | **EXCLUDED** | **EXCLUDED** |

---

## 4. Five Customer Qualification Questions

These qualification questions must be answered prior to accepting payment or commencing remediation:

1. **Platform & Feed Origin:**  
   * *"What platform powers your store (Shopify, WooCommerce, BigCommerce, custom), and how is your feed generated (Shopify Google App, Simprosys, manual export, or ERP)?"*
2. **Catalog Dimensions:**  
   * *"How many total active products and variants are published in your catalog?"*  
   * *(Ensures accurate categorization under the $99 vs $249 pilot tier).*
3. **Specific Disapproval Codes:**  
   * *"What exact error message or status appears in your Google Merchant Center Diagnostics tab (e.g. 'Mismatched value (page crawl)', 'Invalid GTIN', or 'Missing required attribute')?"*
4. **Access Method:**  
   * *"Can you provide a read-only feed URL or export file (CSV/XML) for initial engineering inspection?"*  
   * *(Nuuvixx operates under zero-trust: no admin passwords requested).*
5. **Storefront Modifications:**  
   * *"Are you able to paste an updated JSON-LD snippet into your store theme, or provide collaborator access if Liquid template adjustments are necessary?"*

---

## 5. Manual Diagnostic & Remediation Workflow

```
[Phase 1: Intake & Triage]
  1. Receive inquiry via /studio/commerce #intake.
  2. Verify catalog size and confirm appropriate package ($99 vs $249).
  3. Obtain public/read-only feed URL or export file from customer.

[Phase 2: Technical Feed Diagnosis]
  4. Run feed through Commerce Rescue Validator engine (or local CLI script).
  5. Inspect exported technical JSON scorecard.
  6. If crawler mismatch is reported: perform curl / Playwright inspection of live product landing page DOM.
  7. Identify root-cause discrepancy (e.g., currency app altering visible price vs schema).

[Phase 3: Remediation Engineering]
  8. Develop patch:
     - For static file feeds: Execute transformation script to sanitize attributes.
     - For app-generated feeds: Produce theme Liquid snippet to correct microdata output.
  9. Re-run patched feed through Commerce Rescue engine to verify 100% pass on tested rules.
  10. Generate side-by-side before/after change diff report.

[Phase 4: Client Delivery & Resubmission]
  11. Transmit clean feed file (or theme patch code) with exact step-by-step instructions.
  12. Guide merchant to click 'Fetch Now' or 'Re-upload' in Google Merchant Center.

[Phase 5: Post-Submission Verification]
  13. 48 hours post-submission: Review GMC Diagnostics with merchant to confirm error resolution.
  14. Send customer feedback survey.
```

---

## 6. Three Personalized Outreach Message Templates

> **Ethical Outreach Notice:** Do not send mass unsolicited blasts. Only message individuals who have publicly asked for assistance with Google Shopping feed errors.

### Template A: Helpful Technical Response for Merchants on Reddit / Forums
* **Target Channels:** `r/GoogleShopping`, `r/shopify`, or Shopify Community forums.
* **Context:** Merchant posted an error about GTIN checksum, price mismatch, or missing attributes.

```text
Subject: Re: [Merchant Center Error] — quick explanation of why this happens

Hey [Name],

Saw your post regarding the [specific GMC error, e.g. "mismatched price on crawl"]. This typically happens when your Shopify theme renders prices via client-side JavaScript (or a currency converter app), causing Google's crawler to read the default currency while your feed exports the converted price.

We built a free, privacy-first diagnostic tool that runs in your browser and checks feed attributes against official Google Merchant Center specifications: https://nuuvixx.com/studio/commerce#demo

You can drop your feed file there (no signup or store access required—it validates 100% client-side) to see every flagged SKU with the exact spec fix.

If you prefer to have an engineer handle the Liquid schema and feed cleanup directly, our studio offers a fixed $99 pilot remediation for catalogs under 2,500 SKUs. Either way, hope the free tool helps unblock your campaigns!
```

---

### Template B: Partnership & Subcontractor Outreach for PPC / Google Shopping Agencies
* **Target:** Media buyers, agency founders, or Heads of Performance managing shopping feeds.

```text
Subject: Quick question re: client GMC feed disapprovals

Hi [Name],

I know your team at [Agency Name] focuses heavily on ROAS and Google Shopping media buying. 

When your e-commerce clients hit technical feed disapprovals (GTIN checksum failures, variant collisions, or schema price crawl mismatches), who on your team typically spends the hours debugging raw CSVs or Shopify Liquid templates?

We built Commerce Rescue (https://nuuvixx.com/studio/commerce)—a technical feed diagnostic tool and engineering remediation service. We partner with performance agencies to handle the messy data plumbing ($99–$249 flat turnaround per feed) so your media buyers don't have to waste billable hours debugging XML code.

Would you be open to running one of your troublesome client feeds through our free diagnostic tool to see if it saves your team time?

Best,
[Your Name]
Engineering Team | Nuuvixx Studio
```

---

### Template C: Direct Outreach to Merchants with Observable Public Feed Errors
* **Target:** Direct-to-consumer store owners running Google Shopping ads with observable title or variant formatting flaws.

```text
Subject: Technical observation on [Brand Name]'s Google Shopping feed

Hi [Name],

I came across [Brand Name]'s products on Google Shopping today and noticed a minor technical attribute issue on your [Product Category, e.g. trail footwear] listings: the product titles appear to include all-caps promotional text and duplicate variant identifiers, which Google's automated crawlers frequently flag as policy warnings.

We recently launched Commerce Rescue (https://nuuvixx.com/studio/commerce), a free browser-based diagnostic tool that audits product catalogs against official Google Merchant Center specifications. It runs entirely on your device with zero data stored on our servers.

If you'd like, you can run your feed export through the tool for an instant breakdown of any hidden spec errors. If you ever need help engineering clean feed patches or Liquid schema fixes, our studio handles them under a fixed $99 pilot.

Best of luck with your campaigns!

Best regards,
[Your Name]
Nuuvixx Studio
```

---

## 7. 30-Prospect Research Checklist

Use this structured qualification checklist to build a list of 30 qualified, non-fabricated prospects:

* [ ] **Qualification Filter 1 (Active Merchant):** Store has an active e-commerce storefront with active products and checkout functionality.
* [ ] **Qualification Filter 2 (Google Shopping Activity):** Store actively advertises on Google Shopping (confirmed via Google Shopping search) or has posted about GMC disapprovals.
* [ ] **Qualification Filter 3 (Catalog Fit):** Catalog size is between 100 and 10,000 SKUs (well within our pilot scope).
* [ ] **Qualification Filter 4 (Platform Fit):** Store runs on Shopify, WooCommerce, or BigCommerce.
* [ ] **Prospect Allocation Strategy:**
  * **10 Prospects (Community Forums):** Merchants on Reddit (`r/GoogleShopping`, `r/shopify`) or Shopify Community who posted feed errors within the past 21 days.
  * **10 Prospects (Agency Partners):** Boutique Shopify performance agencies with 5–25 employees.
  * **10 Prospects (Direct DTC Brands):** Apparel, gear, or specialty goods retailers observed on Google Shopping.

---

## 8. Simple Customer Feedback Form

Send this structured 6-question questionnaire 48 hours post-remediation:

1. **Intake & Diagnosis Clarity:**  
   * *"On a scale of 1–5, how clear and actionable was our initial diagnostic report regarding the errors in your feed?"*
2. **Turnaround Speed:**  
   * *"Did the delivery timeline (within 24–48 hours) meet your business expectations?"*
3. **Technical Efficacy:**  
   * *"When you re-uploaded the patched feed to Google Merchant Center, were the previously flagged attribute errors resolved?"*
4. **Value & Pricing:**  
   * *"Did you feel the introductory pilot price ($99 / $249) was fair for the engineering effort and business impact delivered?"*
5. **Operational Communication:**  
   * *"Were our technical instructions clear enough for your team or developer to execute without confusion?"*
6. **Future Ongoing Need:**  
   * *"Would an automated monthly service that continuously monitors your feed and alerts you before Google suspends products be valuable to your store?"*

---

## 9. First Customer Delivery Checklist

Before sending the completed deliverables to your first paying merchant, complete every item:

- [ ] **1. Clean Diagnostic Run:** Patched feed uploaded and audited in Commerce Rescue Validator; 100% pass rate achieved on all tested static specification rules.
- [ ] **2. GTIN Integrity:** All GTIN-12, GTIN-13, and GTIN-14 check digits verified using the GS1 Modulo-10 checksum algorithm.
- [ ] **3. Currency Consistency:** Prices and sale prices verified with exact ISO 4217 standard currency codes (e.g. `19.99 USD`).
- [ ] **4. Landing Page Sample Match:** Tested 3 random SKUs against the live storefront landing page to verify that prices and availability match the feed data.
- [ ] **5. File Formatting:** CSV saved with proper UTF-8 encoding and RFC 4180 quote escaping; XML verified well-formed with closing tags and XML headers.
- [ ] **6. Client Deliverable Package:**
  - [ ] Corrected feed artifact file (`[store-name]-clean-feed.csv` or `.xml`).
  - [ ] Before/After Diff Summary PDF/Markdown showing exactly what attributes were modified.
  - [ ] Three-step resubmission instructions for Google Merchant Center.
  - [ ] Engineer's note detailing any storefront theme adjustments needed.

---

## 10. First-30-Days Metrics Tracker

Track these metrics weekly during the first 30 days of launch:

| Metric Category | Target (30 Days) | Actual (Week 1) | Actual (Week 2) | Actual (Week 3) | Actual (Week 4) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Free Tool Audits Completed** | 50 unique runs | | | | |
| **Organic Tool Visits** | 200 visitors | | | | |
| **Commercial Inquiries Submitted** | 5 inquiries | | | | |
| **Inquiry Qualification Rate** | > 60% | | | | |
| **Paid Pilot Conversions** | **2 paying merchants** | | | | |
| **Total Pilot Revenue** | $198 – $498 | | | | |
| **Average Delivery Turnaround** | < 36 business hours | | | | |
| **Spec Error Resolution Rate** | 100% of feed errors | | | | |
| **Post-Service Customer Feedback** | 100% positive rating | | | | |
