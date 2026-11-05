"use client";

import React, { useState, useTransition, useCallback } from "react";
import {
  UploadSimple,
  ShieldCheck,
  CheckCircle,
  FileCsv,
  FileCode,
  ArrowRight,
  CaretDown,
  CaretUp,
  FileText,
  MagnifyingGlass,
  ArrowSquareOut,
  Info,
} from "@phosphor-icons/react";
import styles from "./validator.module.css";
import { parseProductFeed } from "@/lib/commerce/parsers";
import { validateProductFeed } from "@/lib/commerce/validator";
import { generateCsvReport, generateJsonReport } from "@/lib/commerce/exportReports";
import {
  SAMPLE_BROKEN_XML_FEED,
  SAMPLE_BROKEN_CSV_FEED,
  SAMPLE_CLEAN_CSV_FEED,
} from "@/lib/commerce/sampleFeeds";
import { FeedAuditSummary } from "@/lib/commerce/types";

export default function CommerceRescueValidator() {
  const [summary, setSummary] = useState<FeedAuditSummary | null>(() => {
    try {
      const parsed = parseProductFeed("Shopify-Production-Catalog.xml", SAMPLE_BROKEN_XML_FEED, SAMPLE_BROKEN_XML_FEED.length);
      return validateProductFeed("Shopify-Production-Catalog.xml", SAMPLE_BROKEN_XML_FEED.length, parsed.products, parsed.errors);
    } catch {
      return null;
    }
  });
  const [isPending, startTransition] = useTransition();
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "errors" | "warnings" | "passed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(() => new Set([1, 2]));
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const processContent = useCallback((fileName: string, content: string, sizeBytes: number) => {
    setErrorBanner(null);
    startTransition(() => {
      try {
        const parsed = parseProductFeed(fileName, content, sizeBytes);
        if (!parsed.success && parsed.products.length === 0) {
          setErrorBanner(parsed.errors.join(" ") || "Failed to parse feed file.");
          setSummary(null);
          return;
        }

        const auditResult = validateProductFeed(
          fileName,
          sizeBytes,
          parsed.products,
          parsed.errors
        );

        setSummary(auditResult);
        // Expand first 2 rows with errors detected by default
        const initialExpanded = new Set<number>();
        auditResult.findings
          .filter((f) => f.status === "errors_detected")
          .slice(0, 2)
          .forEach((f) => initialExpanded.add(f.rowIndex));
        setExpandedRows(initialExpanded);
      } catch (err: unknown) {
        setErrorBanner((err as Error).message || "An unexpected error occurred while analyzing the feed.");
      }
    });
  }, []);

  const handleLoadSample = useCallback((sampleType: "xml-broken" | "csv-broken" | "csv-clean") => {
    if (sampleType === "xml-broken") {
      processContent("Shopify-Production-Catalog.xml", SAMPLE_BROKEN_XML_FEED, SAMPLE_BROKEN_XML_FEED.length);
    } else if (sampleType === "csv-broken") {
      processContent("Merchant-Store-Export.csv", SAMPLE_BROKEN_CSV_FEED, SAMPLE_BROKEN_CSV_FEED.length);
    } else {
      processContent("Nuuvixx-Compliant-Catalog.csv", SAMPLE_CLEAN_CSV_FEED, SAMPLE_CLEAN_CSV_FEED.length);
    }
  }, [processContent]);

  const handleFileUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setErrorBanner("File size exceeds 10 MB limit. Please split the catalog or upload a smaller sample.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        processContent(file.name, content, file.size);
      }
    };
    reader.onerror = () => {
      setErrorBanner("Failed to read file from disk.");
    };
    reader.readAsText(file);
  };

  const toggleRow = (rowIndex: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowIndex)) next.delete(rowIndex);
      else next.add(rowIndex);
      return next;
    });
  };

  const downloadReport = (format: "csv" | "json") => {
    if (!summary) return;
    const content = format === "csv" ? generateCsvReport(summary) : generateJsonReport(summary);
    const mime = format === "csv" ? "text/csv;charset=utf-8;" : "application/json;charset=utf-8;";
    const filename = `nuuvixx-feed-diagnostic-${summary.fileName.replace(/[^a-zA-Z0-9]/g, "-")}.${format}`;

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered findings
  const filteredFindings = summary?.findings.filter((f) => {
    if (activeFilter === "errors" && f.status !== "errors_detected") return false;
    if (activeFilter === "warnings" && f.status !== "warnings_detected") return false;
    if (activeFilter === "passed" && f.status !== "passed_local_checks") return false;

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchSku = f.sku.toLowerCase().includes(q);
      const matchTitle = f.title.toLowerCase().includes(q);
      const matchIssue = f.issues.some((i) => i.field.toLowerCase().includes(q) || i.title.toLowerCase().includes(q));
      return matchSku || matchTitle || matchIssue;
    }

    return true;
  }) || [];

  return (
    <div className={styles.validatorContainer}>
      {/* Zero Storage Privacy Disclosure */}
      <div className={styles.privacyBanner}>
        <ShieldCheck size={18} weight="fill" />
        <span className={styles.privacyText}>
          <strong>Client-Side Processing Architecture:</strong> All parsing and validation execute ephemerally within your local browser session. Your product catalog data, SKU prices, and links are never transmitted to external servers, stored on disk, or passed to third-party LLMs.
        </span>
      </div>

      {/* Header bar */}
      <div className={styles.headerBar}>
        <div className={styles.titleArea}>
          <h3>
            <FileText size={22} weight="bold" color="var(--color-volt)" />
            Commerce Rescue: Product Feed Diagnostic Tool
          </h3>
          <p className={styles.subtitle}>
            Preliminary static feed validation evaluating CSV, TSV, and XML feeds against Google Merchant Center specifications.
          </p>
        </div>

        {summary && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
              Loaded: <strong>{summary.fileName}</strong> ({(summary.fileSizeBytes / 1024).toFixed(1)} KB)
            </span>
          </div>
        )}
      </div>

      {/* Dropzone Upload */}
      <div
        className={`${styles.dropzone} ${isDragOver ? styles.dropzoneActive : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFileUpload(file);
        }}
      >
        <UploadSimple size={36} weight="bold" className={styles.dropzoneIcon} />
        <p className={styles.dropzoneText}>
          {isPending ? "Auditing Product Catalog..." : "Drop your Google Shopping feed file here, or click to browse"}
        </p>
        <p className={styles.dropzoneSub}>
          Supports .xml (Google Base RSS 2.0 / Atom), .csv, .tsv, .txt · Max 10 MB · Up to 10,000 products
        </p>
        <input
          type="file"
          accept=".csv,.tsv,.xml,.txt"
          className={styles.fileInput}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
        />
      </div>

      {/* 1-Click Sample Feed Selection */}
      <div className={styles.sampleBar}>
        <span className={styles.sampleLabel}>Or test with sample feeds:</span>
        <div className={styles.sampleButtons}>
          <button
            type="button"
            className={styles.sampleBtn}
            onClick={() => handleLoadSample("xml-broken")}
          >
            Shopify XML Feed (Simulated Disapproval Triggers)
          </button>
          <button
            type="button"
            className={styles.sampleBtn}
            onClick={() => handleLoadSample("csv-broken")}
          >
            Store CSV Feed (Attribute & Price Errors)
          </button>
          <button
            type="button"
            className={styles.sampleBtn}
            onClick={() => handleLoadSample("csv-clean")}
          >
            Compliant Baseline Feed (Passed Local Checks)
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorBanner && (
        <div style={{ margin: "0 24px 20px 24px", padding: "12px 18px", background: "rgba(255, 77, 79, 0.15)", border: "1px solid #ff4d4f", borderRadius: "8px", color: "#ff8587", fontSize: "0.85rem" }}>
          <strong>Error:</strong> {errorBanner}
        </div>
      )}

      {/* Summary Scorecard */}
      {summary && (
        <>
          <div className={styles.scorecardGrid}>
            <div className={`${styles.scoreCard} ${summary.complianceScore < 70 ? styles.scoreCardCritical : styles.scoreCardSuccess}`}>
              <div className={styles.scoreLabel}>Local Check Pass Rate</div>
              <div className={`${styles.scoreValue} ${summary.complianceScore < 70 ? styles.scoreValueCritical : styles.scoreValueSuccess}`}>
                {summary.complianceScore}%
              </div>
              <div className={styles.scoreSub}>
                {summary.passedLocalChecks} of {summary.totalProducts} passed static rules
              </div>
            </div>

            <div className={styles.scoreCard}>
              <div className={styles.scoreLabel}>Total Products</div>
              <div className={styles.scoreValue}>{summary.totalProducts}</div>
              <div className={styles.scoreSub}>Audited across 14+ GMC rules</div>
            </div>

            <div className={`${styles.scoreCard} ${summary.errorsDetected > 0 ? styles.scoreCardCritical : ""}`}>
              <div className={styles.scoreLabel}>Errors Detected</div>
              <div className={`${styles.scoreValue} ${summary.errorsDetected > 0 ? styles.scoreValueCritical : ""}`}>
                {summary.errorsDetected}
              </div>
              <div className={styles.scoreSub}>{summary.criticalIssueCount} specification violations</div>
            </div>

            <div className={`${styles.scoreCard} ${summary.warningsDetected > 0 ? styles.scoreCardWarning : ""}`}>
              <div className={styles.scoreLabel}>Warnings Detected</div>
              <div className={`${styles.scoreValue} ${summary.warningsDetected > 0 ? styles.scoreValueWarning : ""}`}>
                {summary.warningsDetected}
              </div>
              <div className={styles.scoreSub}>{summary.warningIssueCount} optimization warnings</div>
            </div>

            <div className={`${styles.scoreCard} ${styles.scoreCardSuccess}`}>
              <div className={styles.scoreLabel}>Passed Local Checks</div>
              <div className={`${styles.scoreValue} ${styles.scoreValueSuccess}`}>{summary.passedLocalChecks}</div>
              <div className={styles.scoreSub}>No errors on tested attributes</div>
            </div>
          </div>

          {/* Scope & Unchecked Attributes Disclosure */}
          <div style={{ margin: "0 24px 20px 24px", padding: "14px 18px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
              <Info size={16} color="var(--color-volt)" />
              Scope of Preliminary Diagnostic &amp; Unchecked Attributes:
            </div>
            <div>
              This tool performs preliminary static file analysis against Google Merchant Center product data specifications. Attributes <strong>not checked locally</strong> (requiring live Google crawler visits and account standing):
            </div>
            <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
              {summary.uncheckedAttributes.map((attr, idx) => (
                <li key={idx} style={{ marginBottom: "2px" }}>{attr}</li>
              ))}
            </ul>
          </div>

          {/* Action and Download Bar */}
          <div className={styles.actionsBar}>
            <div className={styles.downloadGroup}>
              <button
                type="button"
                className={styles.downloadBtn}
                onClick={() => downloadReport("csv")}
              >
                <FileCsv size={16} weight="bold" />
                Export Diagnostic CSV
              </button>
              <button
                type="button"
                className={styles.downloadBtn}
                onClick={() => downloadReport("json")}
              >
                <FileCode size={16} weight="bold" />
                Export Diagnostic JSON
              </button>
            </div>

            <a
              href="#intake"
              className={styles.remediationCta}
            >
              Request Human Feed Remediation ($99 – $249)
              <ArrowRight size={14} weight="bold" />
            </a>
          </div>

          {/* Filter and Search Bar */}
          <div className={styles.filterBar}>
            <div className={styles.filterTabs}>
              <button
                type="button"
                className={`${styles.filterTab} ${activeFilter === "all" ? styles.filterTabActive : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                All Products ({summary.totalProducts})
              </button>
              <button
                type="button"
                className={`${styles.filterTab} ${activeFilter === "errors" ? styles.filterTabActive : ""}`}
                onClick={() => setActiveFilter("errors")}
              >
                Errors Detected ({summary.errorsDetected})
              </button>
              <button
                type="button"
                className={`${styles.filterTab} ${activeFilter === "warnings" ? styles.filterTabActive : ""}`}
                onClick={() => setActiveFilter("warnings")}
              >
                Warnings Detected ({summary.warningsDetected})
              </button>
              <button
                type="button"
                className={`${styles.filterTab} ${activeFilter === "passed" ? styles.filterTabActive : ""}`}
                onClick={() => setActiveFilter("passed")}
              >
                Passed Local Checks ({summary.passedLocalChecks})
              </button>
            </div>

            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <MagnifyingGlass size={16} style={{ position: "absolute", left: "10px", color: "var(--color-text-secondary)" }} />
              <input
                type="text"
                placeholder="Search SKU, title, or attribute..."
                className={styles.searchInput}
                style={{ paddingLeft: "32px" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Findings List */}
          <div className={styles.findingsList}>
            {filteredFindings.length === 0 ? (
              <div className={styles.emptyState}>
                No products match the selected filter criteria.
              </div>
            ) : (
              filteredFindings.map((finding) => {
                const isExpanded = expandedRows.has(finding.rowIndex);
                const cardClass =
                  finding.status === "errors_detected"
                    ? styles.findingCardCritical
                    : finding.status === "warnings_detected"
                    ? styles.findingCardWarning
                    : styles.findingCardApproved;

                const badgeClass =
                  finding.status === "errors_detected"
                    ? styles.badgeDisapproved
                    : finding.status === "warnings_detected"
                    ? styles.badgeWarning
                    : styles.badgeApproved;

                const statusLabel =
                  finding.status === "errors_detected"
                    ? "Errors Detected"
                    : finding.status === "warnings_detected"
                    ? "Warnings Detected"
                    : "Passed Local Checks";

                return (
                  <div key={finding.rowIndex} className={`${styles.findingCard} ${cardClass}`}>
                    <div
                      className={styles.findingHeader}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                      onClick={() => toggleRow(finding.rowIndex)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleRow(finding.rowIndex);
                        }
                      }}
                    >
                      <div className={styles.findingTitleRow}>
                        <span className={styles.skuBadge}>{finding.sku}</span>
                        <span className={styles.productTitle}>
                          {finding.title.length > 75 ? `${finding.title.slice(0, 75)}...` : finding.title}
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span className={`${styles.statusBadge} ${badgeClass}`}>
                          {statusLabel}
                        </span>
                        {isExpanded ? <CaretUp size={16} /> : <CaretDown size={16} />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className={styles.findingBody}>
                        {finding.issues.length === 0 ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#00e676", fontSize: "0.85rem" }}>
                            <CheckCircle size={18} weight="fill" />
                            <span>Passed local static checks against tested attributes. Note: Google performs live landing page price/stock crawls upon feed submission.</span>
                          </div>
                        ) : (
                          finding.issues.map((issue) => (
                            <div key={issue.id} className={styles.issueRow}>
                              <div className={styles.issueMeta}>
                                <span className={`${styles.severityTag} ${issue.severity === "critical" ? styles.tagCritical : issue.severity === "warning" ? styles.tagWarning : styles.tagInfo}`}>
                                  {issue.severity === "critical" ? "Specification Error" : issue.severity === "warning" ? "Specification Warning" : "Optimization"}
                                </span>
                                <span className={styles.fieldTag}>attribute: &lt;g:{issue.field}&gt;</span>
                                <span style={{ color: "var(--color-text-secondary)", fontSize: "0.75rem" }}>
                                  Rule: {issue.ruleId}
                                </span>
                              </div>

                              <div style={{ fontWeight: 600, color: "#ffffff", fontSize: "0.88rem" }}>
                                {issue.title}
                              </div>

                              <div className={styles.issueMessage}>{issue.message}</div>

                              <div className={styles.remediationBox}>
                                <span className={styles.remediationLabel}>Suggested Correction:</span>
                                <span>{issue.remediation}</span>
                              </div>

                              {issue.specCitation && (
                                <div style={{ fontSize: "0.74rem", marginTop: "4px" }}>
                                  <a
                                    href={issue.specCitation}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#7cb7ff", display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none" }}
                                  >
                                    View Official Google Merchant Center Specification
                                    <ArrowSquareOut size={12} />
                                  </a>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}
