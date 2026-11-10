import React from "react";
import Link from "next/link";
import { ArrowUpRight, Blocks, Compass, Activity, ExternalLink } from "lucide-react";
import styles from "./labs-showcase.module.css";

const labProjects = [
  {
    id: "agentverse",
    title: "AgentVerse",
    category: "AGENT ORCHESTRATION CONSOLE",
    description:
      "A visual graph canvas and execution engine for composing, running, and observing autonomous AI agents with native Model Context Protocol (MCP) server integration.",
    href: "https://agentverse.nuuvixx.com",
    isExternal: true,
    icon: Blocks,
    badge: "CORE ENGINE",
  },
  {
    id: "agentstore",
    title: "AgentStore",
    category: "VERIFIED MANIFEST MARKETPLACE",
    description:
      "A decentralized registry and sandbox for discovering, auditing, and installing verified agent manifests, capability tools, and security specifications.",
    href: "https://agentstore.nuuvixx.com",
    isExternal: true,
    icon: Compass,
    badge: "REGISTRY & TOOLS",
  },
  {
    id: "bugpulse",
    title: "BugPulse",
    category: "REAL-TIME AGENT TELEMETRY",
    description:
      "Runtime telemetry and crash triage engine that captures agent execution traces, unhandled exceptions, and tool failures into structured GitHub issues.",
    href: "https://bugpulse.nuuvixx.com",
    isExternal: true,
    icon: Activity,
    badge: "OBSERVABILITY",
  },
];

export default function LabsShowcase() {
  return (
    <section className={styles.section} aria-label="Nuuvixx Labs Open Source Engineering">
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <div className={styles.kicker}>
              <span className={styles.kickerNum}>{"// 03"}</span>
              <span>NUUVIXX LABS · RESEARCH &amp; OPEN SOURCE</span>
            </div>
            <h2 className={styles.title}>Built in the open.</h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.subtitle}>
              Independent open-source infrastructure and protocol tools developed to govern and observe autonomous systems.
            </p>
            <Link href="/labs" className={styles.exploreLabsLink}>
              <span>Explore Nuuvixx Labs</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </header>

        <div className={styles.grid}>
          {labProjects.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconBox}>
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <span className={styles.badge}>{item.badge}</span>
                </div>

                <div className={styles.cardBody}>
                  <span className={styles.category}>{item.category}</span>
                  <h3 className={styles.projectTitle}>
                    <span>{item.title}</span>
                    <ExternalLink size={16} className={styles.extIcon} />
                  </h3>
                  <p className={styles.description}>{item.description}</p>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.launchText}>Launch Platform</span>
                  <ArrowUpRight size={16} className={styles.footerArrow} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

