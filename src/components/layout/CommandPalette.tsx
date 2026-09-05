"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlass, Sparkle, ArrowRight, X } from "@phosphor-icons/react";
import styles from "./command-palette.module.css";

const MOCK_AI_RESPONSE = "Nuuvixx is an open-source AI engineering organization. We build production-grade AI infrastructure across three primary platforms: AgentVerse (agent OS & runtime), AgentStore (verified agent marketplace), and BugPulse (real-time telemetry & bug triage). How else can I assist you?";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"search" | "ai">("search");
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
      setQuery("");
      setAiResponse("");
      setMode("search");
      setIsStreaming(false);
    }
  }, [open]);

  const handleAskAI = () => {
    if (!query.trim()) return;
    setMode("ai");
    setAiResponse("");
    setIsStreaming(true);
    
    // Mock streaming
    let i = 0;
    const interval = setInterval(() => {
      setAiResponse(prev => prev + MOCK_AI_RESPONSE.charAt(i));
      i++;
      if (i >= MOCK_AI_RESPONSE.length) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 20); // 20ms per character
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && mode === "search") {
      handleAskAI();
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div 
            className={styles.palette}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <div className={styles.modeTabs}>
                <button 
                  className={mode === "search" ? styles.tabActive : styles.tab}
                  onClick={() => setMode("search")}
                >
                  <MagnifyingGlass size={16} /> Search
                </button>
                <button 
                  className={mode === "ai" ? styles.tabActive : styles.tab}
                  onClick={() => {
                    setMode("ai");
                    setAiResponse("");
                  }}
                >
                  <Sparkle size={16} weight={mode === "ai" ? "fill" : "regular"} /> Ask AI
                </button>
              </div>
              <button className={styles.closeBtn} onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div className={styles.inputWrapper}>
              {mode === "search" ? <MagnifyingGlass size={20} className={styles.inputIcon} /> : <Sparkle size={20} className={styles.inputIcon} color="var(--color-volt)" />}
              <input 
                ref={inputRef}
                type="text" 
                className={styles.input}
                placeholder={mode === "search" ? "Search documentation, projects..." : "Ask Nuuvixx AI about the codebase..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {mode === "search" && query && (
                <button className={styles.askAiBtn} onClick={handleAskAI}>
                  Ask AI <ArrowRight size={14} />
                </button>
              )}
            </div>

            <div className={styles.content}>
              {mode === "search" && (
                <div className={styles.results}>
                  <div className={styles.resultGroup}>
                    <div className={styles.groupLabel}>Quick Links</div>
                    <button className={styles.resultItem}>Read the Manifesto</button>
                    <button className={styles.resultItem}>View all Projects</button>
                    <button className={styles.resultItem}>GitHub Repository</button>
                  </div>
                </div>
              )}

              {mode === "ai" && (
                <div className={styles.aiContent}>
                  {aiResponse ? (
                    <div className={styles.aiResponse}>
                      {aiResponse}
                      {isStreaming && <span className={styles.cursor}></span>}
                    </div>
                  ) : (
                    <div className={styles.aiPlaceholder}>
                      <Sparkle size={24} weight="duotone" color="var(--color-volt)" />
                      <p>Ask anything about Nuuvixx&apos;s architecture, projects, or vision.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className={styles.footer}>
              <span className={styles.shortcut}>ESC to close</span>
              <span className={styles.shortcut}>
                {mode === "search" ? "ENTER to Ask AI" : "Nuuvixx AI (Mock)"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
