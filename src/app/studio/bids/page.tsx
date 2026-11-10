import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import styles from "../studio.module.css";
import { STUDIO_SERVICES } from "@/data/studioServices";
import CommercialInquiryForm from "@/components/studio/CommercialInquiryForm";
import FaqAccordion from "@/components/studio/FaqAccordion";
import BidRequirementsDemo from "@/components/studio/demos/BidRequirementsDemo";

const service = STUDIO_SERVICES.find((s) => s.slug === "bids")!;

export const metadata: Metadata = {
  title: "Nuuvixx Bid Intelligence — Tender Parsing & Qualification Briefs",
  description: "Extract selected deadlines and requirements from tender text with source-line references and a CSV checklist.",
};

export default function BidIntelligencePage() {
  return (
    <main className={styles.studioMain}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <FileText size={14} />
          <span>{service.division}</span>
        </div>
        <h1 className={styles.heroTitle}>
          Tender opportunity briefs and <br />
          <span className={styles.textVolt}>mandatory criteria extraction.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          {service.description}
        </p>
        <div className={styles.heroCtas}>
          <a href="#intake" className={styles.primaryCta}>
            <span>Request a tender brief</span>
            <ArrowRight size={15} strokeWidth={2.2} />
          </a>
          <a href="#demo" className={styles.secondaryCta}>
            <span>Try the local tender parser</span>
          </a>
        </div>
      </header>

      {/* Interactive Tool Section */}
      <section id="demo" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>RFP Intelligence</div>
          <h2 className={styles.sectionTitle}>Interactive tender parser &amp; matrix extractor.</h2>
          <p className={styles.sectionSubtitle}>
            Try the parser with a bundled tender excerpt. It highlights selected requirements for a human reviewer; it cannot decide eligibility.
          </p>
        </div>
        <BidRequirementsDemo />
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
              <span>Bid risks we eliminate</span>
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
          <h2 className={styles.sectionTitle}>Engineered bid deliverables with zero ambiguity.</h2>
          <p className={styles.sectionSubtitle}>
            Mandatory criteria matrices, disqualification trap checklists, and submission timelines delivered within 24 hours.
          </p>
        </div>

        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle} style={{ color: "var(--color-success)" }}>
              <span>Included in every brief</span>
            </h3>
            <ul className={styles.scopeList}>
              {service.deliverables.map((del, idx) => (
                <li key={idx} className={styles.scopeIncludedItem}>
                  <span style={{ color: "var(--color-success)", fontWeight: 700 }}>✓</span>
                  <span>{del}</span>
                </li>
              ))}
              {service.scopeAndExclusions.included.map((inc, idx) => (
                <li key={`inc-${idx}`} className={styles.scopeIncludedItem}>
                  <span style={{ color: "var(--color-success)", fontWeight: 700 }}>✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle} style={{ color: "var(--color-error)" }}>
              <span>Explicit exclusions</span>
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
          <h2 className={styles.sectionTitle}>From tender text to a review checklist.</h2>
          <p className={styles.sectionSubtitle}>
            Review extracted requirements against their source lines, then export a checklist for your team.
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
              <span>Commission Bid Brief</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>Questions &amp; Answers</div>
          <h2 className={styles.sectionTitle}>Frequently asked procurement questions.</h2>
        </div>
        <FaqAccordion items={service.faqs} />
      </section>

      {/* Intake */}
      <section id="intake" className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>Direct Intake</div>
          <h2 className={styles.sectionTitle}>Initiate Bid Intelligence brief.</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            Upload or link the RFP tender documentation. An engineer will inspect the scope and confirm delivery timing.
          </p>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <CommercialInquiryForm
            defaultService="bid-intelligence"
            sourceContext="Bid Intelligence Page"
          />
        </div>
      </section>
    </main>
  );
}
