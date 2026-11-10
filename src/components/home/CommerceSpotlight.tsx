"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Download, FileSpreadsheet } from "lucide-react";
import styles from "./commerce-spotlight.module.css";

export default function CommerceSpotlight() {
  return (
    <section className={styles.section} aria-label="Commerce Rescue Product Spotlight">
      <div className={styles.container}>
        <div className={styles.spotlightGrid}>
          {/* Left Column: Editorial Description & Scope */}
          <div className={styles.contentCol}>
            <div className={styles.kicker}>
              <span className={styles.kickerDot} aria-hidden="true" />
              <span>COMMERCE RESCUE · PRODUCT HIGHLIGHT</span>
            </div>

            <h2 className={styles.title}>
              Run a free, browser-side diagnostic before your ads suspend.
            </h2>

            <p className={styles.description}>
              We built an in-browser audit engine for Google Merchant Center feeds. It runs 100% locally on your machine—inspecting GS1 GTIN checksums, currency formatting, required identifiers, and policy syntax before you upload catalog updates.
            </p>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <span>Modulo-10 GTIN-8, GTIN-12, GTIN-13, and GTIN-14 check digit validation</span>
              </li>
              <li className={styles.featureItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <span>Zero server upload — catalog data never leaves your browser window</span>
              </li>
              <li className={styles.featureItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <span>Instant CSV and JSON exportable audit scorecard for engineering teams</span>
              </li>
            </ul>

            <div className={styles.ctaWrapper}>
              <Link href="/studio/commerce" className={styles.launchBtn}>
                <span>Launch Feed Validator</span>
                <ArrowUpRight size={17} />
              </Link>
              <span className={styles.freeBadge}>FREE · NO LOGIN REQUIRED</span>
            </div>

            <p className={styles.disclaimer}>
              * Local static checks only. Nuuvixx is an independent engineering firm and cannot guarantee Google account approval or policy reinstatement.
            </p>
          </div>

          {/* Right Column: High-Fidelity Architectural Print Frame of the Actual Engine */}
          <div className={styles.previewCol}>
            <div className={styles.printFrame}>
              {/* Header Bar of the Validator Tool */}
              <div className={styles.toolHeader}>
                <div className={styles.trafficLights}>
                  <span className={styles.light} />
                  <span className={styles.light} />
                  <span className={styles.light} />
                </div>
                <div className={styles.toolTitle}>
                  <FileSpreadsheet size={14} />
                  <span>merchant-feed-audit-v1.xml</span>
                </div>
                <span className={styles.statusLive}>READY</span>
              </div>

              {/* Scorecard Strip */}
              <div className={styles.scorecardStrip}>
                <div className={styles.metricCard}>
                  <span className={styles.metricLabel}>COMPLIANCE SCORE</span>
                  <span className={styles.metricValue}>84<span className={styles.metricTotal}>/100</span></span>
                </div>
                <div className={styles.metricCard}>
                  <span className={styles.metricLabel}>ITEMS AUDITED</span>
                  <span className={styles.metricValue}>4,120</span>
                </div>
                <div className={styles.metricCard}>
                  <span className={styles.metricLabel}>CRITICAL ERRORS</span>
                  <span className={`${styles.metricValue} ${styles.valDanger}`}>18</span>
                </div>
              </div>

              {/* Sample Diagnostic Findings Table */}
              <div className={styles.tableWrapper}>
                <table className={styles.diagnosticTable}>
                  <thead>
                    <tr>
                      <th>SKU</th>
                      <th>ATTRIBUTE</th>
                      <th>FINDING</th>
                      <th>RULE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.skuCell}>APX-JACKET-RED</td>
                      <td><code>image_link</code></td>
                      <td className={styles.issueDanger}>Insecure HTTP image protocol</td>
                      <td><span className={styles.ruleBadge}>GMC-IMG-001</span></td>
                    </tr>
                    <tr>
                      <td className={styles.skuCell}>APX-BOOTS-TRAIL</td>
                      <td><code>gtin</code></td>
                      <td className={styles.issueDanger}>Invalid Modulo-10 checksum</td>
                      <td><span className={styles.ruleBadge}>GS1-CHK-002</span></td>
                    </tr>
                    <tr>
                      <td className={styles.skuCell}>APX-HAT-WOOL</td>
                      <td><code>availability</code></td>
                      <td className={styles.issueWarning}>Unrecognized status string</td>
                      <td><span className={styles.ruleBadge}>GMC-AVL-004</span></td>
                    </tr>
                    <tr>
                      <td className={styles.skuCell}>APX-SOCKS-3PK</td>
                      <td><code>price</code></td>
                      <td className={styles.issueSuccess}>Format verified (USD)</td>
                      <td><span className={styles.ruleBadgeSuccess}>PASS</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tool Action Footer */}
              <div className={styles.toolFooter}>
                <div className={styles.privacyNote}>
                  <ShieldCheck size={14} className={styles.privacyIcon} />
                  <span>Client-side FileReader sandbox active</span>
                </div>
                <div className={styles.exportDemo}>
                  <Download size={14} />
                  <span>Export Scorecard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

