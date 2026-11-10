import React from "react";
import styles from "./editorial-process.module.css";

const steps = [
  {
    number: "01",
    title: "Understand the problem",
    eyebrow: "DISCOVERY & SCOPE",
    description:
      "We begin by inspecting actual source code, database architectures, feed payloads, and document flows. We establish a verified baseline of what exists before writing a single proposal or line of code.",
    points: [
      "No speculative feature design or invented constraints",
      "Direct technical inspection with founding engineers",
      "Clear bounding of deliverables and known exclusions",
    ],
  },
  {
    number: "02",
    title: "Build and verify",
    eyebrow: "ENGINEERING & TESTS",
    description:
      "Implementation is performed incrementally with evidence-driven verification. Every commercial delivery includes unit tests, automated edge-case fuzzing, and verified security boundaries.",
    points: [
      "Rigorous unit and end-to-end regression test suites",
      "Least-privilege role separation and RLS enforcement",
      "Local sandboxing so client data remains protected",
    ],
  },
  {
    number: "03",
    title: "Deliver and improve",
    eyebrow: "HANDOFF & LONGEVITY",
    description:
      "We deliver clean, documented solutions that your internal engineers can maintain without long-term vendor lock-in. When ongoing support is needed, we operate with transparent SLAs and predictable fixed scopes.",
    points: [
      "Complete runbooks and reproducible migration scripts",
      "Architectural documentation and clean commit histories",
      "Zero hidden dependencies or proprietary walled gardens",
    ],
  },
];

export default function EditorialProcess() {
  return (
    <section className={styles.section} aria-label="How Nuuvixx Works">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.kicker}>
            <span className={styles.kickerNum}>{"// 02"}</span>
            <span>DISCIPLINE &amp; METHODOLOGY</span>
          </div>
          <h2 className={styles.title}>How we work.</h2>
          <p className={styles.subtitle}>
            A disciplined, evidence-based engineering process that prioritizes correctness and verification over unverified speed.
          </p>
        </header>

        <div className={styles.chaptersGrid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.chapterCard}>
              <div className={styles.cardHeader}>
                <span className={styles.chapterNumber}>{step.number}</span>
                <span className={styles.chapterEyebrow}>{step.eyebrow}</span>
              </div>

              <h3 className={styles.chapterTitle}>{step.title}</h3>
              <p className={styles.chapterDesc}>{step.description}</p>

              <div className={styles.divider} aria-hidden="true" />

              <ul className={styles.pointList}>
                {step.points.map((pt, i) => (
                  <li key={i} className={styles.pointItem}>
                    <span className={styles.bullet} aria-hidden="true">›</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

