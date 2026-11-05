# Nuuvixx Commerce Rescue — Customer Acquisition & Delivery Plan (v1.0)

> **Document Type:** Internal Commercial Strategy & Operations Guide  
> **Target Service:** Nuuvixx Commerce Rescue (Feed Diagnostics & GMC Remediation)  
> **Status:** Active / Pre-Launch  
> **Price Anchor:** $99 – $249 Fixed Introductory Pilots (Non-guaranteeing, engineering-driven)  

---

## 1. Ideal Customer Profiles (ICPs)

### ICP 1: Growing DTC Brands on Shopify / WooCommerce ($500K – $5M Annual GMV)
* **Demographics:** Founder-led or lean e-commerce teams (1–5 people) running active Google Shopping campaigns.
* **Pain Points:** 
  * Sudden drop in Google Shopping impressions or revenue due to automated disapproval emails from Google Merchant Center (GMC).
  * Common failure modes: `price_mismatch` between feed and storefront JavaScript-rendered variant selectors, `missing_gtin` on branded inventory, or `availability` mismatch during inventory stock-outs.
  * Lack internal backend engineering to debug Shopify Liquid templates, JSON-LD microdata, or feed app export discrepancies.
* **Urgency:** Extremely high. Every day of catalog suspension directly burns paid ad ROI and organic shopping placement.

### ICP 2: E-Commerce Digital Marketing & Performance PPC Agencies
* **Demographics:** Boutique growth marketing agencies managing 10 to 50 e-commerce merchant ad accounts.
* **Pain Points:**
  * Account managers and media buyers understand Google Ads and PPC bidding, but cannot write custom Python/Node scripts or regex transformers to fix feed syntax errors.
  * GMC disapprovals stall client campaigns and burn agency billable hours on technical troubleshooting.
* **Urgency:** High. Disapprovals delay campaign launches and threaten agency client retention.
* **Commercial Model:** Agency referral or white-label technical subcontractor ($199/feed flat turnaround).

### ICP 3: Catalog Wholesalers & Multi-Brand Retailers (2,500 – 15,000 SKUs)
* **Demographics:** Multi-brand apparel, auto parts, industrial hardware, or specialty outdoor equipment sellers.
* **Pain Points:**
  * Complex catalogs with variable sizing, colors, and multipacks exported from legacy ERPs (NetSuite, SAP, custom MySQL).
  * Recurring formatting errors: unescaped XML entities, duplicate IDs, missing required apparel attributes (`color`, `size`, `age_group`, `gender`).
* **Urgency:** Moderate to high. Catalog refreshes frequently cause bulk rejections.

---

## 2. Initial Service Packages & Pricing Matrix

All pricing is positioned as **introductory test hypotheses** for rapid pilot validation. Larger catalogs (>10,000 SKUs) and custom automated ingestion pipelines are individually quoted.

| Package Tier | Catalog Scope | Deliverables | Introductory Pricing | Turnaround SLA |
| :--- | :--- | :--- | :--- | :--- |
| **Preliminary Diagnostic** | Up to 10,000 SKUs | Client-side static feed audit via Commerce Rescue web tool, downloadable RFC 4180 CSV & JSON error scorecard | **$0 (Free Self-Serve)** | Instant (Browser) |
| **Catalog Remediation Pilot (Standard)** | Up to 2,500 SKUs | Full human audit of feed XML/CSV, JSON-LD schema inspection on live storefront, delivery of patched feed artifact + change diff | **$99 Flat** | 24 Business Hours |
| **Catalog Remediation Pilot (Expanded)** | 2,501 – 10,000 SKUs | Comprehensive audit of multi-variant catalog, variant-level GTIN/MPN conflict resolution, feed transformation script, verified clean export | **$249 Flat** | 48 Business Hours |
| **Custom Integration / Enterprise** | > 10,000 SKUs or Custom ERP | Custom proxy feed endpoint, automated scheduled delta synchronizer, multi-region feed configuration | **Individually Quoted** ($1,500+ scope) | Scoped Milestone |

> **Positioning Notice:** Nuuvixx provides human-reviewed engineering remediation for feed attributes, schema inconsistencies, and crawl discrepancies. We do not claim or guarantee 100% account reinstatement, as final policy enforcement resides solely with Google LLC.

---

## 3. Customer Qualification Intake Questions

These qualification questions are embedded directly in the commercial intake flow (`#intake`):

1. **Storefront & Feed Origin:**
   * *Question:* What e-commerce platform and feed generation method do you currently use?
   * *Options:* Shopify (Shopify Google App), Shopify (Third-Party App e.g. Simprosys/Feedonomics), WooCommerce, BigCommerce, Custom XML/CSV export from ERP.
2. **Catalog Dimensions:**
   * *Question:* How many total active SKUs are published in your catalog?
   * *Options:* Under 1,000 · 1,000 to 5,000 · 5,000 to 10,000 · Over 10,000.
3. **Observed Disapproval Symptoms:**
   * *Question:* What is the primary Google Merchant Center issue or notification received?
   * *Options:* Item-level attribute disapprovals (GTIN, availability, price) · Landing page crawl price mismatch · Account suspension warning ("Misrepresentation" / "Website needs improvement") · Feed processing syntax errors.
