"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlass, Sparkle, ArrowRight, X } from "@phosphor-icons/react";
import styles from "./command-palette.module.css";

const MOCK_AI_RESPONSE = "Nuuvixx is an AI engineering organization with two core pillars: Nuuvixx Labs (engineering open-source infrastructure: AgentVerse, AgentStore, and BugPulse) and Nuuvixx Studio (commercial engineering divisions: Commerce Rescue, Nuuvixx Secure, Nuuvixx Creative, Trade Intelligence, and Bid Intelligence). How can we assist your business?";

const QUICK_ACTIONS = [
  { label: "Nuuvixx Studio — Commercial Overview", href: "/studio", category: "Commercial" },
  { label: "Commerce Rescue — Google Merchant Feeds", href: "/studio/commerce", category: "Commercial" },
  { label: "Nuuvixx Secure — AI Code & RLS Security", href: "/studio/secure", category: "Commercial" },
  { label: "Nuuvixx Creative — Commercial Video Ads", href: "/studio/creative", category: "Commercial" },
  { label: "Trade Intelligence — Document Reconciliation", href: "/studio/trade", category: "Commercial" },
  { label: "Bid Intelligence — Tender Requirement Briefs", href: "/studio/bids", category: "Commercial" },
  { label: "Proof of Work & Interactive Sandboxes", href: "/studio/work", category: "Verification" },
  { label: "Nuuvixx Labs — Open Source & Research", href: "/labs", category: "Labs" },
  { label: "Ecosystem Products (AgentVerse / Store / Pulse)", href: "/projects", category: "Labs" },
  { label: "Commercial Project Intake", href: "/studio/contact", category: "Commercial" },
  { label: "Company Manifesto", href: "/manifesto", category: "Company" },
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"search" | "ai">("search");
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  const closePalette = () => {
    setOpen(false);
    setIsStreaming(false);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((curr) => {
          if (!curr) {
            setTimeout(() => inputRef.current?.focus(), 20);
          }
          return !curr;
        });
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleNavigate = (href: string) => {
    closePalette();
    router.push(href);
  };

  const handleAskAI = () => {
    if (!query.trim()) return;
    setMode("ai");
    setAiResponse("");
    setIsStreaming(true);
    
    // Character streaming simulation
    let i = 0;
    const interval = setInterval(() => {
      setAiResponse(prev => prev + MOCK_AI_RESPONSE.charAt(i));
      i++;
      if (i >= MOCK_AI_RESPONSE.length) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 18);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && mode === "search") {
      handleAskAI();
    }
  };

  const filteredLinks = query.trim()
    ? QUICK_ACTIONS.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : QUICK_ACTIONS;

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePalette}
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
                  <MagnifyingGlass size={16} /> Search &amp; Navigate
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
              <button className={styles.closeBtn} onClick={closePalette}>
                <X size={16} />
              </button>
            </div>

            <div className={styles.inputWrapper}>
              {mode === "search" ? <MagnifyingGlass size={20} className={styles.inputIcon} /> : <Sparkle size={20} className={styles.inputIcon} color="var(--color-volt)" />}
              <input 
                ref={inputRef}
                type="text" 
                className={styles.input}
                placeholder={mode === "search" ? "Search commercial divisions, tools, Labs..." : "Ask Nuuvixx AI about products or commercial audits..."}
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
                    <div className={styles.groupLabel}>Quick Destinations ({filteredLinks.length})</div>
                    {filteredLinks.map((item) => (
                      <button
                        key={item.href}
                        className={styles.resultItem}
                        onClick={() => handleNavigate(item.href)}
                      >
                        <span style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                          <span>{item.label}</span>
                          <span style={{ fontSize: "11px", opacity: 0.5, textTransform: "uppercase" }}>{item.category}</span>
                        </span>
                      </button>
                    ))}
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
                      <p>Ask anything about Nuuvixx Studio commercial offerings or Labs infrastructure.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className={styles.footer}>
              <span className={styles.shortcut}>ESC to close · ⌘K toggle</span>
              <span className={styles.shortcut}>
                {mode === "search" ? "ENTER to Ask AI" : "Nuuvixx AI"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
