import type { Metadata } from "next";
import { PaperPlaneRight, ShieldCheck, Clock, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import styles from "../studio.module.css";
import CommercialInquiryForm from "@/components/studio/CommercialInquiryForm";

export const metadata: Metadata = {
  title: "Commercial Intake & Project Qualification — Nuuvixx Studio",
  description: "Direct project qualification with Nuuvixx founding engineers. Fixed-scope audits, security reviews, creative packages, and trade automation.",
};

export default function StudioContactPage() {
  return (
    <main className={styles.studioMain}>
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <Clock size={14} weight="fill" />
          {"// Direct Engineering Intake"}
        </div>
        <h1 className={styles.heroTitle}>
          Initiate a Commercial <br />
          <span className={styles.textVolt}>Project Qualification Brief.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Whether you need an urgent Google Merchant Center feed repair, a Supabase RLS security audit, commercial ad creatives, or cross-border document reconciliation, submit your requirements below for rapid qualification.
        </p>
      </header>

      <section className={styles.section}>
        <div className={styles.twoColGrid}>
          {/* Left: What to Expect */}
          <div>
            <div className={styles.boxCard} style={{ marginBottom: "24px" }}>
              <h3 className={styles.boxTitle}>
                <CheckCircle size={22} weight="fill" color="var(--color-volt)" />
                What Happens Next
              </h3>
              <ul className={styles.scopeList}>
                <li className={styles.scopeIncludedItem}>
                  <span className={styles.featureBullet}>1.</span>
                  <span><strong>24-Hour Review:</strong> A senior founding engineer personally inspects your request and runs preliminary checks on public endpoints.</span>
                </li>
                <li className={styles.scopeIncludedItem}>
                  <span className={styles.featureBullet}>2.</span>
                  <span><strong>Scoping &amp; Fixed Pricing:</strong> You receive a transparent scope statement, turnaround timeline, and fixed fee (introductory $49–$399 range).</span>
                </li>
                <li className={styles.scopeIncludedItem}>
                  <span className={styles.featureBullet}>3.</span>
                  <span><strong>Zero-Trust Onboarding:</strong> Mutual NDA executed if proprietary repository or trade documents are involved.</span>
                </li>
                <li className={styles.scopeIncludedItem}>
                  <span className={styles.featureBullet}>4.</span>
                  <span><strong>Direct Delivery:</strong> Concrete code fixes, sanitization endpoints, and verified briefs delivered to your team.</span>
                </li>
              </ul>
            </div>

            <div className={styles.boxCard}>
              <h3 className={styles.boxTitle}>
                <ShieldCheck size={22} weight="fill" color="#7ECFF4" />
                Direct Communication
              </h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "16px" }}>
                Prefer to email directly? Send your inquiry or request an NDA directly to our founding engineering desk:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  href="mailto:hello@nuuvixx.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--color-volt)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  <PaperPlaneRight size={18} />
                  hello@nuuvixx.com
                </a>
                <span style={{ fontSize: "0.8rem", color: "var(--color-text-tertiary)" }}>
                  Operating globally across US, European, and Asian business hours.
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
