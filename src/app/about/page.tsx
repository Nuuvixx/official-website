import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./about.module.css";

export const metadata = {
  title: "About Nuuvixx — Engineering products and services",
  description: "Nuuvixx builds practical commercial tools through Studio and explores public agent tooling through Labs.",
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>About Nuuvixx</span>
        <h1>We build useful systems, then show how they work.</h1>
        <p>Nuuvixx combines scoped commercial engineering services with public software projects. The best introduction to our work is the software itself.</p>
      </header>

      <section className={styles.intro}>
        <span className={styles.index}>01 / What we do</span>
        <div><h2>Specific problems. Working tools.</h2><p>Nuuvixx Studio helps teams inspect product feeds, code security patterns, tender requirements, campaign briefs and trade records. Each offering has a browser-based tool or workflow that visitors can try with sample data.</p><Link href="/studio#services">Explore Studio services <ArrowUpRight size={16} /></Link></div>
      </section>

      <section className={styles.split}>
        <article><span className={styles.index}>02 / Studio</span><h2>Work with a clear scope.</h2><p>We begin with the actual data, code or document problem. The public tools show what can be checked locally; any human review or engineering work is agreed separately.</p><Link href="/studio/contact">Discuss a project <ArrowUpRight size={16} /></Link></article>
        <article><span className={styles.index}>03 / Labs</span><h2>Build and test in public.</h2><p>Labs links to public agent interfaces and source repositories, including BugPulse integrations and the AgentChaos research framework. Project status is stated plainly so a preview is not mistaken for a production claim.</p><Link href="/labs">Explore Labs <ArrowUpRight size={16} /></Link></article>
      </section>

      <section className={styles.approach}>
        <span className={styles.index}>04 / Our approach</span>
        <div><h2>Understand, diagnose, build, verify.</h2><p>Start with the smallest testable problem. Examine evidence, make a focused change and review the result against the original need. A useful report or working tool matters more than a broad promise.</p></div>
      </section>

      <section className={styles.work}>
        <div><span className={styles.eyebrow}>See the work</span><h2>Judge us by what you can inspect.</h2></div>
        <div><p>Commerce Rescue, Secure, Bid Intelligence, Trade Intelligence and Creative each have an interactive local demonstration. Work gathers those interfaces in one place.</p><Link href="/studio/work">View selected work <ArrowUpRight size={17} /></Link></div>
      </section>

      <section className={styles.contact}>
        <h2>Have a system that needs attention?</h2>
        <Link href="/studio/contact">Build with us <ArrowUpRight size={17} /></Link>
      </section>
    </main>
  );
}
