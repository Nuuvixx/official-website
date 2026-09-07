import styles from "./open-source.module.css";
import { GithubLogo, BookOpenText } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Open Source — Nuuvixx",
  description: "Built in the open. By design.",
};

const repos = [
  { name: "agentchaos", description: "Chaos engineering and resilience testing framework for multi-agent swarms", language: "Python", url: "https://github.com/Nuuvixx/agentchaos" },
  { name: "BugPulse-CLI", description: "Command-line interface and daemon for real-time agent telemetry and logging", language: "TypeScript", url: "https://github.com/Nuuvixx/BugPulse-CLI" },
  { name: "BugPulse-mcp", description: "Model Context Protocol integration server connecting LLMs to BugPulse triage", language: "TypeScript", url: "https://github.com/Nuuvixx/BugPulse-mcp" },
  { name: "Synapse", description: "High-throughput neural message bus and event broker for distributed agent clusters", language: "TypeScript", url: "https://github.com/Nuuvixx/Synapse" },
  { name: "DriveZen", description: "Decentralized autonomous state driver and persistent sandbox filesystem", language: "TypeScript", url: "https://github.com/Nuuvixx/DriveZen" },
];

export default function OpenSourcePage() {
  return (
    <main className={styles.main}>

      <div className={styles.content}>
        <header className={styles.hero}>
          <h1 className={styles.title}>
            Built in the open.<br />By design.
          </h1>
          <p className={styles.subtitle}>
            We believe that if AI is to become the new operating system for humanity, its core components must be robust, observable, and open source.
          </p>
        </header>
        
        <section className={styles.reposSection}>
          <h2 className={styles.sectionTitle}>The Nuuvixx Ecosystem Repositories</h2>
          <div className={styles.repoGrid}>
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoCard}
              >
                <div className={styles.repoHeader}>
                  <BookOpenText size={24} weight="duotone" className={styles.repoIcon} />
                  <h3 className={styles.repoName}>{repo.name}</h3>
                </div>
                <p className={styles.repoDesc}>{repo.description}</p>
                <div className={styles.repoFooter}>
                  <span className={styles.repoLang}>
                    <span className={styles.langDot} data-lang={repo.language}></span>
                    {repo.language}
                  </span>
                  <span style={{ marginLeft: "auto", color: "var(--color-volt)", fontWeight: 600 }}>
                    View Repository ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
        
        <section className={styles.ctaSection}>
          <GithubLogo size={48} weight="fill" className={styles.ctaIcon} />
          <h2 className={styles.ctaTitle}>Become a Contributor</h2>
          <p className={styles.ctaDesc}>
            Join the global community of engineers building the foundation of autonomous systems.
          </p>
          <a
            href="https://github.com/Nuuvixx"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            View Organization on GitHub
          </a>
        </section>
      </div>
    </main>
  );
}
