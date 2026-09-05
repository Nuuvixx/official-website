import styles from "./open-source.module.css";
import { GithubLogo, Star, GitFork, BookOpenText } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Open Source — Nuuvixx",
  description: "Built in the open. By design.",
};

const repos = [
  { name: "AgentVerse-OS", description: "Core enterprise console and operating system for autonomous agents", language: "TypeScript" },
  { name: "AgentStore-Registry", description: "Verified agent package registry and manifest audit toolchain", language: "TypeScript" },
  { name: "BugPulse-CLI", description: "Command-line interface for real-time agent telemetry", language: "TypeScript" },
  { name: "BugPulse-mcp", description: "Model Context Protocol integration for BugPulse", language: "TypeScript" },
  { name: "agentchaos", description: "Chaos engineering framework for AI agent swarms", language: "Python" },
];

export default function OpenSourcePage() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Built in the open.<br/>By design.</h1>
        <p className={styles.subtitle}>
          We believe that if AI is to become the new operating system for humanity, its core components must be robust, observable, and open source.
        </p>
      </header>
      
      <section className={styles.reposSection}>
        <h2 className={styles.sectionTitle}>The Nuuvixx Ecosystem</h2>
        <div className={styles.repoGrid}>
          {repos.map((repo) => (
            <a key={repo.name} href={`https://github.com/Nuuvixx/${repo.name}`} target="_blank" rel="noopener noreferrer" className={styles.repoCard}>
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
              </div>
            </a>
          ))}
        </div>
      </section>
      
      <section className={styles.ctaSection}>
        <GithubLogo size={48} weight="fill" className={styles.ctaIcon} />
        <h2 className={styles.ctaTitle}>Become a Contributor</h2>
        <p className={styles.ctaDesc}>
          Join the community of engineers building the foundation of autonomous systems.
        </p>
        <a href="https://github.com/Nuuvixx" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
          View Organization on GitHub
        </a>
      </section>
    </main>
  );
}
