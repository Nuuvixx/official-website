"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./home.module.css";
import { User, RocketLaunch, ShareNetwork } from "@phosphor-icons/react";

const nodes = [
  { icon: User, label: "AgentGovern", color: "#ff3b30" },
  { icon: RocketLaunch, label: "BugPulse", color: "#ff6b47" },
  { icon: ShareNetwork, label: "ContextForge", color: "#ff3b30" },
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
            FLAGSHIP <span className={styles.textRed}>PRODUCTS,</span><br/>
            BUILT FOR AUTONOMY.
          </h2>
          <p className={styles.flowchartDesc}>
            Deploy agents with confidence. Set deterministic boundaries, trace logic errors, and shape dynamic memory natively at scale.
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
            <path d="M 180 175 C 230 175, 230 100, 280 100" fill="none" stroke="#ff3b30" strokeWidth="3" filter="url(#neonRedGlow)" />
            <path d="M 180 175 C 230 175, 230 250, 280 250" fill="none" stroke="#ff3b30" strokeWidth="3" filter="url(#neonRedGlow)" />
          </svg>
          <div className={`${styles.flowNode} ${styles.node1}`}>
            <User size={20} weight="fill" className={styles.iconRed} />
            <span>AgentGovern</span>
          </div>
          <div className={`${styles.flowNode} ${styles.node2}`}>
            <RocketLaunch size={20} weight="fill" className={styles.iconRed} />
            <span>BugPulse</span>
          </div>
          <div className={`${styles.flowNode} ${styles.node3}`}>
            <ShareNetwork size={20} weight="fill" className={styles.iconRed} />
            <span>ContextForge</span>
          </div>
        </motion.div>

        {/* Mobile-only: stacked product pills */}
        <div className={styles.flowchartMobilePills}>
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.label}
                className={styles.flowchartPill}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Icon size={20} weight="fill" style={{ color: node.color }} />
                <span>{node.label}</span>
                <span className={styles.pillArrow}>→</span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
