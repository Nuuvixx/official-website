"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, GithubLogo, CaretDoubleDown } from "@phosphor-icons/react";
import Magnetic from "@/components/ui/Magnetic";
import TelemetryTerminal from "./TelemetryTerminal";
import Spline from '@splinetool/react-spline';
import styles from "./home.module.css";

export default function VoidClockHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Intro animation sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setIntroPhase(1), 300),   // Show NUUVIXX
      setTimeout(() => setIntroPhase(2), 1800),   // Glitch effect
      setTimeout(() => setIntroPhase(3), 2400),   // Expand to full layout
      setTimeout(() => setShowIntro(false), 3200), // Remove intro overlay
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const h1Text = "Infrastructure for".split(" ");
  const h1Text2 = "the machines that think.".split(" ");

  return (
    <>
      {/* INTRO ANIMATION OVERLAY */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className={styles.introOverlay}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Circuit lines background */}
            <div className={styles.circuitBg}>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.circuitLine}
                  style={{
                    top: `${12 + i * 12}%`,
                    left: 0,
                    right: 0,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={introPhase >= 1 ? { scaleX: 1, opacity: 0.15 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
                />
              ))}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`v-${i}`}
                  className={styles.circuitLineV}
                  style={{
                    left: `${15 + i * 14}%`,
                    top: 0,
                    bottom: 0,
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={introPhase >= 1 ? { scaleY: 1, opacity: 0.1 } : {}}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                />
              ))}
            </div>

            {/* Glow flare */}
            <motion.div
              className={styles.introGlowFlare}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={introPhase >= 1 ? { opacity: 1, scale: 1.2 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* NUUVIXX text */}
            <motion.div
              className={styles.introText}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={
                introPhase >= 2
                  ? { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }
                  : introPhase >= 1
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : {}
              }
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.introLetter}>N</span>
              <span className={styles.introLetter}>U</span>
              <span className={styles.introLetter}>U</span>
              <span className={styles.introLetter}>V</span>
              <span className={styles.introLetter}>I</span>
              <span className={styles.introLetter}>X</span>
              <span className={styles.introLetter}>X</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className={styles.introTagline}
              initial={{ opacity: 0, y: 20 }}
              animate={introPhase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Infrastructure for the machines that think
            </motion.p>

            {/* Scanning line */}
            {introPhase >= 1 && (
              <motion.div
                className={styles.scanLine}
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2, ease: "linear", repeat: 0 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN HERO */}
      <motion.section 
        ref={containerRef}
        style={{ opacity, scale }}
        className={styles.heroSection}
      >
        {/* Robot Background Animation */}
        <div className={styles.robotBgContainer}>
          <motion.div
            initial={{ x: "0vw", y: "0vh" }}
            animate={!showIntro ? { x: "24vw", y: "-15vh" } : { x: "0vw", y: "0vh" }}
            transition={{ delay: 1.5, duration: 2.5, ease: [0.76, 0, 0.24, 1] }}
            style={{ width: "140vw", height: "115vh", position: "absolute", left: "-20vw" }}
          >
            <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </motion.div>
        </div>
        {/* Background glow effects */}
        <div className={styles.heroGlowTop} />
        <div className={styles.heroGlowOrb} />
        <div className={styles.gridOverlay} />

        <div className={styles.heroGrid}>
          
          <div className={styles.heroContent}>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={styles.heroBadge}
            >
              <span className={styles.badgeDot} />
              Open Source · Production Ready
            </motion.div>

            <div className={styles.heroTitleContainer}>
              <div className={styles.heroTitleLine}>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={!showIntro ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={styles.heroTitle}
                >
                  Infrastructure
                </motion.span>
              </div>
              <div className={styles.heroTitleLine}>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={!showIntro ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={styles.heroTitle}
                >
                  for
                </motion.span>
              </div>
              <div className={styles.heroTitleLine}>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={!showIntro ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`${styles.heroTitle} ${styles.textVolt}`}
                >
                  the machines
                </motion.span>
              </div>
              <div className={styles.heroTitleLine}>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={!showIntro ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`${styles.heroTitle} ${styles.textVolt}`}
                >
                  that think.
                </motion.span>
              </div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, type: "spring", stiffness: 100, damping: 20 }}
              className={styles.heroSubtitle}
            >
              Nuuvixx builds the layer beneath the AI systems everyone else is building. Open-source. Production-grade. Built to last.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, type: "spring", stiffness: 100, damping: 20 }}
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
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={!showIntro ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 2.5, type: "spring", stiffness: 80, damping: 20 }}
            style={{ perspective: 1000, zIndex: 10, marginTop: "8vh" }}
          >
            <TelemetryTerminal />
          </motion.div>
          
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={!showIntro ? { opacity: 1, y: [0, 10, 0] } : {}}
          transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: 'var(--space-8)', left: '50%', transform: 'translateX(-50%)', color: 'var(--color-text-tertiary)' }}
        >
          <CaretDoubleDown size={24} />
        </motion.div>
      </motion.section>
    </>
  );
}
