"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./home.module.css";

interface TerminalLine {
  text: string;
  status: "info" | "warn" | "success" | "input" | "system" | "progress";
}

const BOOT_SEQUENCE: TerminalLine[] = [
  { text: "$ nuuvixx-core --init", status: "input" },
  { text: "", status: "system" },
  { text: "████████████████████████████████ 100%", status: "progress" },
  { text: "", status: "system" },
  { text: "INIT // Nuuvixx Core Infrastructure v2.4.1", status: "system" },
  { text: "ESTABLISHING SECURE CHANNEL...", status: "warn" },
  { text: "CONNECTION: [ OK ]", status: "success" },
  { text: "", status: "system" },
  { text: "LOAD MODULE: AgentVerse_OS       ✓", status: "info" },
  { text: "LOAD MODULE: AgentStore_Registry ✓", status: "info" },
  { text: "LOAD MODULE: BugPulse_Telem      ✓", status: "info" },
  { text: "LOAD MODULE: Synapse_Router      ✓", status: "info" },
  { text: "", status: "system" },
  { text: "ALL MODULES: [ READY ]", status: "success" },
  { text: "SYSTEM STATUS: OPERATIONAL", status: "success" },
  { text: "", status: "system" },
  { text: "> AWAITING INPUT_", status: "input" },
];

export default function TelemetryTerminal() {
  const [timeStr, setTimeStr] = useState("00:00:00");
  const [showNIntro, setShowNIntro] = useState(true);
  const [nPhase, setNPhase] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<{ text: string; status: string; done: boolean }[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [bootStarted, setBootStarted] = useState(false);

  useEffect(() => {
    setTimeStr(new Date().toISOString().split("T")[1].slice(0, 8));
  }, []);

  // N intro animation phases inside terminal
  // Synced with faster hero intro (1.8s) + snappy robot slide (~0.1s delay + 0.7s dur)
  useEffect(() => {
    const delay = 1800;
    const timers = [
      setTimeout(() => setNPhase(1), delay + 200),
      setTimeout(() => setNPhase(2), delay + 800),
      setTimeout(() => setNPhase(3), delay + 1200),
      setTimeout(() => {
        setShowNIntro(false);
        setBootStarted(true);
      }, delay + 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Typewriter engine
  useEffect(() => {
    if (!bootStarted) return;
    if (currentLineIdx >= BOOT_SEQUENCE.length) return;

    const line = BOOT_SEQUENCE[currentLineIdx];

    if (line.text === "") {
      setDisplayedLines(prev => [...prev, { text: "", status: line.status, done: true }]);
      const t = setTimeout(() => {
        setCurrentLineIdx(prev => prev + 1);
        setCurrentCharIdx(0);
      }, 120);
      return () => clearTimeout(t);
    }

    const isProgress = line.status === "progress";
    const speed = isProgress ? 6 : line.status === "input" ? 35 : 18;

    if (currentCharIdx === 0) {
      setDisplayedLines(prev => [...prev, { text: "", status: line.status, done: false }]);
    }

    if (currentCharIdx < line.text.length) {
      const t = setTimeout(() => {
        setDisplayedLines(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = { ...last, text: line.text.slice(0, currentCharIdx + 1) };
          return updated;
        });
        setCurrentCharIdx(prev => prev + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      setDisplayedLines(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], done: true };
        return updated;
      });
      const pauseAfter = line.status === "success" ? 350 : line.status === "warn" ? 450 : 150;
      const t = setTimeout(() => {
        setCurrentLineIdx(prev => prev + 1);
        setCurrentCharIdx(0);
      }, pauseAfter);
      return () => clearTimeout(t);
    }
  }, [bootStarted, currentLineIdx, currentCharIdx]);

  const isComplete = currentLineIdx >= BOOT_SEQUENCE.length;

  return (
    <div className={styles.telemetryContainer}>
      <div className={styles.terminalGlow} />
      
      <div className={styles.terminalHeader}>
        <div className={styles.terminalDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <div className={styles.terminalTitle}>nuuvixx-telem-server</div>
        <div className={styles.terminalStatus}>
          <span className={styles.statusDot} /> LIVE
        </div>
      </div>

      {/* ===== "N" INTRO ANIMATION INSIDE TERMINAL ===== */}
      <AnimatePresence>
        {showNIntro && (
          <motion.div
            className={styles.terminalNOverlay}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Glow behind N */}
            <motion.div
              className={styles.terminalNGlow}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={nPhase >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
            />

            {/* The big N */}
            <motion.div
              className={styles.terminalNLetter}
              initial={{ opacity: 0, scale: 4, filter: "blur(20px)" }}
              animate={
                nPhase >= 3
                  ? { opacity: 0, scale: 0.5, filter: "blur(10px)" }
                  : nPhase >= 2
                  ? { opacity: 1, scale: 1, filter: "blur(0px)", textShadow: "0 0 60px rgba(255,107,44,0.8), 0 0 120px rgba(255,107,44,0.4)" }
                  : nPhase >= 1
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : {}
              }
              transition={{
                duration: nPhase >= 3 ? 0.5 : 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              N
            </motion.div>

            {/* Scan line inside terminal */}
            {nPhase >= 1 && nPhase < 3 && (
              <motion.div
                className={styles.terminalNScan}
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.8, ease: "linear" }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== TERMINAL BOOT SEQUENCE ===== */}
      <div className={styles.terminalBody} style={{ opacity: showNIntro ? 0 : 1, transition: "opacity 0.3s" }}>
        {displayedLines.map((line, i) => {
          if (line.text === "" && line.done) {
            return <div key={i} style={{ height: "8px" }} />;
          }

          const isLastLine = i === displayedLines.length - 1;
          const showCursor = isLastLine && !line.done;
          const isSuccess = line.status === "success";
          const isWarn = line.status === "warn";
          const isProgress = line.status === "progress";

          return (
            <div
              key={i}
              className={`${styles.terminalLine} ${isSuccess ? styles.lineSuccess : ""} ${isWarn ? styles.lineWarn : ""} ${isProgress ? styles.lineProgress : ""}`}
            >
              {!isProgress && (
                <span className={styles.terminalTimestamp} suppressHydrationWarning>
                  [{timeStr}]
                </span>
              )}
              <span>
                {line.text}
                {showCursor && <span className={styles.inlineCursor}>▌</span>}
                {isLastLine && line.done && isComplete && (
                  <span className={styles.typingEffect} />
                )}
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.terminalScanLine} />
      <div className={styles.telemetryOverlay} />
    </div>
  );
}
