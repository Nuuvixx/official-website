"use client";

import { useState, useMemo } from "react";
import {
  FileText,
  ShieldCheck,
  FileCsv,
  ArrowRight,
  Scales,
} from "@phosphor-icons/react";
import styles from "./demos.module.css";
import {
  extractTenderRequirements,
  generateBidMatrixCsv,
} from "@/lib/bids/extractor";
import {
  ALL_SAMPLE_TENDERS,
  SAMPLE_TRANSIT_RFP,
} from "@/lib/bids/sampleTenders";
import { TenderAnalysisResult } from "@/lib/bids/types";

export default function BidRequirementsDemo() {
  const [selectedTenderId, setSelectedTenderId] = useState(SAMPLE_TRANSIT_RFP.id);
  const [content, setContent] = useState(SAMPLE_TRANSIT_RFP.content);
  const [activeFilename, setActiveFilename] = useState(SAMPLE_TRANSIT_RFP.filename);
  const [categoryFilter, setCategoryFilter] = useState<"all" | "mandatory" | "financial" | "legal">("all");

  const analysis: TenderAnalysisResult = useMemo(() => {
    return extractTenderRequirements(content, activeFilename);
  }, [content, activeFilename]);

  const handleSelectTender = (id: string) => {
    const found = ALL_SAMPLE_TENDERS.find((t) => t.id === id);
    if (found) {
      setSelectedTenderId(found.id);
      setContent(found.content);
      setActiveFilename(found.filename);
    }
  };

  const handleDownloadCsv = () => {
    const csvContent = generateBidMatrixCsv(analysis);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bid-compliance-matrix-${analysis.metadata.rfpNumber || "export"}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredCriteria = analysis.criteria.filter((c) => {
    if (categoryFilter === "mandatory") return c.isPassFail;
    if (categoryFilter === "financial") return c.category === "financial_compliance";
    if (categoryFilter === "legal") return c.category === "legal_terms";
    return true;
  });

  const activeTenderMeta = ALL_SAMPLE_TENDERS.find((t) => t.id === selectedTenderId);

  return (
    <div className={styles.demoContainer}>
      {/* Header */}
      <div className={styles.demoHeader}>
        <div className={styles.demoTitleRow}>
          <span className={styles.demoBadge}>Deterministic Parser</span>
          <h4 className={styles.demoTitle}>
            Bid Intelligence: RFP Qualification Parser &amp; Compliance Matrix
          </h4>
        </div>
        <div className={styles.demoControls}>
          {ALL_SAMPLE_TENDERS.map((tender) => (
            <button
              key={tender.id}
              type="button"
              className={`${styles.presetBtn} ${
                selectedTenderId === tender.id ? styles.presetBtnActive : ""
              }`}
              onClick={() => handleSelectTender(tender.id)}
            >
              {tender.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.demoBody}>
        {/* Zero Data Leak Privacy Notice */}
        <div className={styles.privacyBanner}>
          <ShieldCheck size={16} weight="fill" color="#52C41A" />
          <span>
            <strong>Client-Side Document Extraction:</strong> RFP documents are parsed deterministically in your browser memory. Confidential tender documents are never uploaded to third-party services.
          </span>
        </div>

        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "8px" }}>
          Target Document: <code>{activeFilename}</code> — {activeTenderMeta?.description}
        </p>

        {/* Document Editor */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.codeTextarea}
          rows={9}
          spellCheck={false}
          placeholder="Paste RFP / Tender text excerpt here..."
        />

        {/* Scorecard */}
        <div className={styles.scorecard}>
          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>RFP Number</div>
            <div className={styles.scoreValue} style={{ fontSize: "0.95rem", color: analysis.metadata.rfpNumber ? "var(--color-orange)" : "#A6A095" }}>
              {analysis.metadata.rfpNumber || "Not found in excerpt"}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Document reference
            </div>
          </div>

          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Pass/Fail Gates</div>
            <div className={`${styles.scoreValue} ${analysis.passFailCount > 0 ? styles.scoreValueCritical : styles.scoreValueSuccess}`} style={{ fontSize: "0.95rem" }}>
              {analysis.passFailCount} Detected
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Requires human review
            </div>
          </div>

          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Submission Cutoff</div>
            <div className={styles.scoreValue} style={{ fontSize: "0.85rem", fontWeight: 600, color: analysis.metadata.submissionDeadline ? "#FFFFFF" : "#A6A095" }}>
              {analysis.metadata.submissionDeadline ? "EXTRACTED" : "Not found in text"}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Verify in RFP addenda
            </div>
          </div>

          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>EMD / Bid Bond</div>
            <div className={styles.scoreValue} style={{ fontSize: "0.85rem", color: analysis.metadata.earnestMoneyDeposit ? "#FFA940" : "#A6A095" }}>
              {analysis.metadata.earnestMoneyDeposit ? "CLAUSE DETECTED" : "Not found in text"}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Surety instrument check
            </div>
          </div>
        </div>

        {/* Boundary & Legal Scope Disclosure */}
        <div style={{ marginBottom: "16px", padding: "10px 14px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "4px", fontSize: "0.78rem", color: "#A6A095", lineHeight: 1.5 }}>
          <strong style={{ color: "#E5DFD6" }}>Procurement Analysis Notice:</strong> Clause extraction is an engineering reading aid based on typical tender patterns. It does NOT certify legal eligibility, guarantee bid responsiveness, or substitute for thorough review of complete solicitation packets. Official qualification decisions rest entirely with procuring entity contracting officers.
        </div>

        {/* Results / Compliance Matrix */}
        <div className={styles.resultsPanel}>
          <div className={styles.resultsHeader}>
            <div className={styles.statusIndicator}>
              <FileText size={18} weight="bold" color="var(--color-orange)" />
              <span style={{ color: "#FFFFFF" }}>
                Extracted {analysis.criteria.length} possible requirements ({analysis.passFailCount} marked pass/fail in text)
              </span>
            </div>

            <button
              type="button"
              className={styles.presetBtn}
              onClick={handleDownloadCsv}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <FileCsv size={16} weight="bold" />
              <span>Export Compliance Matrix (.CSV)</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            <button
              type="button"
              className={`${styles.presetBtn} ${categoryFilter === "all" ? styles.presetBtnActive : ""}`}
              onClick={() => setCategoryFilter("all")}
            >
              All Requirements ({analysis.criteria.length})
            </button>
            <button
              type="button"
              className={`${styles.presetBtn} ${categoryFilter === "mandatory" ? styles.presetBtnActive : ""}`}
              onClick={() => setCategoryFilter("mandatory")}
            >
              Mandatory Pass/Fail ({analysis.passFailCount})
            </button>
            <button
              type="button"
              className={`${styles.presetBtn} ${categoryFilter === "financial" ? styles.presetBtnActive : ""}`}
              onClick={() => setCategoryFilter("financial")}
            >
              Financial / Bond Requirements
            </button>
            <button
              type="button"
              className={`${styles.presetBtn} ${categoryFilter === "legal" ? styles.presetBtnActive : ""}`}
              onClick={() => setCategoryFilter("legal")}
            >
              Liquidated Damages &amp; Penalties
            </button>
          </div>

          {/* Criteria Cards */}
          {filteredCriteria.length === 0 ? (
            <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "4px", fontSize: "0.85rem", color: "#A6A095" }}>
              No clauses match the selected category filter.
            </div>
          ) : (
            filteredCriteria.map((criterion) => (
              <div
                key={criterion.id}
                className={`${styles.issueCard} ${
                  criterion.riskLevel === "high"
                    ? styles.issueCardCritical
                    : styles.issueCardWarning
                }`}
              >
                <div className={styles.issueHeader}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      className={
                        criterion.isPassFail ? styles.tagCritical : styles.tagWarning
                      }
                    >
                      {criterion.isPassFail ? "PASS/FAIL GATE" : criterion.category.toUpperCase()}
                    </span>
                    <span className={styles.issueTitle}>{criterion.clauseReference}</span>
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#A6A095" }}>
                    Line {criterion.lineStart}
                  </span>
                </div>

                <p className={styles.issueDesc} style={{ color: "#E5DFD6", fontWeight: 500 }}>
                  {criterion.requirementText}
                </p>

                <div className={styles.remediationBox} style={{ background: "rgba(245, 107, 37, 0.05)", borderColor: "rgba(245, 107, 37, 0.25)" }}>
                  <div className={styles.remediationTitle} style={{ color: "var(--color-orange)" }}>
                    <Scales size={14} weight="bold" />
                    <span>Compliance Action Item:</span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#D9D3CA" }}>
                    {criterion.actionItem}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* CTA Bar */}
          <div className={styles.ctaBar}>
            <div style={{ fontSize: "0.85rem", color: "#A6A095" }}>
              Need help reviewing requirements in a tender document?
            </div>
            <a href="#intake" className={styles.ctaButton}>
              <span>Request a scoped tender review</span>
              <ArrowRight size={14} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
