"use client";

import { useState } from "react";
import { Sparkle } from "@phosphor-icons/react";
import styles from "./demos.module.css";

const PRODUCT_BRIEF_SAMPLE = `{
  "brandName": "LuminaDesk",
  "product": "Modular Ergonomic Standing Desk Controller with AI Posture Sensor",
  "keyBenefits": [
    "Tracks desk time and alerts user when slouching",
    "Whisper-quiet dual motor (<40dB)",
    "Integrates with Apple Watch and Mac Menu Bar"
  ],
  "targetAudience": "Remote software engineers and founders working 10+ hrs/day",
  "channels": ["TikTok", "Meta Reels", "YouTube Shorts (9:16)"]
}`;

export default function CreativeWorkflowDemo() {
  const [generated, setGenerated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGenerateWorkflow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setGenerated(true);
    }, 600);
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <div className={styles.demoTitleRow}>
          <span className={styles.demoBadge}>Interactive Prototype</span>
          <h4 className={styles.demoTitle}>Nuuvixx Creative: AI Commercial Ad & Storyboard Pipeline</h4>
        </div>
        <div className={styles.demoControls}>
          <button
            onClick={handleGenerateWorkflow}
            disabled={isProcessing}
            className={styles.actionBtn}
          >
            {isProcessing ? "Synthesizing Pipeline..." : "Generate Commercial Storyboard"}
            <Sparkle size={14} weight="fill" />
          </button>
        </div>
      </div>

      <div className={styles.demoBody}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "12px" }}>
          Input Product Brief: <code>LuminaDesk_Campaign_Brief.json</code>
        </p>
        <div className={styles.codeArea}>{PRODUCT_BRIEF_SAMPLE}</div>

        {generated && (
          <div className={styles.resultsPanel}>
            <div className={styles.scorecard}>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Ad Concepts Produced</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueGood}`}>3 Angles</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Aspect Ratios</div>
                <div className={styles.scoreValue}>9:16 · 16:9</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Expected CTR Lift</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueGood}`}>+45% – 80%</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Turnaround</div>
                <div className={styles.scoreValue}>72 Hours</div>
              </div>
            </div>

            <div className={styles.issuesList}>
              <div className={styles.issueCard}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagCritical}`}>Angle 01 · Pain-Hook Architecture</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "var(--color-volt)" }}>Hook: &quot;Why your back screams at 3PM&quot;</span>
                </div>
                <div className={styles.issueTitle}>0:00–0:03 Visual Hook Sequence</div>
                <div className={styles.issueDetails}>
                  Extreme close-up of tired developer posture in dimly lit studio, camera zooms out rapidly as ambient neon alert glows subtly on the desk rim. Kinetic bold text overlay: &quot;STILL SITTING LIKE A SHRIMP?&quot;
                </div>
                <div className={styles.remediationCode}>
                  Voiceover: &quot;Your standing desk was supposed to fix your back. Why is it stuck at sitting height since January?&quot;
                </div>
              </div>

              <div className={`${styles.issueCard} ${styles.issueCardWarning}`}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagWarning}`}>Angle 02 · Tech Curiosity & ASMR Precision</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#ffaa00" }}>Hook: &quot;The desk that remembers your spine&quot;</span>
                </div>
                <div className={styles.issueTitle}>0:03–0:12 Core Product Motion Flow</div>
                <div className={styles.issueDetails}>
                  Smooth mechanical transition of LuminaDesk elevating effortlessly. Clean macro shot of custom OLED controller displaying posture metrics and synchronized macOS notification popup.
                </div>
                <div className={styles.remediationCode}>
                  Sound Design: Crisp tactile motor hum, subtle frequency shift, satisfying UI confirmation chime.
                </div>
              </div>

              <div className={`${styles.issueCard} ${styles.issueCardPass}`}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagPass}`}>Nuuvixx Creative Deliverable</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#00e676" }}>Production-Ready Package</span>
                </div>
                <div className={styles.issueTitle}>Full Commercial Variations & Captions Included</div>
                <div className={styles.issueDetails}>
                  We deliver final graded MP4 masters with dynamic burned-in kinetic subtitles, vertical (TikTok/Reels) and horizontal (Web/YouTube) crops, and alternate hook cuts for continuous ad testing.
                </div>
              </div>
            </div>

            <div className={styles.disclaimer}>
              Nuuvixx Creative · Commercial Production Workflow Engine v1.0
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
