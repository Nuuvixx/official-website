"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./home.module.css";
import { Cpu, Storefront, Bug } from "@phosphor-icons/react";

const nodes = [
  { icon: Cpu, label: "AgentVerse", color: "#FF6B2C", href: "https://agentverse.nuuvixx.com" },
  { icon: Storefront, label: "AgentStore", color: "#E5252A", href: "https://agentstore.nuuvixx.com" },
  { icon: Bug, label: "BugPulse", color: "#FF6B47", href: "https://bugpulse.nuuvixx.com" },
];

export default function FeaturedBento() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section ref={containerRef} className={styles.flowchartSection}>
      <div className={styles.flowchartContainer}>

        {/* Left Side: Typography */}
        <motion.div
          className={styles.flowchartTextContent}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.flowchartTitle}>
            THREE ECOSYSTEM <span className={styles.textRed}>PILLARS,</span><br/>
            BUILT FOR AUTONOMY.
          </h2>
          <p className={styles.flowchartDesc}>
            Build and execute in <strong>AgentVerse</strong>, discover verified agent manifests in <strong>AgentStore</strong>, and trace live telemetry with <strong>BugPulse</strong>.
          </p>
        </motion.div>

        {/* Right Side: Desktop SVG flowchart */}
        <motion.div
          className={styles.flowchartDiagram}
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg className={styles.flowLines} viewBox="0 0 500 350">
            <defs>
              <filter id="neonRedGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d="M 180 175 C 230 175, 230 100, 280 100" fill="none" stroke="#FF6B2C" strokeWidth="3" filter="url(#neonRedGlow)" />
            <path d="M 180 175 C 230 175, 230 250, 280 250" fill="none" stroke="#E5252A" strokeWidth="3" filter="url(#neonRedGlow)" />
          </svg>
          <a href="https://agentverse.nuuvixx.com" target="_blank" rel="noopener noreferrer" className={`${styles.flowNode} ${styles.node1}`}>
            <Cpu size={20} weight="fill" style={{ color: "#FF6B2C" }} />
            <span>AgentVerse</span>
          </a>
          <a href="https://agentstore.nuuvixx.com" target="_blank" rel="noopener noreferrer" className={`${styles.flowNode} ${styles.node2}`}>
            <Storefront size={20} weight="fill" style={{ color: "#E5252A" }} />
            <span>AgentStore</span>
          </a>
          <a href="https://bugpulse.nuuvixx.com" target="_blank" rel="noopener noreferrer" className={`${styles.flowNode} ${styles.node3}`}>
            <Bug size={20} weight="fill" style={{ color: "#FF6B47" }} />
            <span>BugPulse</span>
          </a>
        </motion.div>

        {/* Mobile-only: stacked product pills */}
        <div className={styles.flowchartMobilePills}>
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.a
                key={node.label}
                href={node.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.flowchartPill}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Icon size={20} weight="fill" style={{ color: node.color }} />
                <span>{node.label}</span>
                <span className={styles.pillArrow}>→</span>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
