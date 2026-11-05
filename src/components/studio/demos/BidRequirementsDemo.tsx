"use client";

import { useState } from "react";
import { Play } from "@phosphor-icons/react";
import styles from "./demos.module.css";

const SYNTHETIC_TENDER_EXCERPT = `CITY METROPOLITAN TRANSIT AUTHORITY
REQUEST FOR PROPOSAL (RFP) #2026-IT-094
TITLE: Autonomous Dispatch & Telemetry Fleet Integration System
ESTIMATED VALUE: $450,000 - $600,000 USD
CLOSING DATE & TIME: November 28, 2026 at 14:00 EST (Strict Deadline)
MANDATORY PRE-BID CONFERENCE: November 14, 2026 at 10:00 EST (Attendance Mandatory - Failure to attend results in immediate bid disqualification)

SECTION 3.2 - MINIMUM QUALIFICATIONS (PASS/FAIL CRITERIA):
3.2.1 Proposer must demonstrate a minimum of five (5) consecutive years of experience in enterprise fleet scheduling or real-time IoT telemetry software.
3.2.2 Proposer must hold active SOC2 Type II or ISO/IEC 27001 certification at time of proposal submission.
3.2.3 Proposer must provide three (3) client reference accounts from public sector or transit entities operating fleets of at least 150 vehicles.
3.2.4 Proposer must furnish a Bid Bond equal to 5% of the total proposed contract sum.

SECTION 7.4 - LIQUIDATED DAMAGES & PENALTIES:
Vendor agrees to pay $2,500 USD per calendar day for unexcused deployment delays exceeding established project milestones. Cumulative damages capped at 20% of total contract value.`;

export default function BidRequirementsDemo() {
  const [analyzed, setAnalyzed] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  const handleParseTender = () => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      setAnalyzed(true);
    }, 600);
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <div className={styles.demoTitleRow}>
          <span className={styles.demoBadge}>Interactive Prototype</span>
          <h4 className={styles.demoTitle}>Bid Intelligence: Tender Clause Parser & Compliance Matrix</h4>
        </div>
        <div className={styles.demoControls}>
          <button
            onClick={handleParseTender}
            disabled={isParsing}
            className={styles.actionBtn}
          >
            {isParsing ? "Extracting Requirements..." : "Extract Mandatory Criteria"}
            <Play size={14} weight="bold" />
          </button>
        </div>
      </div>

      <div className={styles.demoBody}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "12px" }}>
          Sample Public Sector Tender: <code>CityTransit_RFP_2026_Excerpt.txt</code> (Demonstrating mandatory qualification extraction)
        </p>
        <div className={styles.codeArea}>{SYNTHETIC_TENDER_EXCERPT}</div>

        {analyzed && (
          <div className={styles.resultsPanel}>
            <div className={styles.scorecard}>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Mandatory Gates</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueCritical}`}>4 Pass/Fail</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Disqualification Risk</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueWarning}`}>Pre-Bid Conf</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Estimated Bid Budget</div>
                <div className={styles.scoreValue}>$450K - $600K</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Submission Days Left</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueGood}`}>23 Days</div>
              </div>
            </div>

            <div className={styles.issuesList}>
              <div className={styles.issueCard}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagCritical}`}>Disqualification Trap · Critical</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#ff6b6b" }}>Mandatory Site Conference</span>
                </div>
                <div className={styles.issueTitle}>Nov 14, 2026: Mandatory Pre-Bid Conference Attendance</div>
                <div className={styles.issueDetails}>
                  Missing this session triggers automated administrative disqualification without proposal evaluation, regardless of technical merit or price.
                </div>
                <div className={styles.remediationCode}>
                  Action: Add calendar RSVP for authorized officer attendance and register company attendance credentials before Nov 12.
                </div>
              </div>

              <div className={`${styles.issueCard} ${styles.issueCardWarning}`}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagWarning}`}>Mandatory Certification Gate</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#ffaa00" }}>Clause 3.2.2</span>
                </div>
                <div className={styles.issueTitle}>Active SOC2 Type II or ISO/IEC 27001 Required At Submission</div>
                <div className={styles.issueDetails}>
                  Pending or self-certified audits do not qualify. Must attach active auditor report signed within the preceding 12 months.
                </div>
                <div className={styles.remediationCode}>
                  Go/No-Go Decision: If certification is in progress but unfinalized by Nov 28, decline lead or partner as a subcontractor with a certified prime.
                </div>
              </div>

              <div className={`${styles.issueCard} ${styles.issueCardPass}`}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagPass}`}>Nuuvixx Bid Intelligence Deliverable</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#00e676" }}>Full Compliance Matrix</span>
                </div>
                <div className={styles.issueTitle}>Clause-by-Clause Response Matrix Ready</div>
                <div className={styles.issueDetails}>
                  Our executive brief extracts all 4 mandatory criteria, 3 past performance references, and the 5% bid bond requirement into an editable spreadsheet template ready for your bid committee.
                </div>
              </div>
            </div>

            <div className={styles.disclaimer}>
              Nuuvixx Bid Intelligence · Procurement Extraction Engine v1.0
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
