"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./home.module.css";
import { Users, TrendUp, Cube, Globe } from "@phosphor-icons/react";

/**
 * Performance note: blur() filters have been removed from all entrance
 * animations. Animating filter: blur() forces browser repaints on every
 * frame and cannot be offloaded to the GPU compositor. We use only
 * opacity + transform (y/x) which run entirely on the compositor thread.
 */

const mobileFeatures = [
  {
    icon: Globe,
    label: "AI Applications",
    sub: "Agents, Copilots, Workflows",
    color: "#a78bfa",
  },
  {
    icon: Cube,
    label: "Nuuvixx Layer",
    sub: "Governance & Orchestration",
    color: "#d8b4fe",
  },
  {
    icon: TrendUp,
    label: "Observability",
    sub: "Real-time Telemetry",
    color: "#818cf8",
  },
  {
    icon: Users,
    label: "Cloud Infra",
    sub: "Compute, Storage, Networking",
    color: "#c4b5fd",
  },
];

export default function VisionLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-120px" });

  return (
    <section ref={containerRef} className={styles.visionSection}>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={styles.visionTitle}
      >
        We are the layer that makes AI production-ready.
      </motion.h2>

      {/* ── DESKTOP: Orbital globe + floating cards ── */}
      <div className={styles.orbitalContainer}>
        {/* Central 3D Glowing Sphere with orbital rings */}
        <div className={styles.orbitalCenter}>
          <div className={styles.globeCore} />
          <div className={styles.globeGrid} />
          <div className={styles.globeRing1} />
          <div className={styles.globeRing2} />
          <div className={styles.globeGlow} />
        </div>

        {/* Top Left: AI Applications */}
        <motion.div
          className={`${styles.floatingCard} ${styles.cardTopLeft}`}
          initial={{ opacity: 0, x: -40, y: -16 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.cardHeader}>[ AI Applications ]</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>Agents, Copilots, Workflows</div>
          <div className={styles.radarChart}>
            <div className={styles.radarCircle1} />
            <div className={styles.radarCircle2} />
            <div className={styles.radarCircle3} />
            <div className={styles.radarLine} />
            <div className={styles.radarDot} />
          </div>
        </motion.div>

        {/* Top Right: The Nuuvixx Layer */}
        <motion.div
          className={`${styles.floatingCard} ${styles.cardTopRight}`}
          initial={{ opacity: 0, x: 40, y: -16 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.cardHeader}>[ The Nuuvixx Layer ]</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>Governance & Orchestration</div>
          <div className={styles.barChart}>
            <div className={styles.bar} style={{ height: "20%" }} />
            <div className={styles.bar} style={{ height: "30%" }} />
            <div className={styles.bar} style={{ height: "50%" }} />
            <div className={styles.bar} style={{ height: "70%" }} />
            <div className={styles.bar} style={{ height: "100%" }} />
          </div>
        </motion.div>

        {/* Bottom Left: Observability */}
        <motion.div
          className={`${styles.floatingCard} ${styles.cardBottomLeft}`}
          initial={{ opacity: 0, x: -40, y: 16 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.cardHeaderWithBadge}>[ Observability ]</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>Real-time Telemetry</div>
          <div className={styles.areaChart}>
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" className={styles.areaSvg}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,50 L0,40 L20,35 L40,40 L60,20 L80,30 L100,10 L100,50 Z" fill="url(#areaGradient)" />
              <path d="M0,40 L20,35 L40,40 L60,20 L80,30 L100,10" fill="none" stroke="#d8b4fe" strokeWidth="2" />
            </svg>
          </div>
        </motion.div>

        {/* Bottom Right: Cloud Infrastructure */}
        <motion.div
          className={`${styles.floatingCard} ${styles.cardBottomRight}`}
          initial={{ opacity: 0, x: 40, y: 16 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.cardHeader}>[ Cloud Infra ]</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>Compute, Storage, Networking</div>
          <div className={styles.engagementVisual}>
            <div className={styles.phoneMockup}>
              <div className={styles.phoneNotch} />
            </div>
            <div className={`${styles.userAvatar} ${styles.avatar1}`}><Users size={12} weight="fill" /></div>
            <div className={`${styles.userAvatar} ${styles.avatar2}`}><Users size={12} weight="fill" /></div>
            <div className={`${styles.userAvatar} ${styles.avatar3}`}><Users size={12} weight="fill" /></div>
          </div>
        </motion.div>
      </div>

      {/* ── MOBILE: 2×2 feature card grid ── */}
      <div className={styles.visionMobileGrid}>
        {mobileFeatures.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.label}
              className={styles.visionMobileCard}
              style={{ "--vision-color": f.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Icon size={28} weight="duotone" style={{ color: f.color }} />
              <div>
                <div className={styles.visionMobileLabel}>{f.label}</div>
                <div className={styles.visionMobileSub}>{f.sub}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
