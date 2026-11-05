"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ShoppingCart, ShieldCheck, VideoCamera, Scales, FileText, Sparkle, Flask } from "@phosphor-icons/react";
import { STUDIO_SERVICES } from "@/data/studioServices";

type PhosphorIcon = React.ComponentType<{
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  color?: string;
  style?: React.CSSProperties;
}>;

const iconMap: Record<string, PhosphorIcon> = {
  "commerce-rescue": ShoppingCart,
  "nuuvixx-secure": ShieldCheck,
  "nuuvixx-creative": VideoCamera,
  "trade-intelligence": Scales,
  "bid-intelligence": FileText,
};

export default function StudioPillarsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section ref={containerRef} style={{ padding: "100px 24px", maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: "50px" }}
      >
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "var(--color-volt)",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginBottom: "12px",
        }}>
          <Sparkle size={14} weight="fill" />
          {"// DUAL-PILLAR ARCHITECTURE"}
        </div>
        <h2 style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: "-0.03em",
          marginBottom: "16px",
          lineHeight: 1.15,
        }}>
          Two Pillars. <span style={{ color: "var(--color-volt)" }}>One Engineering Standard.</span>
        </h2>
        <p style={{
          color: "var(--color-text-secondary)",
          fontSize: "1.1rem",
          maxWidth: "760px",
          margin: "0 auto",
          lineHeight: 1.6,
        }}>
          Nuuvixx bridges foundational open-source agent infrastructure with commercial software engineering.
        </p>
      </motion.div>

      {/* Dual Pillar Comparison Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "24px",
        marginBottom: "60px",
      }}>
        {/* Pillar 1: Nuuvixx Labs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "rgba(10, 10, 14, 0.85)",
            border: "1px solid rgba(126, 207, 244, 0.2)",
            borderRadius: "20px",
            padding: "36px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <Flask size={24} weight="duotone" color="#7ecff4" />
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "0.8rem", color: "#7ecff4", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              RESEARCH &amp; OPEN SOURCE
            </span>
          </div>
          <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginBottom: "12px", fontWeight: 700 }}>
            Nuuvixx Labs
          </h3>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "24px" }}>
            The substrate beneath autonomous intelligence. We develop, benchmark, and open-source production-grade agent runtimes, manifest audit toolchains, and real-time execution telemetry.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
            <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "6px", color: "#ffffff" }}>AgentVerse Console</span>
            <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "6px", color: "#ffffff" }}>AgentStore Registry</span>
            <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "6px", color: "#ffffff" }}>BugPulse Telemetry</span>
          </div>
          <Link
            href="/labs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#7ecff4",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Explore Labs Runtimes &amp; Experiments <ArrowRight size={14} weight="bold" />
          </Link>
        </motion.div>

        {/* Pillar 2: Nuuvixx Studio */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "rgba(10, 10, 14, 0.85)",
            border: "1px solid rgba(255, 107, 44, 0.3)",
            borderRadius: "20px",
            padding: "36px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <Sparkle size={24} weight="duotone" color="var(--color-volt)" />
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "0.8rem", color: "var(--color-volt)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              COMMERCIAL ENGINEERING
            </span>
          </div>
          <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginBottom: "12px", fontWeight: 700 }}>
            Nuuvixx Studio
          </h3>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "24px" }}>
            Precision engineering for high-stakes digital operations. We deliver fixed-scope catalog remediation, code-level security audits, AI video production, and cross-border document validation.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
            <span style={{ fontSize: "12px", background: "rgba(255,107,44,0.1)", padding: "4px 10px", borderRadius: "6px", color: "var(--color-volt)" }}>Commerce Rescue</span>
            <span style={{ fontSize: "12px", background: "rgba(255,107,44,0.1)", padding: "4px 10px", borderRadius: "6px", color: "var(--color-volt)" }}>Nuuvixx Secure</span>
            <span style={{ fontSize: "12px", background: "rgba(255,107,44,0.1)", padding: "4px 10px", borderRadius: "6px", color: "var(--color-volt)" }}>Trade Intelligence</span>
          </div>
          <Link
            href="/studio"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--color-volt)",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Explore Commercial Studio &amp; Solutions <ArrowRight size={14} weight="bold" />
          </Link>
        </motion.div>
      </div>

      {/* Commercial Divisions Grid */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h3 style={{ fontSize: "1.8rem", color: "#ffffff", fontWeight: 700, marginBottom: "8px" }}>
          Five Specialized Commercial Divisions
        </h3>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
          Fixed-scope deliverables with transparent pricing ($49–$399) and senior engineer execution.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginBottom: "40px",
      }}>
        {STUDIO_SERVICES.map((s, idx) => {
          const Icon = iconMap[s.id] || Sparkle;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "rgba(10, 10, 14, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "11px",
                    padding: "3px 8px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "4px",
                    color: "var(--color-text-secondary)",
                    textTransform: "uppercase",
                  }}>
                    {s.badge}
                  </span>
                  <Icon size={20} weight="duotone" style={{ color: s.accentColor }} />
                </div>
                <h4 style={{ fontSize: "1.15rem", color: "#ffffff", fontWeight: 700, marginBottom: "8px" }}>
                  {s.name}
                </h4>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "16px" }}>
                  {s.tagline}
                </p>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "0.85rem", color: "var(--color-volt)", fontWeight: 700 }}>
                  {s.introPricing.range}
                </span>
                <Link
                  href={`/studio/${s.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.85rem",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Details <ArrowRight size={12} weight="bold" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Proof of work callout banner */}
      <div style={{
        background: "rgba(255, 107, 44, 0.04)",
        border: "1px solid rgba(255, 107, 44, 0.2)",
        borderRadius: "16px",
        padding: "24px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div>
          <h4 style={{ fontSize: "1.1rem", color: "#ffffff", marginBottom: "4px" }}>
            Want to test our diagnostic engines before contacting us?
          </h4>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.88rem" }}>
            Try our interactive workbenches for feed auditing, Supabase RLS security, trade discrepancy, and RFP parsing.
          </p>
        </div>
        <Link
          href="/studio/work"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--color-volt)",
            color: "#000000",
            fontWeight: 700,
            fontSize: "0.85rem",
            padding: "10px 20px",
            borderRadius: "9999px",
            textDecoration: "none",
          }}
        >
          Open Interactive Tools <ArrowRight size={14} weight="bold" />
        </Link>
      </div>
    </section>
  );
}
