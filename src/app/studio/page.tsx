import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck, ShoppingCart, VideoCamera, Scales, FileText, Sparkle } from "@phosphor-icons/react/dist/ssr";
import styles from "./studio.module.css";
import { STUDIO_SERVICES } from "@/data/studioServices";
import CommercialInquiryForm from "@/components/studio/CommercialInquiryForm";

type PhosphorIcon = React.ComponentType<{
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  color?: string;
  style?: React.CSSProperties;
}>;

export const metadata: Metadata = {
  title: "Nuuvixx Studio — Commercial AI Engineering & Enterprise Systems",
  description: "Specialized engineering divisions delivering fixed-scope audits, high-converting creative systems, and AI-assisted workflows for international businesses.",
};

const iconMap: Record<string, PhosphorIcon> = {
  "commerce-rescue": ShoppingCart,
  "nuuvixx-secure": ShieldCheck,
  "nuuvixx-creative": VideoCamera,
  "trade-intelligence": Scales,
  "bid-intelligence": FileText,
};

export default function StudioOverviewPage() {
  return (
    <main className={styles.studioMain}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <Sparkle size={14} weight="fill" />
          {"// Commercial Engineering Division"}
        </div>
        <h1 className={styles.heroTitle}>
          Precision Engineering for <br />
          <span className={styles.textVolt}>High-Stakes Digital Operations.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          While Nuuvixx Labs engineers open-source infrastructure for autonomous agents,
          Nuuvixx Studio solves immediate, revenue-critical operational bottlenecks for international
          ecommerce brands, AI software founders, freight operators, and tender contractors.
        </p>
        <div className={styles.heroCtas}>
          <Link href="#divisions" className={styles.primaryCta}>
            Explore Commercial Divisions <ArrowRight size={16} weight="bold" />
          </Link>
          <Link href="/studio/work" className={styles.secondaryCta}>
            View Interactive Tools &amp; Proof of Work
          </Link>
        </div>
      </header>

      {/* Pillars Distinction Alert */}
      <section className={styles.section}>
        <div className={styles.boxCard} style={{ borderColor: "rgba(255, 107, 44, 0.3)", background: "rgba(255, 107, 44, 0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span className={styles.sectionEyebrow}>Two Pillars. One Engineering Philosophy.</span>
              <h3 style={{ fontSize: "1.2rem", color: "#ffffff", marginTop: "4px" }}>
                Looking for Open-Source Autonomous Agent Infrastructure?
              </h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", maxWidth: "700px", marginTop: "4px" }}>
                AgentVerse, AgentStore, and BugPulse live within <strong>Nuuvixx Labs</strong>. If you are seeking our open-source runtimes, repositories, or telemetry tools, visit the Labs division.
              </p>
            </div>
            <Link href="/labs" className={styles.secondaryCta} style={{ whiteSpace: "nowrap" }}>
              Go to Nuuvixx Labs →
            </Link>
          </div>
        </div>
      </section>

      {/* Five Commercial Divisions */}
      <section id="divisions" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{"// FIVE SPECIALIZED DIVISIONS"}</div>
          <h2 className={styles.sectionTitle}>Built for Measurable ROI and Fast Turnaround</h2>
          <p className={styles.sectionSubtitle}>
            Each division operates under transparent, fixed-scope deliverables. No open-ended agency retainers or unverified claims.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {STUDIO_SERVICES.map((service) => {
            const ServiceIcon = iconMap[service.id] || Sparkle;
            return (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceCardTop}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className={styles.cardBadge}>{service.badge}</span>
                    <ServiceIcon size={24} weight="duotone" style={{ color: service.accentColor }} />
                  </div>
                  <h3 className={styles.cardTitle}>{service.name}</h3>
                  <p className={styles.cardTagline}>{service.tagline}</p>
                  <div className={styles.priceTag}>Intro: {service.introPricing.range}</div>

                  <ul className={styles.featuresList}>
                    {service.primaryProblems.slice(0, 3).map((prob, i) => (
                      <li key={i} className={styles.featureItem}>
                        <span className={styles.featureBullet}>—</span>
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/studio/${service.slug}`} className={styles.cardAction}>
                  <span>Explore Division &amp; Methodology</span>
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engagement Standards & Guarantees */}
      <section className={styles.section}>
        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle}>
              <CheckCircle size={22} weight="fill" color="var(--color-volt)" />
              Our Operating Principles
            </h3>
            <ul className={styles.scopeList}>
              <li className={styles.scopeIncludedItem}>
                <span className={styles.featureBullet}>✓</span>
                <span><strong>Founding Engineer Oversight:</strong> Every audit and deliverable is personally executed or supervised by senior engineers.</span>
              </li>
              <li className={styles.scopeIncludedItem}>
                <span className={styles.featureBullet}>✓</span>
                <span><strong>Zero-Trust Data Security:</strong> NDAs provided on request. We never ingest proprietary code into public LLM training datasets.</span>
              </li>
              <li className={styles.scopeIncludedItem}>
                <span className={styles.featureBullet}>✓</span>
                <span><strong>Transparent Scopes:</strong> Fixed upfront pricing for diagnostics and initial remediation sprints. No surprise billing.</span>
              </li>
              <li className={styles.scopeIncludedItem}>
                <span className={styles.featureBullet}>✓</span>
                <span><strong>Working Code Over Slide Decks:</strong> We deliver pull requests, sanitization endpoints, and verified briefs—not vague recommendations.</span>
              </li>
            </ul>
          </div>

          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle}>
              <ShieldCheck size={22} weight="fill" color="#7ecff4" />
              What We Do Not Do
            </h3>
            <ul className={styles.scopeList}>
              <li className={styles.scopeExcludedItem}>
                <span style={{ color: "var(--color-pulse)", fontWeight: 700 }}>✗</span>
                <span>No fabricated client logos, inflated revenue claims, or automated regulatory certifications.</span>
              </li>
              <li className={styles.scopeExcludedItem}>
                <span style={{ color: "var(--color-pulse)", fontWeight: 700 }}>✗</span>
                <span>No black-box subscriptions that lock you in before proof of utility is demonstrated.</span>
              </li>
              <li className={styles.scopeExcludedItem}>
                <span style={{ color: "var(--color-pulse)", fontWeight: 700 }}>✗</span>
                <span>No legal customs representation or certified SOC2 auditor attestations (we provide code &amp; document engineering).</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Qualification & Inquiry Section */}
      <section id="contact" className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>{"// ENGAGE NUUVIXX STUDIO"}</div>
          <h2 className={styles.sectionTitle}>Initiate a Technical Qualification Brief</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            Submit your technical requirement or catalog bottleneck. An engineer will review your problem and respond within 24 hours.
          </p>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <CommercialInquiryForm sourceContext="Nuuvixx Studio Overview" />
        </div>
      </section>
    </main>
  );
}
