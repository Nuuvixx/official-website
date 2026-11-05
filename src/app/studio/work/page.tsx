import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkle, Wrench, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import styles from "../studio.module.css";
import CommerceFeedValidatorDemo from "@/components/studio/demos/CommerceFeedValidatorDemo";
import SecureCodeAuditorDemo from "@/components/studio/demos/SecureCodeAuditorDemo";
import CreativeWorkflowDemo from "@/components/studio/demos/CreativeWorkflowDemo";
import TradeDiscrepancyDemo from "@/components/studio/demos/TradeDiscrepancyDemo";
import BidRequirementsDemo from "@/components/studio/demos/BidRequirementsDemo";

export const metadata: Metadata = {
  title: "Proof of Work & Interactive Engineering Demos — Nuuvixx Studio",
  description: "Test live interactive engineering prototypes and inspect our exact audit methodology across ecommerce feeds, AI code security, trade reconciliation, and tender parsing.",
};

export default function StudioWorkPage() {
  return (
    <main className={styles.studioMain}>
      {/* Header */}
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <Wrench size={14} weight="fill" />
          {"// Verification & Proof of Work"}
        </div>
        <h1 className={styles.heroTitle}>
          Working Code Over <br />
          <span className={styles.textVolt}>Vague Marketing Promises.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          We do not publish fabricated client logos or unverified testimonials. Instead, we provide
          fully functional interactive engineering sandboxes with synthetic data so you can test our diagnostic engines directly.
        </p>
        <div className={styles.heroCtas}>
          <a href="#workbenches" className={styles.primaryCta}>
            Explore Interactive Sandboxes <ArrowRight size={16} weight="bold" />
          </a>
          <Link href="/studio/contact" className={styles.secondaryCta}>
            Commission Custom Project
          </Link>
        </div>
      </header>

      {/* Methodology Standards */}
      <section className={styles.section}>
        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle}>
              <Sparkle size={22} weight="fill" color="var(--color-volt)" />
              Our Proof of Competence Standard
            </h3>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "16px" }}>
              Every commercial offering at Nuuvixx is rooted in deterministic algorithms, explicit data schemas, and senior engineer review. Before charging for any service, we build reproducible tooling that tests for failure points automatically.
            </p>
            <ul className={styles.scopeList}>
              <li className={styles.scopeIncludedItem}>
                <span className={styles.featureBullet}>✓</span>
                <span><strong>Synthetic Test Fixtures:</strong> Realistic edge cases simulating actual production failures.</span>
              </li>
              <li className={styles.scopeIncludedItem}>
                <span className={styles.featureBullet}>✓</span>
                <span><strong>Transparent Code Patches:</strong> Deliverables you can inspect, diff, and verify before deployment.</span>
              </li>
              <li className={styles.scopeIncludedItem}>
                <span className={styles.featureBullet}>✓</span>
                <span><strong>No Vendor Lock-In:</strong> Solutions engineered to integrate into your existing Git repos or Shopify stores.</span>
              </li>
            </ul>
          </div>

          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle}>
              <ShieldCheck size={22} weight="fill" color="#7ECFF4" />
              Ethics &amp; Accuracy Commitment
            </h3>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "16px" }}>
              In an industry plagued by exaggerated AI claims and stock photography, Nuuvixx guarantees complete transparency:
            </p>
            <ul className={styles.scopeList}>
              <li className={styles.scopeIncludedItem}>
                <span style={{ color: "#7ECFF4", fontWeight: 700 }}>—</span>
                <span>We do not claim automated regulatory compliance certifications (e.g. SOC2, FDA, or legal customs clearance).</span>
              </li>
              <li className={styles.scopeIncludedItem}>
                <span style={{ color: "#7ECFF4", fontWeight: 700 }}>—</span>
                <span>We clearly distinguish implemented tools from future software roadmaps.</span>
              </li>
              <li className={styles.scopeIncludedItem}>
                <span style={{ color: "#7ECFF4", fontWeight: 700 }}>—</span>
                <span>We respect IP boundaries and operate under mutual NDAs for client engagements.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Five Interactive Workbenches */}
      <section id="workbenches" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{"// FIVE INTERACTIVE WORKBENCHES"}</div>
          <h2 className={styles.sectionTitle}>Test Our Engineering Pipelines in Real-Time</h2>
          <p className={styles.sectionSubtitle}>
            Click &ldquo;Run&rdquo; on any sandbox below to see how our engines parse raw feeds, vulnerable codebases, video scripts, logistics documents, and public tenders.
          </p>
        </div>

        {/* 1. Commerce Rescue Demo */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h3 style={{ fontSize: "1.4rem", color: "#ffffff" }}>
              01. Nuuvixx Commerce Rescue
            </h3>
            <Link href="/studio/commerce" style={{ fontSize: "0.85rem", color: "var(--color-volt)" }}>
              View Division Page →
            </Link>
          </div>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginBottom: "16px" }}>
            Automated Google Merchant Center XML feed linter, GTIN identifier validator, and snake_case availability normalizer.
          </p>
          <CommerceFeedValidatorDemo />
        </div>

        {/* 2. Nuuvixx Secure Demo */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h3 style={{ fontSize: "1.4rem", color: "#ffffff" }}>
              02. Nuuvixx Secure
            </h3>
            <Link href="/studio/secure" style={{ fontSize: "0.85rem", color: "#E5252A" }}>
              View Division Page →
            </Link>
          </div>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginBottom: "16px" }}>
            Supabase Row Level Security policy auditor and unauthenticated Next.js Server Action analyzer.
          </p>
          <SecureCodeAuditorDemo />
        </div>

        {/* 3. Nuuvixx Creative Demo */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h3 style={{ fontSize: "1.4rem", color: "#ffffff" }}>
              03. Nuuvixx Creative
            </h3>
            <Link href="/studio/creative" style={{ fontSize: "0.85rem", color: "#FF6B47" }}>
              View Division Page →
            </Link>
          </div>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginBottom: "16px" }}>
            AI-assisted commercial ad script, visual hook storyboard, and motion sound design pipeline.
          </p>
          <CreativeWorkflowDemo />
        </div>

        {/* 4. Trade Intelligence Demo */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h3 style={{ fontSize: "1.4rem", color: "#ffffff" }}>
              04. Nuuvixx Trade Intelligence
            </h3>
            <Link href="/studio/trade" style={{ fontSize: "0.85rem", color: "#7ECFF4" }}>
              View Division Page →
            </Link>
          </div>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginBottom: "16px" }}>
            Multi-document cross-reconciliation between Commercial Invoices, Packing Lists, and Bill of Lading records.
          </p>
          <TradeDiscrepancyDemo />
        </div>

        {/* 5. Bid Intelligence Demo */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h3 style={{ fontSize: "1.4rem", color: "#ffffff" }}>
              05. Nuuvixx Bid Intelligence
            </h3>
            <Link href="/studio/bids" style={{ fontSize: "0.85rem", color: "#CCFF00" }}>
              View Division Page →
            </Link>
          </div>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginBottom: "16px" }}>
            RFP clause extraction, mandatory pass/fail qualification filtering, and compliance matrix builder.
          </p>
          <BidRequirementsDemo />
        </div>
      </section>

      {/* CTA */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>{"// ENGAGE OUR FOUNDING ENGINEERS"}</div>
          <h2 className={styles.sectionTitle}>Ready to Deploy These Systems for Your Business?</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto 24px" }}>
            We work with international ecommerce stores, AI startups, exporters, and government contractors on fixed-scope deliverables.
          </p>
          <Link href="/studio/contact" className={styles.primaryCta}>
            Submit Commercial Qualification Brief <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>
    </main>
  );
}
