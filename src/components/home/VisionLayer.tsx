"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./home.module.css";
import { Users } from "@phosphor-icons/react";

export default function VisionLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-120px" });

  return (
    <section ref={containerRef} className={styles.visionSection}>
      
      {/* Heading */}
      <motion.h2 
        initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={styles.visionTitle}
      >
        We are the layer that makes AI production-ready.
      </motion.h2>

      <div className={styles.orbitalContainer}>
        {/* Central 3D Glowing Sphere with orbital rings */}
        <div className={styles.orbitalCenter}>
        <div className={styles.globeCore} />
        <div className={styles.globeGrid} />
        <div className={styles.globeRing1} />
        <div className={styles.globeRing2} />
        <div className={styles.globeGlow} />
      </div>

      {/* Floating Cards */}
      {/* Top Left: AI Applications */}
      <motion.div 
        className={`${styles.floatingCard} ${styles.cardTopLeft}`}
        initial={{ opacity: 0, x: -50, y: -20, filter: "blur(10px)" }}
        animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
        initial={{ opacity: 0, x: 50, y: -20, filter: "blur(10px)" }}
        animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.cardHeader}>[ The Nuuvixx Layer ]</div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>Governance & Orchestration</div>
        <div className={styles.barChart}>
           <div className={styles.bar} style={{height: "20%"}} />
           <div className={styles.bar} style={{height: "30%"}} />
           <div className={styles.bar} style={{height: "50%"}} />
           <div className={styles.bar} style={{height: "70%"}} />
           <div className={styles.bar} style={{height: "100%"}} />
        </div>
      </motion.div>

      {/* Bottom Left: Observability */}
      <motion.div 
        className={`${styles.floatingCard} ${styles.cardBottomLeft}`}
        initial={{ opacity: 0, x: -50, y: 20, filter: "blur(10px)" }}
        animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.cardHeaderWithBadge}>
           [ Observability ]
        </div>
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
        initial={{ opacity: 0, x: 50, y: 20, filter: "blur(10px)" }}
        animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
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

    </section>
  );
}
