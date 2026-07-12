"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WarningCircle, Bug, GitFork } from "@phosphor-icons/react";
import styles from "./home.module.css";

export default function ProblemStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section ref={containerRef} className={styles.problemSection}>
      <motion.div style={{ opacity, y }} className={styles.eyebrow}>
        The Problem
      </motion.div>
      
      <motion.h2 style={{ opacity, y }} className={styles.problemQuote}>
        "Everyone is building AI applications.<br/>
        Nobody is building AI infrastructure."
      </motion.h2>

      <div className={styles.painPoints}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.painPoint}
        >
          <WarningCircle weight="fill" size={32} />
          <span>AI agents fail silently in production.</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={styles.painPoint}
        >
          <GitFork weight="fill" size={32} />
          <span>Orchestration frameworks are fragile.</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={styles.painPoint}
        >
          <Bug weight="fill" size={32} />
          <span>Observability doesn't exist at the agent-level.</span>
        </motion.div>
      </div>
    </section>
  );
}
