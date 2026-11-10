import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, AlertTriangle, Scale } from "lucide-react";
import styles from "../studio.module.css";
import { STUDIO_SERVICES } from "@/data/studioServices";
import CommercialInquiryForm from "@/components/studio/CommercialInquiryForm";
import FaqAccordion from "@/components/studio/FaqAccordion";
import TradeDiscrepancyDemo from "@/components/studio/demos/TradeDiscrepancyDemo";

const service = STUDIO_SERVICES.find((s) => s.slug === "trade")!;

export const metadata: Metadata = {
  title: "Nuuvixx Trade Intelligence — Shipping Document Reconciliation",
  description: "Compare structured invoice and packing-list records, review discrepancies and export a CSV variance report.",
};

export default function TradeIntelligencePage() {
  return (
    <main className={styles.studioMain}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <Scale size={14} />
          <span>{service.name}</span>
        </div>
        <h1 className={styles.heroTitle}>
          Structured trade document <br />
          <span className={styles.textVolt}>reconciliation.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          {service.description}
        </p>
        <div className={styles.heroCtas}>
          <a href="#intake" className={styles.primaryCta}>
            <span>Discuss document reconciliation</span>
            <ArrowRight size={15} strokeWidth={2.2} />
          </a>
          <a href="#demo" className={styles.secondaryCta}>
            <span>Try Live Document Matcher</span>
          </a>
        </div>
      </header>

      {/* Interactive Tool Section */}
      <section id="demo" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>Discrepancy Engine</div>
          <h2 className={styles.sectionTitle}>Compare structured shipment records.</h2>
          <p className={styles.sectionSubtitle}>
            Use sample invoice and packing-list data to inspect item, HS-code and weight differences. A specialist must review flagged records.
          </p>
        </div>
        <TradeDiscrepancyDemo />
      </section>

      {/* Target Customers & Critical Problems */}
      <section className={styles.section}>
        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle}>
              <CheckCircle2 size={20} color="var(--color-orange)" />
              <span>Who we serve</span>
            </h3>
            <ul className={styles.scopeList}>
              {service.targetAudience.map((target, idx) => (
                <li key={idx} className={styles.scopeIncludedItem}>
                  <span className={styles.featureBullet}>✓</span>
                  <span>{target}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle}>
              <AlertTriangle size={20} color="var(--color-orange)" />
              <span>Discrepancies we eliminate</span>
            </h3>
            <ul className={styles.scopeList}>
              {service.primaryProblems.map((prob, idx) => (
                <li key={idx} className={styles.scopeIncludedItem}>
                  <span className={styles.featureBullet}>—</span>
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Deliverables & Transparent Scope */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>Deliverables &amp; Scope</div>
          <h2 className={styles.sectionTitle}>What the comparison covers.</h2>
          <p className={styles.sectionSubtitle}>
            Compare structured invoice and packing-list fields, then review the differences before any operational decision.
          </p>
        </div>

        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle} style={{ color: "var(--color-success)" }}>
              <span>Available here</span>
            </h3>
            <ul className={styles.scopeList}>
              {service.deliverables.map((del, idx) => (
                <li key={idx} className={styles.scopeIncludedItem}>
                  <span style={{ color: "var(--color-success)", fontWeight: 700 }}>✓</span>
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle} style={{ color: "var(--color-error)" }}>
              <span>Current limits</span>
            </h3>
            <ul className={styles.scopeList}>
              {service.scopeAndExclusions.excluded.map((exc, idx) => (
                <li key={idx} className={styles.scopeExcludedItem}>
                  <span style={{ color: "var(--color-error)", fontWeight: 700 }}>✗</span>
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>Our Process</div>
          <h2 className={styles.sectionTitle}>From records to an exception report.</h2>
          <p className={styles.sectionSubtitle}>
            Compare structured fields and export discrepancies for human review. This tool does not file with customs.
          </p>
        </div>

        <div className={styles.processGrid}>
          {service.processSteps.map((step) => (
            <div key={step.step} className={styles.processStep}>
              <div className={styles.stepNum}>{step.step}</div>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.section}>
        <div className={styles.boxCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <span className={styles.sectionEyebrow}>Scope and pricing</span>
              <h3 style={{ fontSize: "1.8rem", color: "var(--color-ink)", marginTop: "4px", fontFamily: "var(--font-serif)", fontWeight: 400 }}>
                {service.introPricing.range} <span style={{ fontSize: "1rem", color: "var(--color-muted)", fontFamily: "var(--font-sans)" }}>/ {service.introPricing.model}</span>
              </h3>
              <p style={{ color: "var(--color-muted)", fontSize: "0.95rem", maxWidth: "600px", marginTop: "8px", lineHeight: 1.5 }}>
                {service.introPricing.note}
              </p>
            </div>
            <a href="#intake" className={styles.primaryCta} style={{ marginTop: "8px" }}>
              <span>Discuss a trade project</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>Questions &amp; Answers</div>
          <h2 className={styles.sectionTitle}>Frequently asked trade compliance questions.</h2>
        </div>
        <FaqAccordion items={service.faqs} />
      </section>

      {/* Intake */}
      <section id="intake" className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>Start a project</div>
          <h2 className={styles.sectionTitle}>Tell us about your documents.</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            Describe the formats and discrepancies you need checked. We will review the request and agree on a scope.
          </p>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <CommercialInquiryForm
            defaultService="trade-intelligence"
            sourceContext="Trade Intelligence Page"
          />
        </div>
      </section>
    </main>
  );
}
