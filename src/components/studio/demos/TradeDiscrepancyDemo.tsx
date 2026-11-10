"use client";

import { useState, useMemo } from "react";
import {
  ShieldCheck,
  FileCsv,
  ArrowRight,
  Scales,
  ArrowsLeftRight,
} from "@phosphor-icons/react";
import styles from "./demos.module.css";
import {
  reconcileTradeDocuments,
  generateTradeReconciliationCsv,
} from "@/lib/trade/reconciler";
import {
  ALL_SAMPLE_TRADE_PAIRS,
  SAMPLE_DISCREPANT_TRADE,
} from "@/lib/trade/sampleTradeDocs";
import { TradeReconciliationResult } from "@/lib/trade/types";

export default function TradeDiscrepancyDemo() {
  const [selectedPairId, setSelectedPairId] = useState(SAMPLE_DISCREPANT_TRADE.id);
  const [invoiceText, setInvoiceText] = useState(SAMPLE_DISCREPANT_TRADE.invoice);
  const [packingListText, setPackingListText] = useState(SAMPLE_DISCREPANT_TRADE.packingList);

  const result: TradeReconciliationResult = useMemo(() => {
    return reconcileTradeDocuments(invoiceText, packingListText);
  }, [invoiceText, packingListText]);

  const handleSelectPreset = (id: string) => {
    const found = ALL_SAMPLE_TRADE_PAIRS.find((p) => p.id === id);
    if (found) {
      setSelectedPairId(found.id);
      setInvoiceText(found.invoice);
      setPackingListText(found.packingList);
    }
  };

  const handleDownloadCsv = () => {
    const csvContent = generateTradeReconciliationCsv(result);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `trade-reconciliation-${result.invoiceNumber}-${result.packingListNumber}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const activeMeta = ALL_SAMPLE_TRADE_PAIRS.find((p) => p.id === selectedPairId);

  return (
    <div className={styles.demoContainer}>
      {/* Header */}
      <div className={styles.demoHeader}>
        <div className={styles.demoTitleRow}>
          <span className={styles.demoBadge}>Reconciliation Engine</span>
          <h4 className={styles.demoTitle}>
            Trade Intelligence: Multi-Document Variance Reconciler
          </h4>
        </div>
        <div className={styles.demoControls}>
          {ALL_SAMPLE_TRADE_PAIRS.map((pair) => (
            <button
              key={pair.id}
              type="button"
              className={`${styles.presetBtn} ${
                selectedPairId === pair.id ? styles.presetBtnActive : ""
              }`}
              onClick={() => handleSelectPreset(pair.id)}
            >
              {pair.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.demoBody}>
        {/* Zero Data Leak Privacy Notice */}
        <div className={styles.privacyBanner}>
          <ShieldCheck size={16} weight="fill" color="#52C41A" />
          <span>
            <strong>Confidential Local Processing:</strong> Trade manifests, commercial invoices, and bill of lading documents are reconciled strictly in browser memory. Never shared with external APIs.
          </span>
        </div>

        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "8px" }}>
          Target Documents: <code>{result.invoiceNumber}</code> vs <code>{result.packingListNumber}</code> — {activeMeta?.description}
        </p>

        {/* Side-by-side or stacked Document Editors */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#A6A095", marginBottom: "4px", fontWeight: 600 }}>
              Document A: Commercial Invoice
            </div>
            <textarea
              aria-label="Commercial invoice text"
              value={invoiceText}
              onChange={(e) => setInvoiceText(e.target.value)}
              className={styles.codeTextarea}
              rows={8}
              spellCheck={false}
              style={{ minHeight: "150px" }}
            />
          </div>

          <div>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#A6A095", marginBottom: "4px", fontWeight: 600 }}>
              Document B: Packing List / Manifest
            </div>
            <textarea
              aria-label="Packing list text"
              value={packingListText}
              onChange={(e) => setPackingListText(e.target.value)}
              className={styles.codeTextarea}
              rows={8}
              spellCheck={false}
              style={{ minHeight: "150px" }}
            />
          </div>
        </div>

        {/* Scorecard */}
        <div className={styles.scorecard}>
          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Field Discrepancies</div>
            <div
              className={`${styles.scoreValue} ${
                result.discrepancies.length > 0 ? styles.scoreValueCritical : styles.scoreValueSuccess
              }`}
            >
              {result.discrepancies.length} Flagged
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Tested manifest fields
            </div>
          </div>

          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Tariff Code Mismatches</div>
            <div
              className={`${styles.scoreValue} ${
                result.discrepancies.some((d) => d.type === "hs_code_mismatch")
                  ? styles.scoreValueCritical
                  : styles.scoreValueSuccess
              }`}
            >
              {result.discrepancies.filter((d) => d.type === "hs_code_mismatch").length} Items
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              HS subheading shifts
            </div>
          </div>

          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Gross Weight Difference</div>
            <div
              className={`${styles.scoreValue} ${
                result.weightVarianceKg > 20 ? styles.scoreValueCritical : styles.scoreValueSuccess
              }`}
            >
              {result.weightVarianceKg > 0 ? `±${result.weightVarianceKg.toFixed(0)} KGS` : "0.00 KGS"}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Invoice vs manifest scale
            </div>
          </div>

          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Reconciliation Status</div>
            <div
              className={`${styles.scoreValue} ${
                result.discrepancies.length > 0 ? styles.scoreValueCritical : styles.scoreValueSuccess
              }`}
              style={{ fontSize: "0.85rem" }}
            >
              {result.discrepancies.length > 0 ? "REVIEW DIFFERENCES" : "TESTED FIELDS MATCH"}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              {result.discrepancies.length > 0 ? "Confirm against source records" : "No differences on tested fields"}
            </div>
          </div>
        </div>

        {/* Boundary & Scope Disclosure */}
        <div style={{ marginBottom: "16px", padding: "10px 14px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "4px", fontSize: "0.78rem", color: "#A6A095", lineHeight: 1.5 }}>
          <strong style={{ color: "#E5DFD6" }}>Reconciliation Scope Notice:</strong> This engine performs field-level comparison between Commercial Invoices and Packing Lists (tariff numbers, gross/tare weights, and quantities) to catch paperwork anomalies before bill of lading submission. It does NOT predict border agency enforcement actions, guarantee port clearance, or replace licensed customs brokerage filings.
        </div>

        {/* Results Panel */}
        <div className={styles.resultsPanel}>
          <div className={styles.resultsHeader}>
            <div className={styles.statusIndicator}>
              <ArrowsLeftRight size={18} weight="bold" color="var(--color-orange)" />
              <span style={{ color: "#FFFFFF" }}>
                Reconciled {result.itemsReconciled} Manifest Items across Documents
              </span>
            </div>

            <button
              type="button"
              className={styles.presetBtn}
              onClick={handleDownloadCsv}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <FileCsv size={16} weight="bold" />
              <span>Export Reconciliation Matrix (.CSV)</span>
            </button>
          </div>

          {result.discrepancies.length === 0 ? (
            <div
              style={{
                padding: "20px",
                background: "rgba(82, 196, 26, 0.05)",
                border: "1px solid rgba(82, 196, 26, 0.2)",
                borderRadius: "4px",
                fontSize: "0.85rem",
                color: "#E5DFD6",
              }}
            >
          <strong style={{ color: "#95DE64" }}>Sample fields matched:</strong> The compared HS codes, weights, and consignee fields match in these two sample records. This does not establish customs clearance or document completeness.
            </div>
          ) : (
            result.discrepancies.map((disc) => (
              <div
                key={disc.id}
                className={`${styles.issueCard} ${
                  disc.severity === "critical"
                    ? styles.issueCardCritical
                    : styles.issueCardWarning
                }`}
              >
                <div className={styles.issueHeader}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      className={
                        disc.severity === "critical" ? styles.tagCritical : styles.tagWarning
                      }
                    >
                      {disc.type.toUpperCase()} · {disc.severity}
                    </span>
                    <span className={styles.issueTitle}>{disc.itemReference}</span>
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#FF8585" }}>
                    {disc.difference}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    background: "#0B0B0C",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    fontSize: "0.78rem",
                    marginBottom: "8px",
                  }}
                >
                  <div>
                    <span style={{ color: "#A6A095", textTransform: "uppercase", fontSize: "0.7rem", display: "block" }}>
                      Invoice Value
                    </span>
                    <span style={{ color: "#FFFFFF", fontFamily: "monospace" }}>{disc.invoiceValue}</span>
                  </div>

                  <div>
                    <span style={{ color: "#A6A095", textTransform: "uppercase", fontSize: "0.7rem", display: "block" }}>
                      Packing List Value
                    </span>
                    <span style={{ color: "#FF8585", fontFamily: "monospace" }}>{disc.packingListValue}</span>
                  </div>
                </div>

                <p className={styles.issueDesc}>{disc.customsRiskExplanation}</p>

                <div className={styles.remediationBox}>
                  <div className={styles.remediationTitle}>
                    <Scales size={14} weight="bold" />
                    <span>Remediation Guidance:</span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#D9D3CA" }}>
                    {disc.remediation}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* CTA Bar */}
          <div className={styles.ctaBar}>
            <div style={{ fontSize: "0.85rem", color: "#A6A095" }}>
              Need help reviewing document differences in a defined workflow?
            </div>
            <a href="#intake" className={styles.ctaButton}>
              <span>Request a scoped reconciliation review</span>
              <ArrowRight size={14} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
