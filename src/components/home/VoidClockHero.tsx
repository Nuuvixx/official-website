"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, GithubLogo, CaretDoubleDown } from "@phosphor-icons/react";
import Magnetic from "@/components/ui/Magnetic";
import styles from "./home.module.css";

export default function VoidClockHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity, scale, y }}
      className={styles.heroSection}
    >
      <div className={styles.clockContainer}>
        {/* SVG Concentric Void Clock */}
        <div className={styles.voidClock}>
          <svg viewBox="0 0 200 200" className={`${styles.clockSvg} ${styles.spinSlow}`}>
            {/* Outer rings */}
            <circle cx="100" cy="100" r="95" className={styles.clockRing} />
            <circle cx="100" cy="100" r="85" className={styles.clockRingActive} strokeDasharray="4 8" />
            <circle cx="100" cy="100" r="75" className={styles.clockRing} />
            
            {/* Inner rings - counter rotating */}
            <g className={styles.spinFast} style={{ transformOrigin: '100px 100px' }}>
              <circle cx="100" cy="100" r="55" className={styles.clockRing} strokeDasharray="1 4" />
              <circle cx="100" cy="100" r="45" className={styles.clockRingActive} />
            </g>

            {/* Tick marks */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line 
                key={i}
                x1="100" y1="15" 
                x2="100" y2="25" 
                className={i % 3 === 0 ? styles.clockTickActive : styles.clockTick}
                transform={`rotate(${i * 30} 100 100)`} 
              />
            ))}
          </svg>
          <div className={`${styles.metric} ${styles.metricTop}`}>24.5k Stars</div>
          <div className={`${styles.metric} ${styles.metricRight}`}>890 Contributors</div>
          <div className={`${styles.metric} ${styles.metricBottom}`}>12.1k Commits</div>
          <div className={`${styles.metric} ${styles.metricLeft}`}>9 Products</div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          className={styles.heroContent}
        >
          <h1 className={styles.heroTitle}>
            Infrastructure for<br/>
            <span className={styles.textVolt}>the machines that think.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Nuuvixx builds the layer beneath the AI systems everyone else is building. Open-source. Production-grade. Built to last.
          </p>
          <div className={styles.heroCtas}>
            <Magnetic strength={0.3}>
              <button className={styles.btnPrimary}>
                Explore the Ecosystem <ArrowRight weight="bold" />
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <button className={styles.btnGhost}>
                <GithubLogo weight="fill" /> View on GitHub
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', bottom: 'var(--space-8)', color: 'var(--color-text-tertiary)' }}
      >
        <CaretDoubleDown size={24} />
      </motion.div>
    </motion.section>
  );
}
