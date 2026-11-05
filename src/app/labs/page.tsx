import { Metadata } from "next";
import styles from "./labs.module.css";
import Link from "next/link";
import { Cpu, Storefront, Bug, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Nuuvixx Labs — Research, Open-Source & Agentic Runtimes",
  description: "The open-source engineering ecosystem of Nuuvixx: AgentVerse console, AgentStore registry, BugPulse telemetry, and experimental WebGL interfaces.",
};

const corePlatforms = [
  {
    name: "AgentVerse",
    badge: "AGENT OS & CONSOLE",
    description: "Enterprise operating system for autonomous agents. Visual workflow graph, deterministic runtime, execution sandbox, and MCP protocol integration.",
    href: "https://agentverse.nuuvixx.com",
    color: "#FF6B2C",
    icon: Cpu,
  },
  {
    name: "AgentStore",
    badge: "VERIFIED REGISTRY",
    description: "Discover, audit, and install verified autonomous agent manifests and tools with MicroVM sandboxing and cryptographic verification scores.",
    href: "https://agentstore.nuuvixx.com",
    color: "#E5252A",
    icon: Storefront,
  },
  {
    name: "BugPulse",
    badge: "TELEMETRY & OBSERVABILITY",
    description: "Real-time observability and crash triage engine turning agent execution telemetry, logs, and exception pulses into actionable GitHub issues.",
    href: "https://bugpulse.nuuvixx.com",
    color: "#FF6B47",
    icon: Bug,
  },
];

export default function LabsPage() {
  return (
    <div className={styles.container}>
      {/* Studio Banner */}
      <div style={{
        background: "rgba(255, 107, 44, 0.05)",
        border: "1px solid rgba(255, 107, 44, 0.2)",
        borderRadius: "12px",
        padding: "16px 24px",
        marginBottom: "32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <div style={{ fontSize: "0.88rem", color: "var(--color-text-primary)" }}>
          Looking for commercial services and fixed-scope audits (Commerce Rescue, Nuuvixx Secure, etc.)?
        </div>
        <Link
          href="/studio"
          style={{
            fontSize: "0.85rem",
            color: "var(--color-volt)",
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          Visit Nuuvixx Studio →
        </Link>
      </div>

      <header className={styles.header}>
        <div className={styles.badge}>Research &amp; Open Source</div>
        <h1 className={styles.title}>Nuuvixx Labs</h1>
        <p className={styles.subtitle}>
          The substrate beneath the machines that think. Open-source runtimes, agent governance protocols, and interactive generative systems.
        </p>
      </header>

      {/* Core Open Source Platforms */}
      <section style={{ marginBottom: "64px" }}>
        <h2 style={{ fontSize: "1.6rem", color: "#ffffff", fontWeight: 700, marginBottom: "20px" }}>
          Core Ecosystem Platforms
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {corePlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "rgba(10, 10, 14, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "16px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "11px",
                      color: platform.color,
                      background: "rgba(255, 255, 255, 0.04)",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontWeight: 700,
                    }}>
                      {platform.badge}
                    </span>
                    <Icon size={24} weight="fill" style={{ color: platform.color }} />
                  </div>
                  <h3 style={{ fontSize: "1.4rem", color: "#ffffff", fontWeight: 700, marginBottom: "8px" }}>
                    {platform.name}
                  </h3>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "20px" }}>
                    {platform.description}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: platform.color, fontSize: "0.85rem", fontWeight: 600 }}>
                  <span>Launch Platform</span>
                  <ArrowRight size={14} weight="bold" />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Experimental Prototypes */}
      <h2 style={{ fontSize: "1.6rem", color: "#ffffff", fontWeight: 700, marginBottom: "20px" }}>
        Experimental Prototypes
      </h2>
      <div className={styles.grid}>
        {/* Experiment 1 */}
        <div className={styles.experimentCard}>
          <div className={styles.visualizer}>
            <div className={styles.chaosMock}>
              <div className={styles.node} style={{top: '20%', left: '30%', animationDelay: '0s'}}></div>
              <div className={styles.node} style={{top: '60%', left: '70%', animationDelay: '0.5s'}}></div>
              <div className={styles.node} style={{top: '40%', left: '50%', animationDelay: '1s'}}></div>
              <div className={styles.node} style={{top: '80%', left: '20%', animationDelay: '1.5s'}}></div>
              <div className={styles.connection} style={{top: '30%', left: '40%', width: '100px', transform: 'rotate(45deg)'}}></div>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.meta}>
              <span className={styles.tag}>WebGL</span>
              <span className={styles.date}>July 2026</span>
            </div>
            <h3 className={styles.experimentTitle}>agentchaos: Entropy Visualizer</h3>
            <p className={styles.experimentDesc}>
              A real-time representation of multi-agent swarm state. When agents hallucinate or diverge, the entropy visualizer distorts to reflect system instability.
            </p>
            <a href="https://github.com/Nuuvixx/agentchaos" target="_blank" rel="noopener noreferrer" className={styles.launchBtn}>
              Inspect Repository
            </a>
          </div>
        </div>

        {/* Experiment 2 */}
        <div className={styles.experimentCard}>
          <div className={styles.visualizer}>
            <div className={styles.codeMock}>
              <code>{`function optimize(state) {`}</code>
              <code>{`  if (state.entropy > MAX) {`}</code>
              <code className={styles.highlight}>{`    collapse(state);`}</code>
              <code>{`  }`}</code>
              <code>{`}`}</code>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.meta}>
              <span className={styles.tag}>AST Parsing</span>
              <span className={styles.date}>June 2026</span>
            </div>
            <h3 className={styles.experimentTitle}>Codebase Constellation</h3>
            <p className={styles.experimentDesc}>
              Mapping 100,000 lines of code into a navigable 3D galaxy using AST analysis to determine gravitational pull between related modules.
            </p>
            <a href="https://github.com/Nuuvixx" target="_blank" rel="noopener noreferrer" className={styles.launchBtn}>
              Inspect Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
