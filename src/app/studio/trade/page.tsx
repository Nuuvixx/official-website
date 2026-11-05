import type { Metadata } from "next";
import { ArrowRight, CheckCircle, Warning, Scales } from "@phosphor-icons/react/dist/ssr";
import styles from "../studio.module.css";
import { STUDIO_SERVICES } from "@/data/studioServices";
import CommercialInquiryForm from "@/components/studio/CommercialInquiryForm";
import FaqAccordion from "@/components/studio/FaqAccordion";
import TradeDiscrepancyDemo from "@/components/studio/demos/TradeDiscrepancyDemo";

const service = STUDIO_SERVICES.find((s) => s.slug === "trade")!;

export const metadata: Metadata = {
  title: "Nuuvixx Trade Intelligence — Cross-Border Shipping Document Reconciliation",
  description: "Automated multi-document cross-checking for Commercial Invoices, Packing Lists, and Purchase Orders. Eliminate customs clearance holds and demurrage costs.",
};

export default function TradeIntelligencePage() {
  return (
    <main className={styles.studioMain}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <Scales size={14} weight="fill" />
          {"// "} {service.division}
        </div>
        <h1 className={styles.heroTitle}>
          Automated Trade Document <br />
          <span className={styles.textVolt}>Reconciliation &amp; Discrepancy Audits.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          {service.description}
        </p>
        <div className={styles.heroCtas}>
          <a href="#intake" className={styles.primaryCta}>
            Initiate Document Reconciliation Pilot <ArrowRight size={16} weight="bold" />
          </a>
          <a href="#demo" className={styles.secondaryCta}>
            Try Live Document Matcher
          </a>
        </div>
      </header>

      {/* Interactive Tool Section */}
      <section id="demo" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{"// LIVE INTERACTIVE TOOL"}</div>
          <h2 className={styles.sectionTitle}>Interactive Multi-Document Discrepancy Engine</h2>
          <p className={styles.sectionSubtitle}>
            Run our multi-document reconciliation pipeline against a synthetic shipment dataset to see how weight variances, HS code mismatches, and mathematical anomalies are detected in seconds.
          </p>
        </div>
        <TradeDiscrepancyDemo />
      </section>

      {/* Target Customers & Critical Problems */}
      <section className={styles.section}>
        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle}>
              <CheckCircle size={22} weight="fill" color="var(--color-volt)" />
              Designed for High-Volume Exporters &amp; Forwarders
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
              <Warning size={22} weight="fill" color="#7ecff4" />
              The Real Cost of Document Discrepancies
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
          <div className={styles.sectionEyebrow}>{"// DELIVERABLES & REGULATORY BOUNDARIES"}</div>
          <h2 className={styles.sectionTitle}>Structured Exception Data for Operations Teams</h2>
          <p className={styles.sectionSubtitle}>
            We provide actionable reconciliation matrices and pre-clearance risk scorecards before shipping documents reach port authorities.
          </p>
        </div>

        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle} style={{ color: "#00e676" }}>
              Included in Every Audit
            </h3>
            <ul className={styles.scopeList}>
              {service.deliverables.map((del, idx) => (
                <li key={idx} className={styles.scopeIncludedItem}>
                  <span style={{ color: "#00e676", fontWeight: 700 }}>✓</span>
                  <span>{del}</span>
                </li>
              ))}
              {service.scopeAndExclusions.included.map((inc, idx) => (
                <li key={`inc-${idx}`} className={styles.scopeIncludedItem}>
                  <span style={{ color: "#00e676", fontWeight: 700 }}>✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle} style={{ color: "#ff6b6b" }}>
              Regulatory Disclaimers &amp; Exclusions
            </h3>
            <ul className={styles.scopeList}>
              {service.scopeAndExclusions.excluded.map((exc, idx) => (
                <li key={idx} className={styles.scopeExcludedItem}>
                  <span style={{ color: "#ff6b6b", fontWeight: 700 }}>✗</span>
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "24px", padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
              <strong>Customs Authority Boundary:</strong> Nuuvixx Trade Intelligence provides data verification and reconciliation software. We do not provide legal customs counsel or act as licensed customs brokers.
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{"// FOUR-STEP RECONCILIATION"}</div>
          <h2 className={styles.sectionTitle}>From Unstructured Scans to Exception Briefs</h2>
          <p className={styles.sectionSubtitle}>
            Fast turnaround engineered to unblock container manifests before Bill of Lading deadlines.
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

      {/* Pricing & Future Roadmap */}
      <section className={styles.section}>
        <div className={styles.boxCard} style={{ borderColor: "rgba(126, 207, 244, 0.4)", background: "rgba(126, 207, 244, 0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <span className={styles.sectionEyebrow}>PILOT VALIDATION PROGRAM</span>
              <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginTop: "4px" }}>
                Validation Pilot <span style={{ fontSize: "1rem", color: "var(--color-text-secondary)", fontWeight: 400 }}>/ {service.introPricing.model}</span>
              </h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", maxWidth: "600px", marginTop: "8px" }}>
                {service.introPricing.note}
              </p>
              <div style={{ marginTop: "16px", fontSize: "0.85rem", color: "var(--color-volt)" }}>
                <strong>Enterprise SaaS Roadmap:</strong> {service.futureRoadmap}
              </div>
            </div>
            <a href="#intake" className={styles.primaryCta} style={{ marginTop: "12px", background: "#7ECFF4", color: "#000000" }}>
              Start Trade Document Pilot →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>{"// LOGISTICS & COMPLIANCE QUESTIONS"}</div>
          <h2 className={styles.sectionTitle}>Frequently Asked Trade Questions</h2>
        </div>
        <FaqAccordion items={service.faqs} />
      </section>

      {/* Commercial Qualification Form */}
      <section id="intake" className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>{"// OPERATIONAL INTAKE"}</div>
          <h2 className={styles.sectionTitle}>Request Trade Document Reconciliation Pilot</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            Submit your monthly shipment volume and document formats. An engineering lead will schedule a technical workflow call.
          </p>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <CommercialInquiryForm
            defaultService="trade-intelligence"
            sourceContext="Trade Intelligence Product Page"
          />
        </div>
      </section>
    </main>
  );
}
