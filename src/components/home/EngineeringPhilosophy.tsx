"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./home.module.css";

const principles = [
  { num: "01", title: "OPEN BY DEFAULT", desc: "Code is reviewed by the world. That's the highest possible quality bar.", color: "#ff7e33" },
  { num: "02", title: "PRODUCTION OR NOTHING", desc: "We don't ship research demos. We ship resilient systems that scale globally.", color: "#4facfe" },
  { num: "03", title: "AGENTS NEED INFRASTRUCTURE", desc: "You wouldn't run a production server without monitoring. Neither should your agents.", color: "#4ade80" }
];

export default function EngineeringPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className={styles.philosophySection}>
      <motion.h2 
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={styles.philosophyHeader}
      >
        Engineering Philosophy
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        style={{ textAlign: "center", color: "var(--color-text-secondary)", marginBottom: "var(--space-16)", fontSize: "var(--font-size-lg)" }}
      >
        How we build systems that last.
      </motion.p>
      <div className={styles.glowCardGrid}>
        {principles.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ 
              duration: 1, 
              delay: 0.2 + i * 0.15, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className={styles.glowCard}
            style={{ "--card-color": p.color } as React.CSSProperties}
          >
            {/* Massive ambient edge glows from Problem section */}
            <div className={styles.glowCardTopLeft} />
            <div className={styles.glowCardBottom} />
            <div className={styles.glowCardBottomEdge} />
            
            <div className={styles.glowCardContent}>
              <div className={styles.glowCardNeonIcon} style={{ fontSize: "3rem", fontFamily: "var(--font-geist-mono), monospace" }}>
                {p.num}
              </div>
              <h3 className={styles.glowCardTitle} style={{ fontSize: "1.25rem" }}>{p.title}</h3>
              <p className={styles.glowCardText} style={{ marginBottom: 0 }}>{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
