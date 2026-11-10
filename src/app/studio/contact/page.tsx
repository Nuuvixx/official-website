import type { Metadata } from "next";
import { Mail, ShieldCheck, CheckCircle2, Clock } from "lucide-react";
import styles from "../studio.module.css";
import CommercialInquiryForm from "@/components/studio/CommercialInquiryForm";

export const metadata: Metadata = {
  title: "Contact & Project Qualification — Nuuvixx Studio",
  description: "Direct project qualification with Nuuvixx founding engineers. Fixed-scope audits, security reviews, creative packages, and trade automation.",
};

export default function StudioContactPage() {
  return (
    <main className={styles.studioMain}>
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <Clock size={14} />
          <span>Direct Engineering Intake</span>
        </div>
        <h1 className={styles.heroTitle}>
          Start a project with <br />
          <span className={styles.textVolt}>Nuuvixx Studio.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Whether you need a Google Merchant Center feed repair, a security audit, commercial ad creatives, or cross-border document reconciliation, submit your requirements below for direct scoping.
        </p>
      </header>

      <section className={styles.section}>
        <div className={styles.twoColGrid}>
          {/* Left: What to Expect */}
          <div>
            <div className={styles.boxCard} style={{ marginBottom: "24px" }}>
              <h3 className={styles.boxTitle}>
                <CheckCircle2 size={20} color="var(--color-orange)" />
                <span>What happens next</span>
              </h3>
              <ul className={styles.scopeList}>
                <li className={styles.scopeIncludedItem}>
                  <span className={styles.featureBullet}>1.</span>
                  <span><strong>Review:</strong> We read your request and identify the information needed to define the work.</span>
                </li>
                <li className={styles.scopeIncludedItem}>
                  <span className={styles.featureBullet}>2.</span>
                  <span><strong>Scope:</strong> We agree on the deliverables, timeline and price before work starts.</span>
                </li>
                <li className={styles.scopeIncludedItem}>
                  <span className={styles.featureBullet}>3.</span>
                  <span><strong>Confidentiality:</strong> Ask about an NDA before sharing private repositories or documents.</span>
                </li>
                <li className={styles.scopeIncludedItem}>
                  <span className={styles.featureBullet}>4.</span>
                  <span><strong>Delivery:</strong> The agreed work is reviewed with you against the defined scope.</span>
                </li>
              </ul>
            </div>

            <div className={styles.boxCard}>
              <h3 className={styles.boxTitle}>
                <ShieldCheck size={20} color="var(--color-ink)" />
                <span>Direct communication</span>
              </h3>
              <p style={{ color: "var(--color-muted)", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "16px" }}>
                Prefer to email directly? Send your inquiry or request an NDA directly to our founding engineering desk:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a
                  href="mailto:hello@nuuvixx.com"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--color-accent-text)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <Mail size={16} />
                  <span>hello@nuuvixx.com</span>
                </a>
                <span style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
                  Operating across US, European, and Asian business hours.
                </span>
              </div>
            </div>
          </div>

          {/* Right: The Intake Form */}
          <div>
            <CommercialInquiryForm sourceContext="Dedicated Studio Contact Page" />
          </div>
        </div>
      </section>
    </main>
  );
}
