"use client";
import { motion } from "framer-motion";
import styles from "./home.module.css";

const principles = [
  { num: "01", title: "OPEN BY DEFAULT", desc: "Code is reviewed by the world. That's the highest possible quality bar." },
  { num: "02", title: "PRODUCTION OR NOTHING", desc: "We don't ship research demos. We ship resilient systems that scale globally." },
  { num: "03", title: "AGENTS NEED INFRASTRUCTURE", desc: "You wouldn't run a production server without monitoring. Neither should your agents." }
];

export default function EngineeringPhilosophy() {
  return (
    <section className={styles.philosophySection}>
      <h2 className={styles.philosophyHeader}>Engineering Philosophy</h2>
      <p style={{ textAlign: "center", color: "var(--color-text-secondary)", marginBottom: "var(--space-16)", fontFamily: "var(--font-inter)", fontSize: "var(--font-size-lg)" }}>How we build systems that last.</p>
      <div className={styles.principles}>
        {principles.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.2 }}
            className={styles.principleCard}
          >
            <div className={styles.principleNum}>{p.num}</div>
            <h3 className={styles.principleTitle}>{p.title}</h3>
            <p className={styles.principleDesc}>{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
