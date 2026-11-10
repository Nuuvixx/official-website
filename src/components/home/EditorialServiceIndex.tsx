"use client";

import React from "react";
import Link from "next/link";
import { 
  ShoppingCart, 
  ShieldCheck, 
  Play, 
  Layers, 
  Gavel, 
  ArrowRight,
  ArrowUpRight 
} from "lucide-react";
import styles from "./editorial-service-index.module.css";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  isFeatured?: boolean;
}

const services: ServiceItem[] = [
  {
    id: "commerce-rescue",
    title: "Commerce Rescue",
    description: "Find feed errors and plan a focused repair.",
    href: "/studio/commerce",
    icon: ShoppingCart,
    isFeatured: true, // The single orange panel in the locked reference
  },
  {
    id: "nuuvixx-secure",
    title: "Nuuvixx Secure",
    description: "Review defined code risks and scope remediation.",
    href: "/studio/secure",
    icon: ShieldCheck,
  },
  {
    id: "nuuvixx-creative",
    title: "Nuuvixx Creative",
    description: "Turn a campaign idea into a production brief.",
    href: "/studio/creative",
    icon: Play,
  },
  {
    id: "trade-intelligence",
    title: "Trade Intelligence",
    description: "Compare trade records and surface mismatches.",
    href: "/studio/trade",
    icon: Layers,
  },
  {
    id: "bid-intelligence",
    title: "Bid Intelligence",
    description: "Extract requirements into a review checklist.",
    href: "/studio/bids",
    icon: Gavel,
  },
];

export default function EditorialServiceIndex() {
  return (
    <section id="services" className={styles.section} aria-label="Nuuvixx Commercial Services">
      {/* Precision Grid Crosshairs */}
      <div className={styles.crosshairLeft} aria-hidden="true">+</div>
      <div className={styles.crosshairRight} aria-hidden="true">+</div>

      <div className={styles.container}>
        <div className={styles.railLayout}>
          {/* Left Title Label: "Services ->" */}
          <div className={styles.labelCol}>
            <span className={styles.labelText}>Services</span>
            <ArrowRight size={20} strokeWidth={1.5} className={styles.labelArrow} />
          </div>

          {/* 5-Column Editorial Services Grid */}
          <div className={styles.servicesGrid} role="list">
            {services.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`${styles.card} ${item.isFeatured ? styles.cardFeatured : ""}`}
                  role="listitem"
                >
                  <div className={styles.cardHeader}>
                    <Icon size={20} strokeWidth={1.75} className={styles.cardIcon} />
                  </div>

                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>
                      <span>{item.title}</span>
                      <ArrowUpRight size={15} strokeWidth={2} className={styles.cardArrow} />
                    </h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
