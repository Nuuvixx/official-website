import { Metadata } from "next";
import styles from "./roadmap.module.css";
import { CheckCircle, CircleDashed, CircleHalf } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Roadmap | Nuuvixx",
  description: "The strategic roadmap for Nuuvixx AI infrastructure.",
};

const phases = [
  {
    id: "phase-1",
    title: "Phase 1: Foundation",
    status: "completed",
    date: "Q1 2026",
    description: "Establishing the core open-source infrastructure and basic orchestration capabilities.",
    items: [
      { name: "Initial commit of agentchaos", status: "completed" },
      { name: "BugPulse alpha release", status: "completed" },
      { name: "ContextForge memory abstraction", status: "completed" },
    ]
  },
  {
    id: "phase-2",
    title: "Phase 2: Scale & Reliability",
    status: "in-progress",
    date: "Q2 - Q3 2026",
    description: "Making the infrastructure production-grade for enterprise AI teams.",
    items: [
      { name: "AgentGovern compliance modules", status: "in-progress" },
      { name: "BugPulse CI/CD integration", status: "completed" },
      { name: "DriveZen persistent state sync", status: "in-progress" },
      { name: "Synapse pub/sub architecture", status: "pending" },
    ]
  },
  {
    id: "phase-3",
    title: "Phase 3: The Sentient Layer",
    status: "pending",
    date: "Q4 2026 - Q1 2027",
    description: "Moving from orchestration to true autonomous, long-running agent ecosystems.",
    items: [
      { name: "Self-healing swarm networks", status: "pending" },
      { name: "Cross-platform context sharing", status: "pending" },
      { name: "Nuuvixx Cloud managed offering", status: "pending" },
    ]
  }
];

export default function RoadmapPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Roadmap</h1>
        <p className={styles.subtitle}>
          We build in public. Here is the strategic direction for Nuuvixx and our core open-source projects.
        </p>
      </header>

      <div className={styles.timeline}>
        {phases.map((phase) => (
          <div key={phase.id} className={`${styles.phase} ${styles[phase.status]}`}>
            <div className={styles.phaseIndicator}>
              <div className={styles.line}></div>
              <div className={styles.dot}>
                {phase.status === "completed" && <CheckCircle weight="fill" color="var(--color-volt)" size={24} />}
                {phase.status === "in-progress" && <CircleHalf weight="fill" color="var(--color-volt)" size={24} />}
                {phase.status === "pending" && <CircleDashed color="var(--color-text-tertiary)" size={24} />}
              </div>
            </div>
            <div className={styles.phaseContent}>
              <div className={styles.phaseHeader}>
                <h2 className={styles.phaseTitle}>{phase.title}</h2>
                <span className={styles.phaseDate}>{phase.date}</span>
              </div>
              <p className={styles.phaseDescription}>{phase.description}</p>
              
              <ul className={styles.itemList}>
                {phase.items.map((item, i) => (
                  <li key={i} className={styles.item}>
                    {item.status === "completed" && <CheckCircle weight="fill" color="var(--color-volt)" size={16} />}
                    {item.status === "in-progress" && <CircleHalf weight="fill" color="var(--color-volt)" size={16} />}
                    {item.status === "pending" && <CircleDashed color="var(--color-text-tertiary)" size={16} />}
                    <span className={styles[`item_${item.status}`]}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
