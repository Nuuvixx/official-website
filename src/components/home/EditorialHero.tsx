"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HeroSculpture from "./HeroSculpture";
import styles from "./editorial-hero.module.css";

export default function EditorialHero() {
  return (
    <section className={styles.heroSection} aria-label="Nuuvixx Studio Introduction">
      <div className={styles.container}>
        {/* Left Content Area: Headline, Subcopy & CTAs */}
        <div className={styles.contentCol}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowText}>Nuuvixx Studio</span>
            <span className={styles.eyebrowHairline} aria-hidden="true" />
          </div>

          <h1 className={styles.headline}>
            <span className={styles.headLine}>ENGINEERING</span>
            <span className={styles.headLine}>SYSTEMS</span>
            <span className={styles.headLine}>
              THAT <span className={styles.orangeWork}>WORK</span>
            </span>
          </h1>

          <p className={styles.subcopy}>
            A product engineering studio that designs, builds, and operates reliable systems for commerce, trade, and procurement.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/studio" className={styles.primaryBtn}>
              <span>Explore Services</span>
              <ArrowUpRight size={15} strokeWidth={2.2} className={styles.btnArrow} />
            </Link>
            <Link href="/labs" className={styles.secondaryBtn}>
              <span>Our Labs</span>
            </Link>
          </div>
        </div>

        {/* The approved transparent sculpture shares the hero canvas with the type. */}
        <div className={styles.artworkLayer} aria-hidden="true">
          <HeroSculpture />
          <div className={styles.artworkLabels}>
            <span className={`${styles.artworkLabel} ${styles.labelCommerce}`}>Commerce Rescue</span>
            <span className={`${styles.artworkLabel} ${styles.labelSecure}`}>Nuuvixx Secure</span>
            <span className={`${styles.artworkLabel} ${styles.labelCreative}`}>Nuuvixx Creative</span>
            <span className={`${styles.artworkLabel} ${styles.labelTrade}`}>Trade Intelligence</span>
            <span className={`${styles.artworkLabel} ${styles.labelBids}`}>Bid Intelligence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
