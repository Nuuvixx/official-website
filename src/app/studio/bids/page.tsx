import type { Metadata } from "next";
import { ArrowRight, CheckCircle, Warning, FileText } from "@phosphor-icons/react/dist/ssr";
import styles from "../studio.module.css";
import { STUDIO_SERVICES } from "@/data/studioServices";
import CommercialInquiryForm from "@/components/studio/CommercialInquiryForm";
import FaqAccordion from "@/components/studio/FaqAccordion";
import BidRequirementsDemo from "@/components/studio/demos/BidRequirementsDemo";

const service = STUDIO_SERVICES.find((s) => s.slug === "bids")!;

export const metadata: Metadata = {
  title: "Nuuvixx Bid Intelligence — Tender Parsing & Qualification Briefs for Suppliers",
  description: "Extract mandatory RFP qualification clauses, submission deadlines, and compliance matrices from 100-page tender documents in 24 hours.",
};

export default function BidIntelligencePage() {
  return (
    <main className={styles.studioMain}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <FileText size={14} weight="fill" />
          {"// "} {service.division}
        </div>
        <h1 className={styles.heroTitle}>
          Tender Opportunity Briefs &amp; <br />
          <span className={styles.textVolt}>Mandatory Qualification Extraction.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          {service.description}
        </p>
        <div className={styles.heroCtas}>
          <a href="#intake" className={styles.primaryCta}>
            Commission Tender Brief ({service.introPricing.range}) <ArrowRight size={16} weight="bold" />
          </a>
          <a href="#demo" className={styles.secondaryCta}>
            Try Live RFP Parser
          </a>
        </div>
      </header>

      {/* Interactive Tool Section */}
      <section id="demo" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{"// LIVE INTERACTIVE TOOL"}</div>
          <h2 className={styles.sectionTitle}>Interactive Tender Clause Parser &amp; Matrix Extractor</h2>
          <p className={styles.sectionSubtitle}>
            Run our RFP intelligence pipeline against a real-world municipal transit RFP excerpt to see how mandatory pass/fail criteria and hidden disqualification traps are surfaced.
          </p>
        </div>
        <BidRequirementsDemo />
      </section>

      {/* Target Customers & Critical Problems */}
      <section className={styles.section}>
        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle}>
              <CheckCircle size={22} weight="fill" color="var(--color-volt)" />
              Who Bid Intelligence Is Built For
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
              <Warning size={22} weight="fill" color="#CCFF00" />
              Why Suppliers Waste Hundreds of Bid Hours
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
          <div className={styles.sectionEyebrow}>{"// DELIVERABLES & PROCUREMENT BOUNDARIES"}</div>
          <h2 className={styles.sectionTitle}>Actionable Tender Briefs &amp; Compliance Spreadsheets</h2>
          <p className={styles.sectionSubtitle}>
            We provide structured, clause-by-clause response matrices and executive go/no-go verdicts so your team never bids on an unwinnable tender.
          </p>
        </div>

        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle} style={{ color: "#00e676" }}>
              Included in Every Tender Package
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
              Procurement Disclaimers &amp; Exclusions
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
              <strong>No Contract Award Guarantees:</strong> Tender decisions are made solely by procurement authorities. Nuuvixx provides requirement extraction and risk analysis. We do not guarantee bid awards.
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{"// 24-HOUR ANALYSIS CYCLE"}</div>
          <h2 className={styles.sectionTitle}>From 100-Page RFP to Actionable Matrix</h2>
          <p className={styles.sectionSubtitle}>
            Rapid analysis designed to give your bid writers the maximum available time before deadlines.
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
        <div className={styles.boxCard} style={{ borderColor: "rgba(204, 255, 0, 0.4)", background: "rgba(204, 255, 0, 0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <span className={styles.sectionEyebrow}>FIXED-SCOPE PACKAGES</span>
              <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginTop: "4px" }}>
                {service.introPricing.range} <span style={{ fontSize: "1rem", color: "var(--color-text-secondary)", fontWeight: 400 }}>/ {service.introPricing.model}</span>
              </h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", maxWidth: "600px", marginTop: "8px" }}>
                {service.introPricing.note}
              </p>
              <div style={{ marginTop: "16px", fontSize: "0.85rem", color: "var(--color-volt)" }}>
                <strong>Automated Portal Scanner Roadmap:</strong> {service.futureRoadmap}
              </div>
            </div>
            <a href="#intake" className={styles.primaryCta} style={{ marginTop: "12px", background: "#CCFF00", color: "#000000" }}>
              Commission Tender Brief →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>{"// PROCUREMENT QUESTIONS"}</div>
          <h2 className={styles.sectionTitle}>Frequently Asked Bid Intelligence Questions</h2>
        </div>
        <FaqAccordion items={service.faqs} />
      </section>

      {/* Commercial Qualification Form */}
      <section id="intake" className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>{"// SUBMIT TENDER FOR REVIEW"}</div>
          <h2 className={styles.sectionTitle}>Commission Tender Opportunity Brief</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            Provide the tender title, agency link, or deadline. Our procurement analysts will review document scope and confirm turnaround within 24 hours.
          </p>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <CommercialInquiryForm
            defaultService="bid-intelligence"
            sourceContext="Bid Intelligence Product Page"
          />
        </div>
      </section>
    </main>
  );
}
