"use client";
import { motion } from "framer-motion";
import styles from "./home.module.css";

export default function GitHubActivity() {
  // Generate 60 mock data points (resembling a real GitHub commit history)
  const data = Array.from({ length: 60 }, () => Math.floor(Math.random() * 100) + 10);

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
