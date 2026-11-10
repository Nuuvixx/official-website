import Link from "next/link";
import NuuvixxLogo from "@/components/brand/NuuvixxLogo";
import { ArrowUpRight } from "lucide-react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Nuuvixx site footer">
      <div className={styles.container}>
        <div className={styles.intro}>
          <div><Link href="/" aria-label="Nuuvixx home" className={styles.logo}><NuuvixxLogo size="md" /></Link><p>Practical software for commerce, trade, procurement and agent tooling.</p></div>
          <Link href="/studio/contact" className={styles.contact}>Tell us what needs fixing or building <ArrowUpRight size={18} /></Link>
        </div>
        <div className={styles.columns}>
          <nav aria-label="Studio services"><h2>Studio</h2><Link href="/studio#services">All services</Link><Link href="/studio/commerce">Commerce Rescue</Link><Link href="/studio/secure">Nuuvixx Secure</Link><Link href="/studio/creative">Nuuvixx Creative</Link><Link href="/studio/trade">Trade Intelligence</Link><Link href="/studio/bids">Bid Intelligence</Link></nav>
          <nav aria-label="Projects"><h2>Projects</h2><Link href="/studio/work">Selected work</Link><Link href="/labs">Nuuvixx Labs</Link><a href="https://github.com/Nuuvixx/agentchaos" target="_blank" rel="noopener noreferrer">AgentChaos source</a><a href="https://github.com/Nuuvixx/BugPulse-CLI" target="_blank" rel="noopener noreferrer">BugPulse CLI source</a><Link href="/open-source">Open source</Link></nav>
          <nav aria-label="Company"><h2>Company</h2><Link href="/about">About</Link><Link href="/manifesto">Manifesto</Link><Link href="/careers">Careers</Link><Link href="/roadmap">Roadmap</Link><Link href="/community">Community</Link></nav>
          <nav aria-label="Contact"><h2>Contact</h2><Link href="/studio/contact">Start a project</Link><Link href="/contact">General contact</Link><a href="https://github.com/Nuuvixx" target="_blank" rel="noopener noreferrer">Nuuvixx on GitHub</a></nav>
        </div>
        <div className={styles.bottom}><span>© {new Date().getFullYear()} Nuuvixx</span><span>Studio · Labs · Open engineering</span></div>
      </div>
    </footer>
  );
}
