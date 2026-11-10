import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { STUDIO_SERVICES } from "@/data/studioServices";
import { SERVICE_VISUALS } from "@/data/serviceVisuals";
import imageGlow from "@/styles/service-image-glow.module.css";
import CommercialInquiryForm from "@/components/studio/CommercialInquiryForm";
import styles from "./services-landing.module.css";

export const metadata: Metadata = {
  title: "Nuuvixx Studio — Engineering services and working tools",
  description: "Explore five scoped Nuuvixx Studio services and try the browser-based diagnostic tools behind them.",
};

const status: Record<string, string> = {
  commerce: "Pilot ready",
  secure: "Local MVP",
  creative: "Local MVP",
  trade: "Pilot ready",
  bids: "Local MVP",
};

export default function StudioOverviewPage() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Nuuvixx Studio</span>
        <h1>Engineering services for <em>real business problems.</em></h1>
        <p>Five focused offerings, each backed by a working local tool or workflow. Explore what the software does today, then talk with us about a scoped engagement.</p>
        <div className={styles.heroActions}>
          <a href="#services" className={styles.primary}>Explore services <ArrowDown size={17} /></a>
          <Link href="/studio/work" className={styles.secondary}>See selected work <ArrowUpRight size={17} /></Link>
        </div>
      </header>

      <section id="services" className={styles.services} aria-labelledby="services-title">
        <div className={styles.sectionLead}>
          <span className={styles.eyebrow}>Commercial services</span>
          <h2 id="services-title">Choose the problem you need to solve.</h2>
          <p>Every demonstration uses sample data or files you supply locally. A service engagement is scoped separately.</p>
        </div>
        <div className={styles.serviceList}>
          {STUDIO_SERVICES.map((service, index) => (
            <article key={service.id} className={styles.service}>
              <div className={styles.serviceCopy}>
                <span className={styles.meta}>{String(index + 1).padStart(2, "0")} / {status[service.slug]} / {service.division}</span>
                <h3>{service.name}</h3>
                <p className={styles.tagline}>{service.tagline}</p>
                <p>{service.description}</p>
                <dl>
                  <div><dt>Best for</dt><dd>{service.targetAudience[0]}</dd></div>
                  <div><dt>What you can try</dt><dd>{service.deliverables[0]}</dd></div>
                </dl>
                <div className={styles.actions}>
                  <Link href={`/studio/${service.slug}`} className={styles.primary}>Explore service <ArrowUpRight size={16} /></Link>
                  <Link href={`/studio/${service.slug}#intake`} className={styles.textLink}>Request a scoped review</Link>
                </div>
              </div>
              <figure className={`${styles.serviceImage} ${imageGlow.frame}`}>
                <Image src={SERVICE_VISUALS[service.slug].src} alt={SERVICE_VISUALS[service.slug].alt} width={1200} height={800} sizes="(max-width: 767px) 100vw, 45vw" />
              </figure>
            </article>
          ))}
        </div>
      </section>

      <section id="inquiry" className={styles.inquiry}>
        <div>
          <span className={styles.eyebrow}>Work with Nuuvixx</span>
          <h2>Describe the problem. We will help define the scope.</h2>
          <p>Tell us what you need checked or built. The form collects only the details needed to review your request.</p>
        </div>
        <CommercialInquiryForm sourceContext="Studio Overview Page Intake" />
      </section>
    </main>
  );
}
