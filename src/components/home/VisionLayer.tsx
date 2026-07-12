"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./home.module.css";

export default function VisionLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "center center"]
  });

  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={containerRef} className={styles.visionSection}>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.visionTitle}
      >
        We are the layer that makes AI production-ready.
      </motion.h2>

      <div className={styles.layerDiagram}>
        <motion.div style={{ y: layer1Y }} className={`${styles.layer} ${styles.layerApp}`}>
          <h3 style={{ color: "var(--color-ice)", fontFamily: "var(--font-jetbrains-mono)" }}>[ AI Applications ]</h3>
          <p style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-2)" }}>Agents, Copilots, Workflows</p>
        </motion.div>

        <motion.div style={{ y: layer2Y, zIndex: 10 }} className={`${styles.layer} ${styles.layerNuuvixx}`}>
          <h3 style={{ color: "var(--color-volt)", fontFamily: "var(--font-jetbrains-mono)", fontSize: "var(--font-size-xl)" }}>[ The Nuuvixx Layer ]</h3>
          <p style={{ color: "var(--color-void)", marginTop: "var(--space-2)", fontWeight: 500 }}>Governance · Observability · Orchestration</p>
        </motion.div>

        <motion.div style={{ y: layer3Y }} className={`${styles.layer} ${styles.layerCloud}`}>
          <h3 style={{ color: "var(--color-text-tertiary)", fontFamily: "var(--font-jetbrains-mono)" }}>[ Cloud Infrastructure ]</h3>
          <p style={{ color: "var(--color-text-tertiary)", marginTop: "var(--space-2)" }}>Compute, Storage, Networking</p>
        </motion.div>
      </div>
    </section>
  );
}
