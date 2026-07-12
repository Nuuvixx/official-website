import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glowLine}></div>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            NUUVIXX <span className={styles.logoDot}></span>
          </div>
          <p className={styles.tagline}>Infrastructure for the machines that think. Open-source, production-grade.</p>
        </div>
        
        <div>
          <h4 className={styles.colTitle}>Ecosystem</h4>
          <div className={styles.links}>
            <Link href="/projects#agentgovern" className={styles.link}>AgentGovern</Link>
            <Link href="/projects#bugpulse" className={styles.link}>BugPulse</Link>
            <Link href="/projects#contextforge" className={styles.link}>ContextForge</Link>
            <Link href="/labs" className={styles.link}>Nuuvixx Labs</Link>
          </div>
        </div>

        <div>
          <h4 className={styles.colTitle}>Company</h4>
          <div className={styles.links}>
            <Link href="/manifesto" className={styles.link}>Manifesto</Link>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/careers" className={styles.link}>Careers</Link>
            <Link href="/roadmap" className={styles.link}>Roadmap</Link>
          </div>
        </div>

        <div>
          <h4 className={styles.colTitle}>Connect</h4>
          <div className={styles.links}>
            <Link href="https://github.com/Nuuvixx" className={styles.link} target="_blank" rel="noopener noreferrer">GitHub</Link>
            <Link href="/community" className={styles.link}>Community</Link>
            <Link href="/blog" className={styles.link}>Blog</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.builtInPublic}>
          [ <span>Built in public</span> ]
        </div>
        <div>
          © {new Date().getFullYear()} Nuuvixx. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
