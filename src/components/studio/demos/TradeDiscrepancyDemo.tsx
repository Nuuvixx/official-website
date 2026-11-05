"use client";

import { useState } from "react";
import { Play } from "@phosphor-icons/react";
import styles from "./demos.module.css";

const SYNTHETIC_TRADE_DOCS = `=== DOCUMENT A: COMMERCIAL INVOICE #CI-2026-881 ===
Consignee: Global Tech Logistics BV (Rotterdam, Netherlands)
Incoterm: CIF Rotterdam
Item 1: Model X Industrial Edge Gateway (QTY: 500 units @ $120.00 = $60,000.00)
        HS Tariff Code: 8471.30.0100
        Total Gross Weight: 2,450.00 KGS
Item 2: Heavy-Duty IP67 Mounting Bracket (QTY: 500 units @ $15.00 = $7,500.00)
        HS Tariff Code: 8302.49.0000
        Total Gross Weight: 1,800.00 KGS
Declared Grand Total: $67,500.00 USD
Declared Total Gross Weight: 4,250.00 KGS

=== DOCUMENT B: PACKING LIST #PL-2026-881 ===
Container Number: MSCU-992184-7
Seal Number: SL-49201
Item 1: Model X Industrial Edge Gateway (50 Pallets, 500 units)
        HS Tariff Code: 8471.50.0100  <-- VARIANCE DETECTED
        Actual Net Weight: 2,100 KGS | Actual Gross Weight: 2,450 KGS
Item 2: Heavy-Duty IP67 Mounting Bracket (25 Pallets, 500 units)
        HS Tariff Code: 8302.49.0000
        Actual Net Weight: 1,650 KGS | Actual Gross Weight: 2,120 KGS  <-- VARIANCE DETECTED (+320 KGS)
Total Manifest Gross Weight: 4,570.00 KGS  <-- MISMATCH (+320 KGS over Commercial Invoice!)`;

export default function TradeDiscrepancyDemo() {
  const [analyzed, setAnalyzed] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleReconcile = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setAnalyzed(true);
    }, 600);
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <div className={styles.demoTitleRow}>
          <span className={styles.demoBadge}>Interactive Prototype</span>
          <h4 className={styles.demoTitle}>Trade Intelligence: Multi-Document Reconciliation Engine</h4>
        </div>
        <div className={styles.demoControls}>
          <button
            onClick={handleReconcile}
            disabled={isChecking}
            className={styles.actionBtn}
          >
            {isChecking ? "Reconciling Documents..." : "Reconcile Trade Records"}
            <Play size={14} weight="bold" />
          </button>
        </div>
      </div>

      <div className={styles.demoBody}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "12px" }}>
          Synthetic Cross-Border Document Pair: <code>Commercial_Invoice_881.pdf vs Packing_List_881.pdf</code>
        </p>
        <div className={styles.codeArea}>{SYNTHETIC_TRADE_DOCS}</div>

        {analyzed && (
          <div className={styles.resultsPanel}>
            <div className={styles.scorecard}>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Customs Risk Score</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueCritical}`}>HIGH RISK</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Weight Discrepancy</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueCritical}`}>+320.00 KGS</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>HS Code Mismatch</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueWarning}`}>1 Item</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Est. Demurrage Saved</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueGood}`}>$1,200 – $4,500</div>
              </div>
            </div>

            <div className={styles.issuesList}>
              <div className={styles.issueCard}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagCritical}`}>Weight Variance · Port Hold Warning</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#ff6b6b" }}>Gross Weight Mismatch</span>
                </div>
                <div className={styles.issueTitle}>Declared 4,250 kg on Invoice vs 4,570 kg on Packing List</div>
                <div className={styles.issueDetails}>
                  A weight variance exceeding 5% triggers mandatory customs x-ray scanning and weighing bridge detention at Rotterdam Port terminals.
                </div>
                <div className={styles.remediationCode}>
                  Action: Adjust Commercial Invoice Item 2 gross weight from 1,800.00 KGS to 2,120.00 KGS to match certified scale manifest before Bill of Lading filing.
                </div>
              </div>

              <div className={`${styles.issueCard} ${styles.issueCardWarning}`}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagWarning}`}>Harmonized Tariff Discrepancy</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#ffaa00" }}>Item 1: Edge Gateway</span>
                </div>
                <div className={styles.issueTitle}>HS Code 8471.30 (Portable) vs 8471.50 (Processing Units)</div>
                <div className={styles.issueDetails}>
                  Commercial Invoice specifies portable automatic data processing machine (8471.30) while Packing List references standalone unit (8471.50). Inconsistent declaration leads to incorrect tariff duty assessment.
                </div>
                <div className={styles.remediationCode}>
                  Action: Harmonize to validated technical classification 8471.50 across all export declarations.
                </div>
              </div>

              <div className={`${styles.issueCard} ${styles.issueCardPass}`}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagPass}`}>Nuuvixx Trade Intelligence</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#00e676" }}>Verified Matrix Output</span>
                </div>
                <div className={styles.issueTitle}>Clean Structured JSON/CSV Export Ready</div>
                <div className={styles.issueDetails}>
                  Automated validation report and rectified dataset ready for one-click upload to your customs broker or ERP system.
                </div>
              </div>
            </div>

            <div className={styles.disclaimer}>
              Nuuvixx Trade Intelligence · Automated Multi-Document Reconciliation v1.0
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
