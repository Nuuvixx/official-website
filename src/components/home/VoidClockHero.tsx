"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, GithubLogo, CaretDoubleDown } from "@phosphor-icons/react";
import Magnetic from "@/components/ui/Magnetic";
import TelemetryTerminal from "./TelemetryTerminal";
import dynamic from "next/dynamic";
import styles from "./home.module.css";

/**
 * Spline lazy-loaded — only ever rendered on desktop.
 * On mobile we skip it entirely to avoid loading a 2MB WebGL runtime
 * on a device CPU that can't handle it without stuttering.
 */
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "radial-gradient(ellipse at 60% 50%, rgba(255,107,44,0.08) 0%, transparent 60%)",
      }}
    />
  ),
});

export default function VoidClockHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(containerRef, { amount: 0.1 });
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile — skip heavy 3D/terminal on small screens
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Tightened intro sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setIntroPhase(1), 300),
      setTimeout(() => setIntroPhase(2), 1000),
      setTimeout(() => setIntroPhase(3), 1400),
      setTimeout(() => setShowIntro(false), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      {/* INTRO ANIMATION OVERLAY */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className={styles.introOverlay}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Circuit lines background */}
            <div className={styles.circuitBg}>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.circuitLine}
                  style={{ top: `${12 + i * 12}%`, left: 0, right: 0 }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={introPhase >= 1 ? { scaleX: 1, opacity: 0.15 } : {}}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
                />
              ))}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`v-${i}`}
                  className={styles.circuitLineV}
                  style={{ left: `${15 + i * 14}%`, top: 0, bottom: 0 }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={introPhase >= 1 ? { scaleY: 1, opacity: 0.1 } : {}}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                />
              ))}
            </div>

            {/* Glow flare */}
            <motion.div
              className={styles.introGlowFlare}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={introPhase >= 1 ? { opacity: 1, scale: 1.2 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* NUUVIXX text */}
            <motion.div
              className={styles.introText}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={introPhase >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
              initial={{ opacity: 0, y: 12 }}
              animate={introPhase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Infrastructure for the machines that think
            </motion.p>

            {/* Scanning line */}
            {introPhase >= 1 && (
              <motion.div
                className={styles.scanLine}
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.2, ease: "linear", repeat: 0 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN HERO */}
      <section
        ref={containerRef}
        className={styles.heroSection}
      >
        {/* Robot Background — DESKTOP ONLY: lazy-loaded Spline 3D */}
        {!isMobile && (
          <div
            className={styles.robotBgContainer}
            style={{ display: isHeroInView ? "block" : "none" }}
          >
            <motion.div
              initial={{ x: "0vw", y: "0vh" }}
              animate={!showIntro ? { x: "24vw", y: "-15vh" } : { x: "0vw", y: "0vh" }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "140vw", height: "115vh", position: "absolute", left: "-20vw" }}
            >
              <Spline
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
          </div>
        )}

        {/* Mobile gradient background — lightweight replacement for Spline */}
        {isMobile && (
          <div className={styles.heroMobileBg} />
        )}

        {/* Background glow effects */}
        <div className={styles.heroGlowTop} />
        <div className={styles.heroGlowOrb} />
        <div className={styles.gridOverlay} />

        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className={styles.heroBadge}
            >
              <span className={styles.badgeDot} />
              Open Source · Production Ready
            </motion.div>

            <div className={styles.heroTitleContainer}>
              {(["Infrastructure", "for", "the machines", "that think."] as const).map((word, i) => (
                <div key={word} className={styles.heroTitleLine}>
                  <motion.span
                    initial={{ opacity: 0, y: 24 }}
                    animate={!showIntro ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`${styles.heroTitle}${i >= 2 ? ` ${styles.textVolt}` : ""}`}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={styles.heroSubtitle}
            >
              Nuuvixx builds the layer beneath the AI systems everyone else is building. Open-source.
              Production-grade. Built to last.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75, duration: 0.6 }}
              className={styles.heroCtas}
            >
              <Magnetic strength={isMobile ? 0 : 0.3}>
                <button className={styles.btnPrimary}>
                  Explore Ecosystem <ArrowRight weight="bold" />
                </button>
              </Magnetic>
              <Magnetic strength={isMobile ? 0 : 0.2}>
                <a
                  href="https://github.com/Nuuvixx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnGhost}
                >
                  <GithubLogo weight="fill" /> GitHub
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Terminal — DESKTOP ONLY */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={!showIntro ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 1.0, type: "spring", stiffness: 80, damping: 20 }}
              style={{ perspective: 1000, zIndex: 10, marginTop: "8vh" }}
            >
              <TelemetryTerminal />
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={!showIntro ? { opacity: 1, y: [0, 10, 0] } : {}}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: "var(--space-8)",
            left: "50%",
            transform: "translateX(-50%)",
            color: "var(--color-text-tertiary)",
          }}
        >
          <CaretDoubleDown size={24} />
        </motion.div>
      </section>
    </>
  );
}
