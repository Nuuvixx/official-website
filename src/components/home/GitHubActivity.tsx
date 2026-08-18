"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./home.module.css";

// Stable hardcoded dataset — no Math.random() to avoid SSR/client hydration mismatch
const ACTIVITY_DATA = [
  20, 39, 53, 77, 40, 80, 52, 63, 88, 42, 12, 91, 94, 65, 13, 93, 53, 22, 84, 62,
  19, 31, 88, 67, 85, 58, 104, 34, 44, 26, 56, 90, 50, 81, 12, 29, 25, 81, 92, 63,
  108, 100, 69, 54, 14, 90, 75, 12, 75, 83, 37, 105, 109, 104, 24, 14, 45, 75, 96, 79,
];

export default function GitHubActivity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const data = ACTIVITY_DATA;

  return (
    <section ref={containerRef} className={styles.githubSection}>
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={styles.eyebrow}
      >
        Live Activity
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "clamp(1.75rem, 4vw, var(--font-size-4xl))", fontWeight: 700, textAlign: "center", marginBottom: "var(--space-4)" }}
      >
        We build every day.
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        style={{ color: "var(--color-text-secondary)" }}
      >
        Last 60 days of commits across the open-source Nuuvixx ecosystem.
      </motion.p>
      
      <div className={styles.activityGrid}>
        {data.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={isInView ? { height: `${h}%`, opacity: 1 } : {}}
            transition={{ delay: 0.2 + i * 0.008, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={styles.activityBar}
            title={`${h} commits`}
          />
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        style={{ marginTop: "var(--space-8)", display: "flex", gap: "var(--space-12)", fontFamily: "var(--font-geist-mono), monospace" }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-volt)", fontWeight: "bold" }}>1,492</div>
          <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-tertiary)" }}>Commits (30d)</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-volt)", fontWeight: "bold" }}>5</div>
          <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-tertiary)" }}>Active Repos</div>
        </div>
      </motion.div>
    </section>
  );
}
