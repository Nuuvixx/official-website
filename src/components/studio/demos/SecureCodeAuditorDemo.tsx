"use client";

import { useState, useMemo } from "react";
import {
  ShieldCheck,
  ShieldWarning,
  CheckCircle,
  ArrowRight,
  Code,
} from "@phosphor-icons/react";
import styles from "./demos.module.css";
import { analyzeSecuritySnippet } from "@/lib/secure/analyzer";
import {
  ALL_SAMPLE_SNIPPETS,
  SAMPLE_VULNERABLE_ACTION,
} from "@/lib/secure/sampleSnippets";
import { SecurityAuditResult } from "@/lib/secure/types";

export default function SecureCodeAuditorDemo() {
  const [selectedSnippetId, setSelectedSnippetId] = useState(SAMPLE_VULNERABLE_ACTION.id);
  const [code, setCode] = useState(SAMPLE_VULNERABLE_ACTION.code);
  const [activeFilename, setActiveFilename] = useState(SAMPLE_VULNERABLE_ACTION.filename);

  // Run real analysis locally
  const auditResult: SecurityAuditResult = useMemo(() => {
    return analyzeSecuritySnippet(code, activeFilename);
  }, [code, activeFilename]);

  const handleSelectSnippet = (id: string) => {
    const found = ALL_SAMPLE_SNIPPETS.find((s) => s.id === id);
    if (found) {
      setSelectedSnippetId(found.id);
      setCode(found.code);
      setActiveFilename(found.filename);
    }
  };

  const currentSnippetMeta = ALL_SAMPLE_SNIPPETS.find((s) => s.id === selectedSnippetId);

  return (
    <div className={styles.demoContainer}>
      {/* Header */}
      <div className={styles.demoHeader}>
        <div className={styles.demoTitleRow}>
          <span className={styles.demoBadge}>Interactive Static Analyzer</span>
          <h4 className={styles.demoTitle}>
            Nuuvixx Secure: Static Application Security &amp; RLS Inspector
          </h4>
        </div>
        <div className={styles.demoControls}>
          {ALL_SAMPLE_SNIPPETS.map((snippet) => (
            <button
              key={snippet.id}
              type="button"
              className={`${styles.presetBtn} ${
                selectedSnippetId === snippet.id ? styles.presetBtnActive : ""
              }`}
              onClick={() => handleSelectSnippet(snippet.id)}
            >
              {snippet.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.demoBody}>
        {/* Client-Side Privacy Notice */}
        <div className={styles.privacyBanner}>
          <ShieldCheck size={16} weight="fill" color="#52C41A" />
          <span>
            <strong>Ephemeral Local Analysis:</strong> Code is analyzed statically in your local browser sandbox. Snippets are never sent to external servers or logged.
          </span>
        </div>

        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "8px" }}>
          Target File: <code>{activeFilename}</code> — {currentSnippetMeta?.description}
        </p>

        {/* Code Input Area */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.codeTextarea}
          rows={10}
          spellCheck={false}
          placeholder="Paste your Next.js Server Action or Supabase SQL migration here..."
        />

        {/* Real Scorecard */}
        <div className={styles.scorecard}>
          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Static Rule Coverage</div>
            <div className={styles.scoreValue} style={{ fontSize: "1.05rem", color: "#FFFFFF" }}>
              5 Scoped Rules
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Next.js + Supabase heuristics
            </div>
          </div>

          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Critical Pattern Flags</div>
            <div
              className={`${styles.scoreValue} ${
                auditResult.criticalCount > 0 ? styles.scoreValueCritical : styles.scoreValueSuccess
              }`}
            >
              {auditResult.criticalCount} Flagged
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Access control &amp; key leaks
            </div>
          </div>

          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>High Severity Warnings</div>
            <div
              className={`${styles.scoreValue} ${
                auditResult.highCount > 0 ? styles.scoreValueWarning : styles.scoreValueSuccess
              }`}
            >
              {auditResult.highCount} Flagged
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              Exposed client variables
            </div>
          </div>

          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Baseline Rule Status</div>
            <div
              className={`${styles.scoreValue} ${
                auditResult.findings.length > 0
                  ? styles.scoreValueCritical
                  : styles.scoreValueSuccess
              }`}
              style={{ fontSize: "0.95rem" }}
            >
              {auditResult.findings.length > 0 ? "REVIEW FLAGS" : "NO RULE FLAGS"}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#A6A095", marginTop: "2px" }}>
              {auditResult.findings.length > 0 ? "Tested heuristics violated" : "Zero flags on 5 tested rules"}
            </div>
          </div>
        </div>

        {/* Boundary & Scope Disclosure */}
        <div style={{ marginBottom: "16px", padding: "10px 14px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "4px", fontSize: "0.78rem", color: "#A6A095", lineHeight: 1.5 }}>
          <strong style={{ color: "#E5DFD6" }}>Scope &amp; Limitations Notice:</strong> This interactive inspector evaluates code against 5 specific pattern heuristics (Supabase service key leaks, unauthenticated Server Action mutations, permissive RLS `USING (true)`, `NEXT_PUBLIC_` credential prefixing, and raw SQL string interpolation). It does NOT constitute a full penetration test, comprehensive application security review, or certification that the application is vulnerability-free.
        </div>

        {/* Findings Panel */}
        <div className={styles.resultsPanel}>
          <div className={styles.resultsHeader}>
            <div className={styles.statusIndicator}>
              {auditResult.findings.length === 0 ? (
                <>
                  <CheckCircle size={18} weight="fill" color="#52C41A" />
                  <span style={{ color: "#95DE64" }}>0 Vulnerabilities Detected in Scanned Snippet</span>
                </>
              ) : (
                <>
                  <ShieldWarning size={18} weight="fill" color="#FF6B6B" />
                  <span style={{ color: "#FF8585" }}>
                    {auditResult.findings.length} Security Issue
                    {auditResult.findings.length === 1 ? "" : "s"} Flagged
                  </span>
                </>
              )}
            </div>
            <span style={{ fontSize: "0.8rem", color: "#A6A095" }}>
              Inspected {auditResult.totalLines} lines across 5 rule specifications
            </span>
          </div>

          {auditResult.findings.length === 0 ? (
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
              <strong style={{ color: "#95DE64" }}>Hardened Baseline Verified:</strong> No unauthenticated Server Action mutations, leaked service keys, permissive RLS clauses, or raw SQL interpolations were identified.
            </div>
          ) : (
            auditResult.findings.map((finding, idx) => (
              <div
                key={`${finding.ruleId}-${idx}`}
                className={`${styles.issueCard} ${
                  finding.severity === "critical"
                    ? styles.issueCardCritical
                    : styles.issueCardWarning
                }`}
              >
                <div className={styles.issueHeader}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      className={
                        finding.severity === "critical"
                          ? styles.tagCritical
                          : styles.tagWarning
                      }
                    >
                      {finding.cwe} · {finding.severity}
                    </span>
                    <span className={styles.issueTitle}>{finding.title}</span>
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#A6A095" }}>
                    Lines {finding.lineStart}–{finding.lineEnd}
                  </span>
                </div>

                <p className={styles.issueDesc}>{finding.message}</p>

                {finding.snippet && (
                  <div className={styles.codeSnippet}>{finding.snippet}</div>
                )}

                <div className={styles.remediationBox}>
                  <div className={styles.remediationTitle}>
                    <Code size={14} weight="bold" />
                    <span>Recommended Architectural Fix:</span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#D9D3CA", marginBottom: finding.fixExample ? "6px" : "0" }}>
                    {finding.remediation}
                  </div>
                  {finding.fixExample && (
                    <div className={styles.remediationCode}>{finding.fixExample}</div>
                  )}
                </div>
              </div>
            ))
          )}

          {/* CTA Bar to Direct Intake */}
          <div className={styles.ctaBar}>
            <div style={{ fontSize: "0.85rem", color: "#A6A095" }}>
              Need our engineers to audit your full repository, Next.js Server Actions, and Supabase RLS policies?
            </div>
            <a href="#intake" className={styles.ctaButton}>
              <span>Request a scoped security review</span>
              <ArrowRight size={14} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
