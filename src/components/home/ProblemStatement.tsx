"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { WarningCircle, Bug, GitFork, ArrowRight } from "@phosphor-icons/react";
import styles from "./home.module.css";

const painPoints = [
  {
    id: "silent-failures",
    icon: WarningCircle,
    title: "Silent Failures",
    text: "AI agents fail silently in production without proper monitoring and alerts.",
    linkText: "View Telemetry",
    href: "https://bugpulse.nuuvixx.com",
    color: "#ff7e33", // Vibrant Orange
  },
  {
    id: "fragile-orchestration",
    icon: GitFork,
    title: "Fragile Orchestration",
    text: "Current orchestration frameworks are fragile and break unpredictably at scale.",
    linkText: "Explore Governance",
    href: "https://agentverse.nuuvixx.com",
    color: "#4facfe", // Vibrant Sky Blue
  },
  {
    id: "zero-observability",
    icon: Bug,
    title: "Zero Observability",
    text: "Observability doesn't exist at the agent-level, leaving your engineers blind.",
    linkText: "Fix Observability",
    href: "https://bugpulse.nuuvixx.com",
    color: "#4ade80", // Vibrant Light Green
  },
];

export default function ProblemStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkWidth = () => setIsDesktop(window.innerWidth > 1024);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const useDesktopAnimation = mounted && isDesktop;

  return (
    <section ref={containerRef} className={styles.problemSection}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={styles.eyebrow}
      >
        The Problem
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 36 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className={styles.problemQuote}
      >
        &ldquo;Everyone is building AI applications.
        <br />
        Nobody is building AI infrastructure.&rdquo;
      </motion.h2>

      <div className={styles.glowCardGrid} style={{ position: "relative" }}>
        
        {/* The Burst 'N' Symbol (Only on Desktop for the stack effect) */}
        {useDesktopAnimation && (
          <motion.div
            style={{
               position: "absolute",
               top: "40%", left: "50%",
               x: "-50%", y: "-50%",
               zIndex: 10,
               pointerEvents: "none",
               fontSize: "12rem",
               fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
               fontWeight: "900",
               color: "#ffffff",
               textShadow: "0 0 60px rgba(255,107,44,0.8), 0 0 120px rgba(79,172,254,0.8)"
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? {
               opacity: [0, 0, 1, 0, 0],
               scale: [0, 0, 1.2, 2.5, 2.5]
            } : {}}
            transition={{
               duration: 3.0,
               times: [0, 0.3, 0.45, 0.7, 1],
               ease: "easeInOut"
            }}
          >
            N
          </motion.div>
        )}

        {painPoints.map((point, i) => {
          const Icon = point.icon;
          
          // Desktop Stack Animation Logic
          const desktopX = i === 0 ? "calc(100% + 32px)" : i === 2 ? "calc(-100% - 32px)" : "0px";
          const desktopRotate = i === 0 ? -6 : i === 2 ? 6 : 0;
          
          const desktopAnimate = {
             opacity: [0, 1, 1, 1],
             y: [30, 0, 0, 0],
             x: [desktopX, desktopX, desktopX, "0px"],
             rotate: [desktopRotate, desktopRotate, desktopRotate, 0],
             zIndex: [i === 1 ? 5 : 1, i === 1 ? 5 : 1, i === 1 ? 5 : 1, 1],
          };

          // Mobile Stagger Logic (clean vertical entrance with no horizontal offset)
          const mobileAnimate = {
             opacity: 1, y: 0, x: 0, rotate: 0
          };

          return (
            <motion.div
              key={point.id}
              className={styles.glowCard}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? (useDesktopAnimation ? desktopAnimate : mobileAnimate) : {}}
              transition={useDesktopAnimation ? {
                 duration: 1.8,
                 times: [0, 0.2, 0.6, 1],
                 ease: "easeInOut"
              } : {
                 duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1]
              }}
              style={{
                "--card-color": point.color,
              } as React.CSSProperties}
            >
              {/* Massive ambient edge glows */}
              <div className={styles.glowCardTopLeft} />
              <div className={styles.glowCardBottom} />
              <div className={styles.glowCardBottomEdge} />
              
              <div className={styles.glowCardContent}>
                <div className={styles.glowCardNeonIcon}>
                  <Icon weight="bold" size={56} color="#fff" />
                </div>
                <h3 className={styles.glowCardTitle}>{point.title}</h3>
                <p className={styles.glowCardText}>{point.text}</p>
                <a
                  href={point.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.glowCardLink}
                  aria-label={`${point.linkText} — ${point.title}`}
                >
                  <span>{point.linkText}</span>
                  <ArrowRight weight="bold" size={16} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
