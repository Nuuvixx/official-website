"use client";

import { useState } from "react";
import { Play } from "@phosphor-icons/react";
import styles from "./demos.module.css";

const SYNTHETIC_RAW_FEED = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Apex Performance Gear - Production Feed</title>
    <link>https://apexgear-demo.store</link>
    <item>
      <!-- SKU 101: Disapproval Risk: Missing GTIN/MPN + Missing Brand -->
      <g:id>APX-JACKET-RED-L</g:id>
      <g:title>All-Weather Tactical Alpine Shell Jacket - Waterproof Breathable Extreme Cold Hiking Outerwear Winter Edition [2026 Release]</g:title>
      <g:description>Durable shell designed for mountain mountaineering.</g:description>
      <g:link>https://apexgear-demo.store/products/alpine-shell?variant=4821</g:link>
      <g:image_link>http://cdn.apexgear-demo.store/images/alpine-red.jpg</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>189.00 USD</g:price>
      <g:identifier_exists>no</g:identifier_exists> <!-- CONFLICT: GTIN required for branded apparel -->
    </item>
    <item>
      <!-- SKU 102: Disapproval Risk: Currency mismatch & Insecure HTTP Image link -->
      <g:id>APX-BOOTS-TRAIL-42</g:id>
      <g:title>Apex Carbon Trail Runner (Size 42)</g:title>
      <g:description>Ultra-light composite trail running shoes.</g:description>
      <g:link>https://apexgear-demo.store/products/trail-runner</g:link>
      <g:image_link>http://img.apexgear-demo.store/trail42.png</g:image_link> <!-- INSECURE HTTP -->
      <g:availability>in stock</g:availability> <!-- INVALID ENUM: Must be in_stock -->
      <g:price>120.00 EUR</g:price> <!-- MISMATCH: Target market US requires USD -->
      <g:brand>Apex</g:brand>
      <g:gtin>00810012345678</g:gtin>
    </item>
  </channel>
</rss>`;

export default function CommerceFeedValidatorDemo() {
  const [analyzed, setAnalyzed] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAnalyzed(true);
    }, 600);
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <div className={styles.demoTitleRow}>
          <span className={styles.demoBadge}>Interactive Prototype</span>
          <h4 className={styles.demoTitle}>Commerce Rescue: Feed Diagnostic & GMC Linter</h4>
        </div>
        <div className={styles.demoControls}>
          <button
            onClick={handleRunAudit}
            disabled={isAuditing}
            className={styles.actionBtn}
          >
            {isAuditing ? "Auditing Feed..." : "Run Feed Diagnostic Audit"}
            <Play size={14} weight="bold" />
          </button>
        </div>
      </div>

      <div className={styles.demoBody}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "12px" }}>
          Synthetic Feed Sample: <code>Apex-Catalog-Feed.xml</code> (Simulating common merchant disapproval triggers)
        </p>
        <div className={styles.codeArea}>{SYNTHETIC_RAW_FEED}</div>

        {analyzed && (
          <div className={styles.resultsPanel}>
            <div className={styles.scorecard}>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>GMC Compliance</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueCritical}`}>38%</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Critical Disapprovals</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueCritical}`}>3</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Policy Warnings</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueWarning}`}>2</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Estimated Lost Impressions</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueCritical}`}>~4,200/wk</div>
              </div>
            </div>

            <div className={styles.issuesList}>
              <div className={styles.issueCard}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagCritical}`}>GMC Disapproval · Critical</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#ff6b6b" }}>APX-JACKET-RED-L</span>
                </div>
                <div className={styles.issueTitle}>Identifier mismatch: Branded apparel flagged as identifier_exists=no</div>
                <div className={styles.issueDetails}>
                  Google Merchant Center policy mandates valid GTIN (UPC/EAN) and brand for manufactured apparel. Flagging `no` will trigger account-wide suspension risk.
                </div>
                <div className={styles.remediationCode}>
                  Patch: Map Shopify Barcode field to `&lt;g:gtin&gt;` and enforce fallback vendor string `&lt;g:brand&gt;Apex&lt;/g:brand&gt;`.
                </div>
              </div>

              <div className={styles.issueCard}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagCritical}`}>Feed Schema Error</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#ff6b6b" }}>APX-BOOTS-TRAIL-42</span>
                </div>
                <div className={styles.issueTitle}>Invalid availability enum and currency mismatch</div>
                <div className={styles.issueDetails}>
                  Enum value <code>in stock</code> rejected by Google parser (requires <code>in_stock</code>). Currency <code>EUR</code> does not match target country US feed profile.
                </div>
                <div className={styles.remediationCode}>
                  Patch: Enforce ISO standard snake_case availability normalizer and auto-convert currency to USD matching target feed locale.
                </div>
              </div>

              <div className={`${styles.issueCard} ${styles.issueCardWarning}`}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagWarning}`}>Policy Warning</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#ffaa00" }}>APX-JACKET-RED-L</span>
                </div>
                <div className={styles.issueTitle}>Title length exceeds 70 char truncation threshold</div>
                <div className={styles.issueDetails}>
                  Title is 114 characters. Mobile shopping cards will truncate brand and size attributes before user click.
                </div>
                <div className={styles.remediationCode}>
                  Patch: Structured Title Rewriter: [Brand] + [Product Type] + [Color] + [Key Feature] (under 68 chars).
                </div>
              </div>

              <div className={`${styles.issueCard} ${styles.issueCardPass}`}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagPass}`}>Nuuvixx Remediation Solution</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#00e676" }}>1-Click Remediation</span>
                </div>
                <div className={styles.issueTitle}>Automated Endpoint Normalizer Available</div>
                <div className={styles.issueDetails}>
                  Nuuvixx Commerce Rescue delivers a clean proxy feed endpoint that auto-sanitizes your Shopify feed in real-time before Google crawlers ingest it.
                </div>
              </div>
            </div>

            <div className={styles.disclaimer}>
              Nuuvixx Commerce Rescue · Synthetic Catalog Sandbox v1.2
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
