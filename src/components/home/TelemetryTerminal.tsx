"use client";
import { motion } from "framer-motion";
import styles from "./home.module.css";

export default function TelemetryTerminal() {
  const terminalLines = [
    { text: "INIT // Nuuvixx Core Infrastructure", delay: 0 },
    { text: "ESTABLISHING SECURE CHANNEL...", delay: 0.5 },
    { text: "CONNECTION: [ OK ]", delay: 0.8 },
    { text: "LOAD MODULE: AgentGovern_v2.4", delay: 1.2 },
    { text: "LOAD MODULE: BugPulse_Telem", delay: 1.4 },
    { text: "SYSTEM STATUS: OPERATIONAL", delay: 2.0 },
    { text: "> WAITING FOR INPUT_", delay: 2.5, typing: true },
  ];

  return (
    <div className={styles.telemetryContainer}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalDots}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.terminalTitle}>nuuvixx-telem-server</div>
      </div>
      <div className={styles.terminalBody}>
        {terminalLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: line.delay, type: "spring", stiffness: 100, damping: 20 }}
            className={styles.terminalLine}
          >
            <span className={styles.terminalTimestamp}>
              [{new Date().toISOString().split("T")[1].slice(0, 8)}]
            </span>
            <span className={line.typing ? styles.typingEffect : ""}>{line.text}</span>
          </motion.div>
        ))}
      </div>
      <div className={styles.telemetryOverlay} />
    </div>
  );
}
