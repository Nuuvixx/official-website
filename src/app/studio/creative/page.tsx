import type { Metadata } from "next";
import { ArrowRight, CheckCircle, Warning, VideoCamera } from "@phosphor-icons/react/dist/ssr";
import styles from "../studio.module.css";
import { STUDIO_SERVICES } from "@/data/studioServices";
import CommercialInquiryForm from "@/components/studio/CommercialInquiryForm";
import FaqAccordion from "@/components/studio/FaqAccordion";
import CreativeWorkflowDemo from "@/components/studio/demos/CreativeWorkflowDemo";

const service = STUDIO_SERVICES.find((s) => s.slug === "creative")!;

export const metadata: Metadata = {
  title: "Nuuvixx Creative — AI Commercial Video Production & Campaign Variations",
  description: "High-impact commercial video ads, kinetic product demonstrations, and multi-hook creative variations for ecommerce and SaaS brands.",
};

export default function NuuvixxCreativePage() {
  return (
    <main className={styles.studioMain}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <VideoCamera size={14} weight="fill" />
          {"// "} {service.division}
        </div>
        <h1 className={styles.heroTitle}>
          AI-Augmented Video Ads &amp; <br />
          <span className={styles.textVolt}>High-Velocity Campaign Creatives.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          {service.description}
        </p>
        <div className={styles.heroCtas}>
          <a href="#intake" className={styles.primaryCta}>
            Commission Creative Package ({service.introPricing.range}) <ArrowRight size={16} weight="bold" />
          </a>
          <a href="#demo" className={styles.secondaryCta}>
            Explore Ad Pipeline &amp; Hooks
          </a>
        </div>
      </header>

      {/* Interactive Tool Section */}
      <section id="demo" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{"// LIVE INTERACTIVE TOOL"}</div>
          <h2 className={styles.sectionTitle}>Interactive Commercial Ad &amp; Storyboard Pipeline</h2>
          <p className={styles.sectionSubtitle}>
            Test how our creative director pipeline analyzes a raw product brief to generate pain-hook sequences, visual storyboards, and audio cues.
          </p>
        </div>
        <CreativeWorkflowDemo />
      </section>

      {/* Target Customers & Critical Problems */}
      <section className={styles.section}>
        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle}>
              <CheckCircle size={22} weight="fill" color="var(--color-volt)" />
              Who Nuuvixx Creative Serves
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
              Overcoming Performance Creative Bottlenecks
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
          <div className={styles.sectionEyebrow}>{"// DELIVERABLES & PRODUCTION POLICIES"}</div>
          <h2 className={styles.sectionTitle}>Production Ad Assets Ready for Media Buying</h2>
          <p className={styles.sectionSubtitle}>
            Every package is delivered fully edited, audio-mixed, graded, and formatted for TikTok, Meta Ads Manager, and YouTube Shorts.
          </p>
        </div>

        <div className={styles.twoColGrid}>
          <div className={styles.boxCard}>
            <h3 className={styles.boxTitle} style={{ color: "#00e676" }}>
              Included in Every Production Run
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
              Strict Creative Ethics &amp; Exclusions
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
              <strong>Commercial Licensing Guarantee:</strong> All fonts, voiceovers, music tracks, sound effects, and generated media elements are 100% royalty-free and licensed for worldwide digital ad broadcasting.
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{"// PRODUCTION TIMELINE"}</div>
          <h2 className={styles.sectionTitle}>From Product Brief to Ad Network Deployment</h2>
          <p className={styles.sectionSubtitle}>
            Our agile pipeline produces launch-ready video ad variations within 3 to 5 business days.
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
        <div className={styles.boxCard} style={{ borderColor: "rgba(255, 107, 71, 0.4)", background: "rgba(255, 107, 71, 0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <span className={styles.sectionEyebrow}>INTRODUCTORY AD PACKAGES</span>
              <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginTop: "4px" }}>
                {service.introPricing.range} <span style={{ fontSize: "1rem", color: "var(--color-text-secondary)", fontWeight: 400 }}>/ {service.introPricing.model}</span>
              </h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", maxWidth: "600px", marginTop: "8px" }}>
                {service.introPricing.note}
              </p>
              <div style={{ marginTop: "16px", fontSize: "0.85rem", color: "var(--color-volt)" }}>
                <strong>Platform Roadmap:</strong> {service.futureRoadmap}
              </div>
            </div>
            <a href="#intake" className={styles.primaryCta} style={{ marginTop: "12px", background: "#FF6B47", color: "#ffffff" }}>
              Order Creative Package →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>{"// PRODUCTION QUESTIONS"}</div>
          <h2 className={styles.sectionTitle}>Frequently Asked Creative Questions</h2>
        </div>
        <FaqAccordion items={service.faqs} />
      </section>

      {/* Commercial Qualification Form */}
      <section id="intake" className={styles.section}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>{"// START PRODUCTION"}</div>
          <h2 className={styles.sectionTitle}>Commission Ad Creative Campaign</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            Share your product link and creative goals. Our creative director will review your assets and provide concept options.
          </p>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <CommercialInquiryForm
            defaultService="nuuvixx-creative"
            sourceContext="Nuuvixx Creative Product Page"
          />
        </div>
      </section>
    </main>
  );
}
