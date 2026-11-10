import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICE_VISUALS } from "@/data/serviceVisuals";
import imageGlow from "@/styles/service-image-glow.module.css";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Selected work — Nuuvixx",
  description: "Inspect working Nuuvixx Studio tools and their browser-based demonstrations. Sample data is clearly identified; no client work is implied.",
};

const projects = [
  { name: "Commerce Rescue", description: "Check CSV, TSV and XML product feeds for field-level issues, then export a report you can use to plan a fix.", href: "/studio/commerce", image: "commerce" },
  { name: "Nuuvixx Secure", description: "Inspect Next.js and Supabase code snippets against five defined risk patterns, with line evidence and suggested fixes.", href: "/studio/secure", image: "secure" },
  { name: "Bid Intelligence", description: "Pull deadlines and requirements from tender text into a checklist linked back to the source lines.", href: "/studio/bids", image: "bids" },
  { name: "Trade Intelligence", description: "Compare structured invoice and packing-list records and export the differences for review.", href: "/studio/trade", image: "trade" },
  { name: "Nuuvixx Creative", description: "Turn product details into a four-scene production brief with camera, voiceover and sound cues.", href: "/studio/creative", image: "creative" },
];

export default function StudioWorkPage() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Selected work</span>
        <h1>Software you can <em>inspect.</em></h1>
        <p>Explore working Nuuvixx tools before starting a project. Each demonstration shows what you can check or create today.</p>
        <div className={styles.heroLinks}>
          <a href="#projects" className={styles.primary}>Explore projects <ArrowUpRight size={17} /></a>
          <Link href="/labs" className={styles.secondary}>See Labs projects <ArrowUpRight size={17} /></Link>
        </div>
      </header>
      <section id="projects" className={styles.projects} aria-label="Nuuvixx Studio projects">
        {projects.map((project) => (
          <article key={project.name} className={styles.project}>
            <div className={styles.copy}>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <Link href={project.href} className={styles.projectLink}>Try the tool <ArrowUpRight size={17} /></Link>
            </div>
            <figure className={`${styles.visual} ${imageGlow.frame}`}>
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
