"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, GithubLogo, CaretDoubleDown } from "@phosphor-icons/react";
import Magnetic from "@/components/ui/Magnetic";
import TelemetryTerminal from "./TelemetryTerminal";
import styles from "./home.module.css";

export default function VoidClockHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const h1Text = "Infrastructure for".split(" ");
  const h1Text2 = "the machines that think.".split(" ");

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity, scale }}
      className={styles.heroSection}
    >
      <div className={styles.heroGrid}>
        
        <div className={styles.heroContent}>
          <div className={styles.heroTitleContainer}>
            <div className={styles.heroTitleLine}>
              {h1Text.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
                  className={styles.heroTitle}
                  style={{ marginRight: "0.2em" }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className={styles.heroTitleLine}>
              {h1Text2.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1), type: "spring", stiffness: 100, damping: 20 }}
                  className={`${styles.heroTitle} ${styles.textVolt}`}
                  style={{ marginRight: "0.2em" }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100, damping: 20 }}
            className={styles.heroSubtitle}
          >
            Nuuvixx builds the layer beneath the AI systems everyone else is building. Open-source. Production-grade. Built to last.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 100, damping: 20 }}
            className={styles.heroCtas}
          >
            <Magnetic strength={0.3}>
              <button className={styles.btnPrimary}>
                Explore Ecosystem <ArrowRight weight="bold" />
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <button className={styles.btnGhost}>
                <GithubLogo weight="fill" /> GitHub
              </button>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
          style={{ perspective: 1000 }}
        >
          <TelemetryTerminal />
        </motion.div>
        
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', bottom: 'var(--space-8)', left: '50%', transform: 'translateX(-50%)', color: 'var(--color-text-tertiary)' }}
      >
        <CaretDoubleDown size={24} />
      </motion.div>
    </motion.section>
  );
}
