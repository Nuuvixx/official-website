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
          <p className={styles.tagline}>
            Infrastructure for the machines that think. Engineering resilient open-source tools and commercial AI divisions.
          </p>
        </div>

        {/* Studio Division */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Nuuvixx Studio</h4>
          <div className={styles.links}>
            <Link href="/studio/commerce" className={`${styles.link} ${styles.linkVolt}`}>Commerce Rescue</Link>
            <Link href="/studio/secure" className={`${styles.link} ${styles.linkVolt}`}>Nuuvixx Secure</Link>
            <Link href="/studio/creative" className={`${styles.link} ${styles.linkVolt}`}>Nuuvixx Creative</Link>
            <Link href="/studio/trade" className={`${styles.link} ${styles.linkVolt}`}>Trade Intelligence</Link>
            <Link href="/studio/bids" className={`${styles.link} ${styles.linkVolt}`}>Bid Intelligence</Link>
            <Link href="/studio/work" className={`${styles.link} ${styles.linkVolt}`}>Proof of Work &amp; Tools</Link>
          </div>
        </div>
        
        {/* Labs Division */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Nuuvixx Labs</h4>
          <div className={styles.links}>
            <Link href="https://agentverse.nuuvixx.com" target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.linkIce}`}>AgentVerse</Link>
            <Link href="https://agentstore.nuuvixx.com" target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.linkIce}`}>AgentStore</Link>
            <Link href="https://bugpulse.nuuvixx.com" target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.linkIce}`}>BugPulse</Link>
            <Link href="https://github.com/ritinpaul/CareerOS" target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.linkIce}`}>CareerOS</Link>
            <Link href="/labs" className={`${styles.link} ${styles.linkIce}`}>Labs Research</Link>
            <Link href="/open-source" className={`${styles.link} ${styles.linkIce}`}>Open Source</Link>
          </div>
        </div>

        {/* Company */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Company</h4>
          <div className={styles.links}>
            <Link href="/manifesto" className={`${styles.link} ${styles.linkIce}`}>Manifesto</Link>
            <Link href="/about" className={`${styles.link} ${styles.linkIce}`}>About Us</Link>
            <Link href="/careers" className={`${styles.link} ${styles.linkIce}`}>Careers</Link>
            <Link href="/roadmap" className={`${styles.link} ${styles.linkIce}`}>Roadmap</Link>
          </div>
        </div>

        {/* Connect & Intake */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Connect</h4>
          <div className={styles.links}>
            <Link href="/studio/contact" className={`${styles.link} ${styles.linkEmerald}`}>Commercial Intake</Link>
            <Link href="https://github.com/Nuuvixx" className={`${styles.link} ${styles.linkEmerald}`} target="_blank" rel="noopener noreferrer">GitHub</Link>
            <Link href="/community" className={`${styles.link} ${styles.linkEmerald}`}>Community</Link>
            <Link href="/blog" className={`${styles.link} ${styles.linkEmerald}`}>Blog</Link>
            <Link href="/contact" className={`${styles.link} ${styles.linkEmerald}`}>Contact Us</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.builtInPublic}>
          <span className={styles.bracket}>[</span> Built in public · Engineering for Production <span className={styles.bracket}>]</span>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Nuuvixx. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
