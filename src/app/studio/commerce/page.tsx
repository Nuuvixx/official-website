import type { Metadata } from "next";
import { ArrowRight, CheckCircle, Warning, ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import styles from "../studio.module.css";
import { STUDIO_SERVICES } from "@/data/studioServices";
import CommercialInquiryForm from "@/components/studio/CommercialInquiryForm";
import FaqAccordion from "@/components/studio/FaqAccordion";
import CommerceRescueValidator from "@/components/studio/commerce/CommerceRescueValidator";

const service = STUDIO_SERVICES.find((s) => s.slug === "commerce")!;

export const metadata: Metadata = {
  title: "Nuuvixx Commerce Rescue — Google Merchant Center Feed Diagnostics & Fixes",
  description: "Diagnose broken product feeds, variant mismatches, and Google Merchant Center disapprovals. Fixed-scope audit and remediation for Shopify stores.",
};

export default function CommerceRescuePage() {
  return (
    <main className={styles.studioMain}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <ShoppingCart size={14} weight="fill" />
          {"// "} {service.division}
        </div>
        <h1 className={styles.heroTitle}>
          Fix Broken Product Feeds &amp; <br />
          <span className={styles.textVolt}>GMC Disapprovals at the Source.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          {service.description}
        </p>
        <div className={styles.heroCtas}>
          <a href="#intake" className={styles.primaryCta}>
            Request Feed Remediation ({service.introPricing.range}) <ArrowRight size={16} weight="bold" />
          </a>
          <a href="#demo" className={styles.secondaryCta}>
            Try Live Feed Diagnostic Demo
          </a>
        </div>
      </header>

      {/* Interactive Tool Section */}
      <section id="demo" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{"// WORKING COMMERCIAL TOOL"}</div>
          <h2 className={styles.sectionTitle}>Diagnose Merchant Center Disapprovals Instantly</h2>
          <p className={styles.sectionSubtitle}>
            Upload your production CSV, TSV, or Google Base XML feed. Our diagnostic engine evaluates every product against official Google Merchant Center specifications and generates actionable remediation code.
          </p>
        </div>
        <CommerceRescueValidator />
      </section>

      {/* Target Customers & Critical Problems */}
      <section className={styles.section}>
        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle}>
              <CheckCircle size={22} weight="fill" color="var(--color-volt)" />
              Who We Serve
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
              <Warning size={22} weight="fill" color="#ffaa00" />
              The Exact Catalog Problems We Solve
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
          <div className={styles.sectionEyebrow}>{"// DELIVERABLES & SCOPE"}</div>
          <h2 className={styles.sectionTitle}>Engineered Deliverables with Zero Ambiguity</h2>
          <p className={styles.sectionSubtitle}>
            We provide concrete code, proxy endpoints, and documented fixes. Here is what is strictly included and excluded.
          </p>
        </div>

        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle} style={{ color: "#00e676" }}>
              Included in Every Remediation
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
              Explicit Exclusions
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
              <strong>Note on Google Authority:</strong> We provide rigorous engineering remediation for documented feed schema and attribute specification errors. Policy reinstatement decisions ultimately reside solely with Google LLC; resolving underlying data and crawl discrepancies is the mandatory prerequisite.
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{"// OUR FOUR-STEP PROCESS"}</div>
          <h2 className={styles.sectionTitle}>From Ingestion to Approved Merchant Feeds</h2>
          <p className={styles.sectionSubtitle}>
            Fast turnaround designed to unblock paused Google Ads and Meta shopping campaigns within 24–48 hours.
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
        <div className={styles.boxCard} style={{ borderColor: "rgba(255, 107, 44, 0.4)", background: "rgba(255, 107, 44, 0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <span className={styles.sectionEyebrow}>INTRODUCTORY PILOT TIERS</span>
              <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginTop: "4px" }}>
                {service.introPricing.range} <span style={{ fontSize: "1rem", color: "var(--color-text-secondary)", fontWeight: 400 }}>/ {service.introPricing.model}</span>
              </h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", maxWidth: "600px", marginTop: "8px" }}>
                {service.introPricing.note}
              </p>
              <div style={{ marginTop: "16px", fontSize: "0.85rem", color: "var(--color-volt)" }}>
                <strong>Future Subscription Roadmap:</strong> {service.futureRoadmap}
              </div>
            </div>
            <a href="#intake" className={styles.primaryCta} style={{ marginTop: "12px" }}>
              Book Catalog Audit Now →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>{"// QUESTIONS & ANSWERS"}</div>
          <h2 className={styles.sectionTitle}>Frequently Asked Technical Questions</h2>
        </div>
        <FaqAccordion items={service.faqs} />
      </section>

      {/* Commercial Qualification Form */}
      <section id="intake" className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>{"// SECURE INTAKE"}</div>
          <h2 className={styles.sectionTitle}>Initiate Commerce Rescue Engagement</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            Provide your store URL and primary feed symptoms. An engineer will inspect your feed headers and respond within 24 hours.
          </p>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <CommercialInquiryForm
            defaultService="commerce-rescue"
            sourceContext="Commerce Rescue Product Page"
          />
        </div>
      </section>
    </main>
  );
}