4. **Access Availability:**
   * *Question:* Can you provide a public/read-only feed URL or export file for engineering inspection?
   * *Note:* Nuuvixx operates under zero-trust principles and does not require store admin credentials for initial feed inspection.

---

## 4. Manual Delivery Workflow (Step-by-Step)

```
[Customer Form Intake]
         │
         ▼
[Step 1: Triage & Feasibility Review (< 4 Hours)]
         │   • Inspect provided feed URL/file with Commerce Rescue Engine
         │   • Verify issue is a technical feed/schema defect, not an account policy ban
         │   • Confirm pilot tier ($99 vs $249) and send confirmation
         ▼
[Step 2: Deep Schema & Attribute Analysis]
         │   • Compare feed attributes against live storefront DOM (curl + Playwright)
         │   • Test GTIN checksums, currency formats, variant ID uniqueness
         │   • Identify discrepancy root causes (e.g., currency converter app injecting text)
         ▼
[Step 3: Engineering Patch & Feed Generation]
         │   • Execute transformation script to sanitize attributes and fix headers
         │   • Validate patched feed against GMC specifications
         │   • Generate before/after verification diff report
         ▼
[Step 4: Delivery & Client Resubmission Guide]
         │   • Provide clean patched feed artifact (or hosted temporary feed proxy)
         │   • Provide step-by-step instructions for uploading/replacing feed in GMC
         │   • Provide optional Liquid / theme snippet fixes if schema was broken
         ▼
[Step 5: 48-Hour Monitoring Check]
             • Verify Google's re-fetch status in Merchant Center
             • Collect merchant feedback and review engagement
```

---

## 5. 30-Prospect Outreach Strategy (Zero Fabrication)

Rather than purchasing cold email scrapers or generating fake names, outreach focuses on **inbound context and publicly observable symptoms** where merchants are actively requesting help:

### Prospect Channels & Search Queries
1. **Reddit (`r/GoogleShopping`, `r/ecommerce`, `r/shopify`):**
   * *Search queries:* `"feed disapproved"`, `"price mismatch crawl"`, `"missing gtin"`, `"merchant center error"`.
   * *Approach:* Reply with direct technical insight explaining why the specific error occurs, link to the free client-side Commerce Rescue diagnostic tool, and offer fixed-price human remediation if they want engineering assistance.
2. **Shopify Community Forums (Google Channel subforum):**
   * *Search queries:* `"Google channel products not syncing"`, `"Merchant center feed invalid"`.
   * *Approach:* Provide concise technical answers to unresolved merchant threads, citing official Google Merchant Center specifications.
3. **LinkedIn PPC / Shopping Agency Leaders:**
   * *Target:* Founders and heads of media buying at boutique Shopify PPC agencies.
   * *Value Proposition:* "We built a free feed validation tool that detects GTIN checksum errors and price mismatches in 5 seconds. If your clients have disapproved feeds, we provide $99 fixed-turnaround engineering fixes so your team doesn't have to debug CSVs."

### Outreach Allocation (30 Targets)
* **Targets 1–10:** Active merchants on Reddit/Shopify Community who posted feed errors within the past 14 days.
* **Targets 11–20:** Performance marketing agency owners managing Google Shopping campaigns.
* **Targets 21–30:** Mid-market DTC brands identified via Google Shopping ads exhibiting obvious feed title or price formatting issues.

---

## 6. Pilot Validation Metrics

To declare initial product-market validation for Commerce Rescue v1:

1. **Free Tool Engagement:**
   * Target: 50+ unique feed diagnostic runs (via self-serve uploads).
   * Success signal: Merchants uploading their own custom CSV/TSV/XML files rather than just sample feeds.
2. **Diagnostic to Lead Conversion:**
   * Target: 5+ qualified commercial inquiries submitted through the `#intake` form.
3. **Commercial Conversion:**
   * Target: 2+ paying customers for the $99 or $249 remediation package within the first 30 days.
4. **Resolution Efficacy:**
   * Target: 100% of remediated feed attributes pass official Google Merchant Center static specification checks.
5. **Customer Satisfaction:**
   * Target: Net positive rating on turnaround speed and technical communication.

---

## 7. First-Customer Feedback Checklist

Administer this structured 6-question questionnaire 48 hours following delivery:

1. **Intake Clarity:** Was the initial diagnostic report clear and actionable regarding the errors detected in your catalog?
2. **Turnaround Speed:** Did the 24–48 hour delivery timeline meet your business needs?
3. **Technical Efficacy:** When you uploaded the remediated feed to Google Merchant Center, did the previously disapproved items clear their technical errors?
4. **Communication:** Was the technical explanation and resubmission guidance easy for your team to execute?
5. **Fair Pricing:** Was the $99 / $249 pilot price point appropriate for the value of restoring catalog visibility?
6. **Feature Requests:** What automated tooling or ongoing monitoring features would make you subscribe to a monthly feed health service?
