import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICE_VISUALS } from "@/data/serviceVisuals";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Selected work — Nuuvixx",
  description: "Inspect working Nuuvixx Studio tools and their browser-based demonstrations. Sample data is clearly identified; no client work is implied.",
};

const projects = [
  { name: "Commerce Rescue", type: "Commercial diagnostic · pilot ready", description: "A local product-feed validator for CSV, TSV and XML catalogs. It reports field-level issues and exports CSV or JSON findings.", scope: "Feed parsing · static validation · report exports", href: "/studio/commerce", image: "commerce" },
  { name: "Nuuvixx Secure", type: "Security checker · local MVP", description: "A browser-based code checker for five defined Next.js and Supabase risk patterns, with line evidence and example remediation.", scope: "Static heuristics · code review · access control", href: "/studio/secure", image: "secure" },
  { name: "Bid Intelligence", type: "Tender parser · local MVP", description: "Extracts selected deadlines and requirements from tender text with source-line references and a CSV checklist.", scope: "Text extraction · source lines · CSV checklist", href: "/studio/bids", image: "bids" },
  { name: "Trade Intelligence", type: "Document reconciler · pilot ready", description: "Compares structured invoice and packing-list records for HS-code, item and weight differences, then exports a variance report.", scope: "Structured comparison · discrepancy matrix · CSV", href: "/studio/trade", image: "trade" },
  { name: "Nuuvixx Creative", type: "Campaign workflow · local MVP", description: "Builds a four-scene production brief with camera, voiceover and sound cues. The output is a JSON blueprint, not rendered video.", scope: "Brief generation · scene planning · JSON export", href: "/studio/creative", image: "creative" },
];

export default function StudioWorkPage() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Selected work</span>
        <h1>Software you can <em>inspect.</em></h1>
        <p>Products, tools and engineering projects developed at Nuuvixx. These are working demonstrations with bundled sample data, not paid client case studies.</p>
        <div className={styles.heroLinks}>
          <a href="#projects" className={styles.primary}>Explore projects <ArrowUpRight size={17} /></a>
          <Link href="/labs" className={styles.secondary}>See Labs projects <ArrowUpRight size={17} /></Link>
        </div>
      </header>
      <section id="projects" className={styles.projects} aria-label="Nuuvixx Studio projects">
        {projects.map((project, index) => (
          <article key={project.name} className={styles.project}>
            <div className={styles.copy}>
              <span className={styles.meta}>{String(index + 1).padStart(2,"0")} / {project.type}</span>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <div className={styles.scope}><strong>Technical scope</strong><span>{project.scope}</span></div>
              <Link href={project.href} className={styles.projectLink}>Open working tool <ArrowUpRight size={17} /></Link>
            </div>
            <figure className={styles.visual}>
              <Image src={SERVICE_VISUALS[project.image].src} alt={SERVICE_VISUALS[project.image].alt} width={1200} height={800} sizes="(max-width: 767px) 100vw, 48vw" />
            </figure>
          </article>
        ))}
      </section>
      <section className={styles.labsBridge}>
        <div><span className={styles.eyebrow}>Beyond Studio</span><h2>Engineering projects in the open.</h2><p>Labs contains public agent tooling and repositories. Their current interfaces and code provide the evidence.</p></div>
        <Link href="/labs">Explore Nuuvixx Labs <ArrowUpRight size={18} /></Link>
      </section>
    </main>
  );
}
