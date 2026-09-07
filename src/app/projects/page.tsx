import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products & Ecosystem — Nuuvixx",
  description: "Explore the AgentVerse ecosystem: AgentVerse Console, AgentStore Verified Marketplace, and BugPulse Real-Time Telemetry.",
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
    highlights: ["Visual Agent Graph & Canvas", "Cloud & Local LLM Integration", "Execution Console & Real-time Logs", "MCP Server Protocol Support"],
  },
  {
    id: "agentstore",
    name: "AgentStore",
    tagline: "Verified Autonomous AI Agent Marketplace",
    description: "Discover, audit, and install verified enterprise autonomous AI agent manifests and MCP tools with MicroVM sandboxing and real-time cryptographic trust scores.",
    url: "https://agentstore.nuuvixx.com",
    badge: "MARKETPLACE",
    accentColor: "#E5252A",
    highlights: ["4,280+ Verified Agent Manifests", "OWASP ASI-01 Security Audits", "Hardware MicroVM Sandboxing", "1-Click AgentVerse Install"],
  },
  {
    id: "bugpulse",
    name: "BugPulse",
    tagline: "AI-Powered Bug Management & Telemetry",
    description: "Real-time observability and crash triage engine that turns raw agent execution logs, Slack/Email reports, and exception traces into structured GitHub issues automatically.",
    url: "https://bugpulse.nuuvixx.com",
    badge: "OBSERVABILITY",
    accentColor: "#FF6B47",
    highlights: ["Real-Time Execution Tracing", "Automated Issue Triage & Assignment", "Slack / Email / Webhook Ingestion", "GitHub Issue Sync"],
  },
  {
    id: "careeros",
    name: "CareerOS",
    tagline: "The Open-Source, AI-Powered Career Operating System",
    description: "Manage your engineering career pipeline like a high-velocity sales funnel with AI ATS keyword scoring, gap analysis, automated networking outreach, and interview prep bots.",
    url: "https://github.com/ritinpaul/CareerOS",
    badge: "CAREER AGENTS",
    accentColor: "#38bdf8",
    highlights: ["AI ATS Resume Matcher & Scorer", "Automated Cold Email & Outreach Gen", "AI Mock Interviewer & Feedback", "pgvector Semantic Career Vault"],
  },
];

export default function ProjectsPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "100px 24px 120px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Page Header */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <span style={{ 
          fontFamily: "var(--font-geist-mono), monospace", 
          fontSize: "0.8rem", 
          fontWeight: 700, 
          letterSpacing: "0.15em", 
          color: "var(--color-volt)", 
          textTransform: "uppercase", 
          marginBottom: "12px", 
          display: "block" 
        }}>
          // E C O S Y S T E M
        </span>
        <h1 style={{ 
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif", 
          fontSize: "clamp(2.2rem, 5vw, 3.8rem)", 
          fontWeight: 800, 
          color: "#FFFFFF", 
          letterSpacing: "-0.02em", 
          marginBottom: "16px" 
        }}>
          The Nuuvixx <span style={{ color: "var(--color-volt)" }}>Product Suite</span>
        </h1>
        <p style={{ 
          color: "rgba(255, 255, 255, 0.65)", 
          fontSize: "1.15rem", 
          maxWidth: "680px", 
          margin: "0 auto", 
          lineHeight: 1.6, 
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif" 
        }}>
          Three dedicated platforms working in unison to build, audit, deploy, and monitor autonomous AI agent infrastructure.
        </p>
      </div>

      {/* Product Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
        {products.map((item) => (
          <div key={item.id} style={{
            background: "rgba(10, 10, 14, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            padding: "36px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Top Glow Accent Line */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${item.accentColor}, transparent)`,
            }} />

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: item.accentColor,
                  background: `rgba(255, 255, 255, 0.04)`,
                  border: `1px solid ${item.accentColor}40`,
                  padding: "4px 12px",
                  borderRadius: "100px",
                  letterSpacing: "0.08em",
                }}>
                  {item.badge}
                </span>
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-geist-mono), monospace" }}>
                  STATUS: LIVE ✓
                </span>
              </div>

              <h2 style={{ 
                fontSize: "1.85rem", 
                fontWeight: 800, 
                color: "#FFFFFF", 
                marginBottom: "8px", 
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif" 
              }}>
                {item.name}
              </h2>
              <p style={{ 
                color: item.accentColor, 
                fontSize: "0.92rem", 
                fontWeight: 600, 
                marginBottom: "16px", 
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif" 
              }}>
                {item.tagline}
              </p>
              <p style={{ 
                color: "rgba(255, 255, 255, 0.6)", 
                fontSize: "0.95rem", 
                lineHeight: 1.6, 
                marginBottom: "28px", 
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif" 
              }}>
                {item.description}
              </p>

              {/* Key Features List */}
              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "20px", marginBottom: "32px" }}>
                <span style={{ 
                  fontSize: "0.75rem", 
                  fontFamily: "var(--font-geist-mono), monospace", 
                  color: "rgba(255,255,255,0.4)", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.1em", 
                  display: "block", 
                  marginBottom: "12px" 
                }}>
                  Core Capabilities
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {item.highlights.map((h, i) => (
                    <li key={i} style={{ 
                      fontSize: "0.88rem", 
                      color: "rgba(255,255,255,0.75)", 
                      marginBottom: "8px", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "8px", 
                      fontFamily: "var(--font-geist-mono), monospace" 
                    }}>
                      <span style={{ color: item.accentColor, fontWeight: "bold" }}>›</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Launch Button */}
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "14px 20px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${item.accentColor} 0%, rgba(0,0,0,0.8) 150%)`,
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                letterSpacing: "0.02em",
                boxShadow: `0 4px 20px ${item.accentColor}30`,
                transition: "all 0.3s ease",
              }}
            >
              <span>LAUNCH {item.name.toUpperCase()}</span>
              <span>↗</span>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
