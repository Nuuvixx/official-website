"use client";
import { motion } from "framer-motion";
import styles from "./home.module.css";

// Stable hardcoded dataset — no Math.random() to avoid SSR/client hydration mismatch
const ACTIVITY_DATA = [
  20, 39, 53, 77, 40, 80, 52, 63, 88, 42, 12, 91, 94, 65, 13, 93, 53, 22, 84, 62,
  19, 31, 88, 67, 85, 58, 104, 34, 44, 26, 56, 90, 50, 81, 12, 29, 25, 81, 92, 63,
  108, 100, 69, 54, 14, 90, 75, 12, 75, 83, 37, 105, 109, 104, 24, 14, 45, 75, 96, 79,
];

export default function GitHubActivity() {
  const data = ACTIVITY_DATA;

  return (
    <section className={styles.githubSection}>
      <div className={styles.eyebrow}>Live Activity</div>
      <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "var(--font-size-4xl)", textAlign: "center", marginBottom: "var(--space-4)" }}>We build every day.</h2>
      <p style={{ color: "var(--color-text-secondary)" }}>Last 60 days of commits across the open-source Nuuvixx ecosystem.</p>
      
      <div className={styles.activityGrid}>
        {data.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ delay: i * 0.015, duration: 0.6, ease: "easeOut" }}
            className={styles.activityBar}
            title={`${h} commits`}
          />
        ))}
      </div>
      
      <div style={{ marginTop: "var(--space-8)", display: "flex", gap: "var(--space-12)", fontFamily: "var(--font-jetbrains-mono)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-volt)", fontWeight: "bold" }}>1,492</div>
          <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-tertiary)" }}>Commits (30d)</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-volt)", fontWeight: "bold" }}>5</div>
          <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-tertiary)" }}>Active Repos</div>
        </div>
      </div>
    </section>
  );
}
