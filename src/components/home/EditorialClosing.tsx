import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import styles from "./editorial-closing.module.css";

export default function EditorialClosing() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "nuuvixx@gmail.com";

  return (
    <section className={styles.section} aria-label="Nuuvixx Philosophy & Project Inquiry">
      <div className={styles.container}>
        {/* Philosophy Block: Rich Aubergine Surface */}
        <div className={styles.philosophyBlock}>
          <div className={styles.kicker}>
            <span className={styles.kickerDot} aria-hidden="true" />
            <span>POINT OF VIEW</span>
          </div>

          <blockquote className={styles.quote}>
            &ldquo;Good technology should make difficult work feel simpler.&rdquo;
          </blockquote>

          <p className={styles.philosophyText}>
            We reject the idea that modern AI engineering requires unreadable black boxes, unverified adoption metrics, or fragile prototypes. We build software with clear architectural boundaries, rigorous test coverage, and transparent operational control.
          </p>
        </div>

        {/* Closing Action Block */}
        <div className={styles.actionBlock}>
          <div className={styles.actionContent}>
            <span className={styles.actionKicker}>INITIATE AN ENGAGEMENT</span>
            <h2 className={styles.actionTitle}>Have something difficult to solve?</h2>
            <p className={styles.actionSubtitle}>
              Whether you need to audit an existing Google Merchant Center feed, secure an AI application before launch, or explore a scoped pilot project.
            </p>
          </div>

          <div className={styles.actionButtons}>
            <Link href="/studio/contact" className={styles.primaryCta}>
              <span>Start a project</span>
              <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
            <Link href="/studio" className={styles.secondaryCta}>
              <span>Explore all services</span>
            </Link>
          </div>
        </div>

        {/* Direct Email Line */}
        <div className={styles.emailStrip}>
          <span className={styles.emailLabel}>DIRECT INQUIRIES:</span>
          <a href={`mailto:${contactEmail}`} className={styles.emailLink}>
            <Mail size={16} />
            <span>{contactEmail}</span>
          </a>
          <span className={styles.turnaroundBadge}>RESPONSE WITHIN 24 BUSINESS HOURS</span>
        </div>
      </div>
    </section>
  );
}

