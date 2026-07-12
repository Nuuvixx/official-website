"use client";
import { motion } from "framer-motion";
import styles from "./home.module.css";

export default function FeaturedBento() {
  return (
    <section className={styles.bentoSection}>
      <h2 className={styles.bentoHeader}>Flagship Products</h2>
      
      <div className={styles.bentoGrid}>
        {/* Large cell */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`${styles.bentoCard} ${styles.bentoLarge}`}
        >
          <div className={`${styles.bentoTag} ${styles.tagVolt}`}>[ AgentGovern ]</div>
          <h3 className={styles.bentoTitle}>Complete governance layer for autonomous agents.</h3>
          <p className={styles.bentoDesc}>Deploy agents with confidence. Set deterministic boundaries, audit trails, and permission scopes.</p>
        </motion.div>

        {/* Medium cell 1 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`${styles.bentoCard} ${styles.bentoSmall}`}
        >
          <div className={`${styles.bentoTag} ${styles.tagPulse}`}>[ BugPulse ]</div>
          <h3 className={styles.bentoTitle}>Real-time agent telemetry.</h3>
          <p className={styles.bentoDesc}>Trace logic errors across autonomous operations natively.</p>
        </motion.div>

        {/* Medium cell 2 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`${styles.bentoCard} ${styles.bentoSmall}`}
        >
          <div className={`${styles.bentoTag} ${styles.tagIce}`}>[ ContextForge ]</div>
          <h3 className={styles.bentoTitle}>Dynamic memory shaping.</h3>
          <p className={styles.bentoDesc}>Semantic routing and context window optimization at scale.</p>
        </motion.div>
      </div>
    </section>
  );
}
