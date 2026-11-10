import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Blocks, Bug, Network } from "lucide-react";
import styles from "./labs.module.css";

export const metadata: Metadata = {
  title: "Nuuvixx Labs — Public engineering projects",
  description: "Explore the public interfaces and repositories for AgentVerse, AgentStore, BugPulse and the AgentChaos research framework.",
};

const projects = [
  {
    name: "AgentVerse", icon: Network, category: "Agent workflows",
    description: "An agent workflow and console project with a public interface preview.",
    links: [{ label: "Visit public interface", href: "https://agentverse.nuuvixx.com" }],
  },
  {
    name: "AgentStore", icon: Blocks, category: "Agent catalog",
    description: "A public catalog interface for exploring agent manifests.",
    links: [{ label: "Visit public catalog", href: "https://agentstore.nuuvixx.com" }],
  },
  {
    name: "BugPulse", icon: Bug, category: "Developer tools",
    description: "Public CLI and MCP integration repositories for a bug triage workflow.",
    links: [
      { label: "CLI repository", href: "https://github.com/Nuuvixx/BugPulse-CLI" },
      { label: "MCP repository", href: "https://github.com/Nuuvixx/BugPulse-mcp" },
    ],
  },
];

export default function LabsPage() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Nuuvixx Labs</span>
        <h1>Engineering work <em>in the open.</em></h1>
        <p>Public interfaces, repositories and experiments from Nuuvixx. Explore the source or current preview to see what exists today.</p>
        <Link href="/studio" className={styles.studioLink}>Looking for commercial services? Visit Studio <ArrowUpRight size={17} /></Link>
      </header>

      <section className={styles.projectList} aria-label="Labs projects">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <article key={project.name} className={styles.project}>
              <div className={styles.projectBody}>
                <div className={styles.projectHeading}><Icon size={30} strokeWidth={1.5} aria-hidden="true" /><span>{project.category}</span></div>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <div className={styles.links}>
                  {project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <ArrowUpRight size={16} /></a>)}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className={styles.research}>
        <div><span className={styles.eyebrow}>Research repository</span><h2>AgentChaos</h2></div>
        <div><p>A public fault-injection and benchmark framework for studying autonomous agent failure and checkpointing.</p><a href="https://github.com/Nuuvixx/agentchaos" target="_blank" rel="noopener noreferrer">Inspect repository <ArrowUpRight size={16} /></a></div>
      </section>

      <section className={styles.contact}>
        <div><span className={styles.eyebrow}>Applied engineering</span><h2>Need help with a specific system?</h2></div>
        <Link href="/studio#services">Explore Studio services <ArrowUpRight size={17} /></Link>
      </section>
    </main>
  );
}
