import type { Metadata } from "next";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Products & Ecosystem — Nuuvixx",
  description: "Explore the AgentVerse ecosystem: AgentVerse Console, AgentStore Verified Marketplace, BugPulse Real-Time Telemetry, and CareerOS.",
};

const products = [
  {
    id: "agentverse",
    name: "AgentVerse",
    tagline: "The Operating System for the Agentic Economy",
    description: "Enterprise console for building, running, governing, and monetizing autonomous AI agents at scale with visual graph canvas, execution console, and MCP tool integration.",
    url: "https://agentverse.nuuvixx.com",
    badge: "CORE ENGINE",
    accentColor: "#FF6B2C",
    accentGlow: "rgba(255, 107, 44, 0.25)",
    highlights: ["Visual Agent Graph & Canvas", "Cloud & Local LLM Integration", "Execution Console & Real-time Logs", "MCP Server Protocol Support"],
  },
  {
    id: "agentstore",
    name: "AgentStore",
    tagline: "Verified Autonomous AI Agent Marketplace",
    description: "Discover, audit, and install verified enterprise autonomous AI agent manifests and MCP tools with MicroVM sandboxing and real-time cryptographic trust scores.",
    url: "https://agentstore.nuuvixx.com",
    badge: "MARKETPLACE",
    accentColor: "#FF6B2C",
    accentGlow: "rgba(255, 107, 44, 0.25)",
    highlights: ["4,280+ Verified Agent Manifests", "OWASP ASI-01 Security Audits", "Hardware MicroVM Sandboxing", "1-Click AgentVerse Install"],
  },
  {
    id: "bugpulse",
    name: "BugPulse",
    tagline: "AI-Powered Bug Management & Telemetry",
    description: "Real-time observability and crash triage engine that turns raw agent execution logs, Slack/Email reports, and exception traces into structured GitHub issues automatically.",
    url: "https://bugpulse.nuuvixx.com",
    badge: "OBSERVABILITY",
    accentColor: "#FF6B2C",
    accentGlow: "rgba(255, 107, 44, 0.25)",
    highlights: ["Real-Time Execution Tracing", "Automated Issue Triage & Assignment", "Slack / Email / Webhook Ingestion", "GitHub Issue Sync"],
  },
  {
    id: "careeros",
    name: "CareerOS",
    tagline: "The Open-Source, AI-Powered Career Operating System",
    description: "Manage your engineering career pipeline like a high-velocity sales funnel with AI ATS keyword scoring, gap analysis, automated networking outreach, and interview prep bots.",
    url: "https://github.com/ritinpaul/CareerOS",
    badge: "CAREER AGENTS",
    accentColor: "#FF6B2C",
    accentGlow: "rgba(255, 107, 44, 0.25)",
    highlights: ["AI ATS Resume Matcher & Scorer", "Automated Cold Email & Outreach Gen", "AI Mock Interviewer & Feedback", "pgvector Semantic Career Vault"],
  },
];

export default function ProjectsPage() {
  return (
    <main className={styles.main}>

      <div className={styles.content}>
        {/* Page Header - Left-aligned for site-wide consistency */}
        <header className={styles.hero}>
          <h1 className={styles.title}>
            The Nuuvixx <span className={styles.highlight}>Product Suite</span>
          </h1>
          <p className={styles.subtitle}>
            Four dedicated platforms working in unison to build, audit, deploy, and monitor autonomous AI agent infrastructure.
          </p>
        </header>

        {/* Glassmorphic Product Grid */}
        <div className={styles.grid}>
          {products.map((item) => (
            <div
              key={item.id}
              className={styles.glassCard}
              style={{
                "--card-accent": item.accentColor,
                "--accent-glow": item.accentGlow,
              } as React.CSSProperties}
            >
              {/* Corner Ambient Glass Glow */}
              <div className={styles.cardReflection} />

              <div className={styles.cardInner}>
                <div>
                  <div className={styles.cardHeader}>
                    <span
                      className={styles.badge}
                      style={{
                        color: item.accentColor,
                        borderColor: `${item.accentColor}40`,
                      }}
                    >
                      {item.badge}
                    </span>
                    <span className={styles.status}>
                      STATUS: LIVE ✓
                    </span>
                  </div>

                  <h2 className={styles.productName}>
                    {item.name}
                  </h2>
                  <p
                    className={styles.tagline}
                    style={{ color: item.accentColor }}
                  >
                    {item.tagline}
                  </p>
                  <p className={styles.description}>
                    {item.description}
                  </p>

                  {/* Core Capabilities */}
                  <div className={styles.featuresSection}>
                    <span className={styles.featuresTitle}>
                      Core Capabilities
                    </span>
                    <ul className={styles.featuresList}>
                      {item.highlights.map((h, i) => (
                        <li key={i} className={styles.featureItem}>
                          <span style={{ color: item.accentColor, fontWeight: 700 }}>›</span> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Launch Glass Button */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.launchBtn}
                >
                  <span>LAUNCH {item.name.toUpperCase()}</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
