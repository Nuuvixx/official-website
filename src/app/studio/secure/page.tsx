import type { Metadata } from "next";
import { ArrowRight, CheckCircle, Warning, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import styles from "../studio.module.css";
import { STUDIO_SERVICES } from "@/data/studioServices";
import CommercialInquiryForm from "@/components/studio/CommercialInquiryForm";
import FaqAccordion from "@/components/studio/FaqAccordion";
import SecureCodeAuditorDemo from "@/components/studio/demos/SecureCodeAuditorDemo";

const service = STUDIO_SERVICES.find((s) => s.slug === "secure")!;

export const metadata: Metadata = {
  title: "Nuuvixx Secure — Code Security Audits for AI SaaS & Vibe-Coded Apps",
  description: "Specialized code reviews for AI SaaS founders building with Cursor, Bolt, and Supabase. Fix permissive RLS policies, leaked API keys, and insecure Server Actions.",
};

export default function NuuvixxSecurePage() {
  return (
    <main className={styles.studioMain}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <ShieldCheck size={14} weight="fill" />
          {"// "} {service.division}
        </div>
        <h1 className={styles.heroTitle}>
          Code-Level Security Audits for <br />
          <span className={styles.textVolt}>AI SaaS &amp; Vibe-Coded Stacks.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          {service.description}
        </p>
        <div className={styles.heroCtas}>
          <a href="#intake" className={styles.primaryCta}>
            Schedule Security Review ({service.introPricing.range}) <ArrowRight size={16} weight="bold" />
          </a>
          <a href="#demo" className={styles.secondaryCta}>
            Try Live RLS Security Inspector
          </a>
        </div>
      </header>

      {/* Interactive Tool Section */}
      <section id="demo" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{"// LIVE INTERACTIVE TOOL"}</div>
          <h2 className={styles.sectionTitle}>Interactive Static Security &amp; RLS Analyzer</h2>
          <p className={styles.sectionSubtitle}>
            Run our vulnerability scanner against a real-world vulnerable Next.js + Supabase application snippet to see the exact access control issues we detect.
          </p>
        </div>
        <SecureCodeAuditorDemo />
      </section>

      {/* Target Customers & Critical Problems */}
      <section className={styles.section}>
        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle}>
              <CheckCircle size={22} weight="fill" color="var(--color-volt)" />
              Who Nuuvixx Secure Is Built For
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
              <Warning size={22} weight="fill" color="#ff4444" />
              Common AI-Generated Vulnerabilities We Catch
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
          <div className={styles.sectionEyebrow}>{"// AUDIT DELIVERABLES & BOUNDARIES"}</div>
          <h2 className={styles.sectionTitle}>Remediation Guidance with Actionable Pull Requests</h2>
          <p className={styles.sectionSubtitle}>
            We do not just hand you a terrifying PDF. We supply the exact SQL migration scripts, middleware guards, and environment isolations needed to secure your app.
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
              Explicit Scope Exclusions
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
              <strong>Zero-Trust Guarantee:</strong> Reviews are performed under strict NDA. We never store proprietary code on shared cloud disks or feed client code to external public model training sets.
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{"// FOUR-STAGE AUDIT TIMELINE"}</div>
          <h2 className={styles.sectionTitle}>From Permissioned Checkout to Hardened Production</h2>
          <p className={styles.sectionSubtitle}>
            Engineered for rapid 48-hour turnarounds before customer onboarding or investor demos.
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
        <div className={styles.boxCard} style={{ borderColor: "rgba(229, 37, 42, 0.4)", background: "rgba(229, 37, 42, 0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <span className={styles.sectionEyebrow}>INTRODUCTORY PACKAGES</span>
              <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginTop: "4px" }}>
                {service.introPricing.range} <span style={{ fontSize: "1rem", color: "var(--color-text-secondary)", fontWeight: 400 }}>/ {service.introPricing.model}</span>
              </h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", maxWidth: "600px", marginTop: "8px" }}>
                {service.introPricing.note}
              </p>
              <div style={{ marginTop: "16px", fontSize: "0.85rem", color: "var(--color-volt)" }}>
                <strong>Continuous Security SaaS Roadmap:</strong> {service.futureRoadmap}
              </div>
            </div>
            <a href="#intake" className={styles.primaryCta} style={{ marginTop: "12px", background: "#E5252A", color: "#ffffff" }}>
              Secure Your AI App →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>{"// FREQUENTLY ASKED QUESTIONS"}</div>
          <h2 className={styles.sectionTitle}>Security Review Details</h2>
        </div>
        <FaqAccordion items={service.faqs} />
      </section>

      {/* Commercial Qualification Form */}
      <section id="intake" className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>{"// CONFIDENTIAL QUALIFICATION"}</div>
          <h2 className={styles.sectionTitle}>Request Code Security Review</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            Share your repository framework and database stack. We will provide an NDA and scoped checklist within 24 hours.
          </p>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <CommercialInquiryForm
            defaultService="nuuvixx-secure"
            sourceContext="Nuuvixx Secure Product Page"
          />
        </div>
      </section>
    </main>
  );
}
