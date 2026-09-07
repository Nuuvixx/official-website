import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGlow} />
      <div className={styles.watermark}>NUUVIXX</div>
      <div className={styles.glowLine}></div>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Image
              src="/logo.png"
              alt="Nuuvixx Logo"
              width={28}
              height={28}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>NUUVIXX</span>
          </div>
          <p className={styles.tagline}>Infrastructure for the machines that think. Open-source, production-grade.</p>
        </div>
        
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Ecosystem</h4>
          <div className={styles.links}>
            <Link href="https://agentverse.nuuvixx.com" target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.linkVolt}`}>AgentVerse</Link>
            <Link href="https://agentstore.nuuvixx.com" target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.linkVolt}`}>AgentStore</Link>
            <Link href="https://bugpulse.nuuvixx.com" target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.linkVolt}`}>BugPulse</Link>
            <Link href="https://github.com/ritinpaul/CareerOS" target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.linkVolt}`}>CareerOS</Link>
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Company</h4>
          <div className={styles.links}>
            <Link href="/manifesto" className={`${styles.link} ${styles.linkIce}`}>Manifesto</Link>
            <Link href="/about" className={`${styles.link} ${styles.linkIce}`}>About Us</Link>
            <Link href="/careers" className={`${styles.link} ${styles.linkIce}`}>Careers</Link>
            <Link href="/roadmap" className={`${styles.link} ${styles.linkIce}`}>Roadmap</Link>
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Connect</h4>
          <div className={styles.links}>
            <Link href="https://github.com/Nuuvixx" className={`${styles.link} ${styles.linkEmerald}`} target="_blank" rel="noopener noreferrer">GitHub</Link>
            <Link href="/community" className={`${styles.link} ${styles.linkEmerald}`}>Community</Link>
            <Link href="/blog" className={`${styles.link} ${styles.linkEmerald}`}>Blog</Link>
            <Link href="/contact" className={`${styles.link} ${styles.linkEmerald}`}>Contact</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.builtInPublic}>
          <span className={styles.bracket}>[</span> Built in public <span className={styles.bracket}>]</span>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Nuuvixx. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
