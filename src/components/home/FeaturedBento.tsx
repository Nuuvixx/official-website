"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./home.module.css";
import { User, CheckCircle, RocketLaunch, ShareNetwork } from "@phosphor-icons/react";

export default function FeaturedBento() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section ref={containerRef} className={styles.flowchartSection}>
      <div className={styles.flowchartContainer}>
        
        {/* Left Side: Typography */}
        <motion.div 
          className={styles.flowchartTextContent}
          initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.flowchartTitle}>
            FLAGSHIP <span className={styles.textRed}>PRODUCTS,</span><br/>
            BUILT FOR AUTONOMY.
          </h2>
          <p className={styles.flowchartDesc}>
            Deploy agents with confidence. Set deterministic boundaries, trace logic errors, and shape dynamic memory natively at scale.
          </p>
        </motion.div>

        {/* Right Side: Flowchart Diagram */}
        <motion.div 
          className={styles.flowchartDiagram}
          initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* SVG connecting lines with neon red glow */}
          <svg className={styles.flowLines} viewBox="0 0 500 350">
             <defs>
               <filter id="neonRedGlow" x="-20%" y="-20%" width="140%" height="140%">
                 <feGaussianBlur stdDeviation="4" result="blur" />
                 <feMerge>
                   <feMergeNode in="blur" />
                   <feMergeNode in="SourceGraphic" />
                 </feMerge>
               </filter>
             </defs>
             
             {/* Node 1 to Node 2 (Up curve) */}
             <path d="M 180 175 C 230 175, 230 100, 280 100" fill="none" stroke="#ff3b30" strokeWidth="3" filter="url(#neonRedGlow)" />
             
             {/* Node 1 to Node 3 (Down curve) */}
             <path d="M 180 175 C 230 175, 230 250, 280 250" fill="none" stroke="#ff3b30" strokeWidth="3" filter="url(#neonRedGlow)" />
          </svg>

          {/* Flow Nodes */}
          <div className={`${styles.flowNode} ${styles.node1}`}>
            <User size={20} weight="fill" className={styles.iconRed} />
            <span>AgentGovern</span>
          </div>
          
          <div className={`${styles.flowNode} ${styles.node2}`}>
            <RocketLaunch size={20} weight="fill" className={styles.iconRed} />
            <span>BugPulse</span>
          </div>
          
          <div className={`${styles.flowNode} ${styles.node3}`}>
            <ShareNetwork size={20} weight="fill" className={styles.iconRed} />
            <span>ContextForge</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
