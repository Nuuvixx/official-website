import { FeedAuditSummary } from "./types";

/**
 * Escapes a string field for RFC 4180 CSV export.
 */
function escapeCsv(value: string | number | undefined): string {
  if (value === undefined || value === null) return "";
  const str = String(value);
  if (str.includes('"') || str.includes(",") || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Generates an RFC 4180 CSV report containing all audit issues and suggested corrections.
 */
export function generateCsvReport(summary: FeedAuditSummary): string {
  const headers = [
    "Row",
    "SKU",
    "Product Title",
    "Local Check Status",
    "Severity",
    "Field",
    "Rule ID",
    "Finding Title",
    "Details",
    "Suggested Correction",
    "Specification Reference",
  ];

  const rows: string[] = [headers.join(",")];

  for (const finding of summary.findings) {
    const statusLabel =
      finding.status === "errors_detected"
        ? "ERRORS_DETECTED"
        : finding.status === "warnings_detected"
        ? "WARNINGS_DETECTED"
        : "PASSED_LOCAL_CHECKS";

    if (finding.issues.length === 0) {
      rows.push(
        [
          escapeCsv(finding.rowIndex),
          escapeCsv(finding.sku),
          escapeCsv(finding.title),
          escapeCsv(statusLabel),
          escapeCsv("NONE"),
          escapeCsv("ALL"),
          escapeCsv("LOCAL_SPEC_PASSED"),
          escapeCsv("Passed Local Checks"),
          escapeCsv("Product passed local static attribute checks against Google Merchant Center specification rules."),
          escapeCsv("No local action required. Note: Google performs live landing page price/stock crawls upon feed submission."),
          escapeCsv("https://support.google.com/merchants/answer/7052112"),
        ].join(",")
      );
    } else {
      for (const issue of finding.issues) {
        rows.push(
          [
            escapeCsv(finding.rowIndex),
            escapeCsv(finding.sku),
            escapeCsv(finding.title),
            escapeCsv(statusLabel),
            escapeCsv(issue.severity.toUpperCase()),
            escapeCsv(issue.field),
            escapeCsv(issue.ruleId),
            escapeCsv(issue.title),
            escapeCsv(issue.message),
            escapeCsv(issue.remediation),
            escapeCsv(issue.specCitation || ""),
          ].join(",")
        );
      }
    }
  }

  return rows.join("\r\n");
}

/**
 * Generates a structured JSON audit report file for machine ingestion or technical handoff.
 */
export function generateJsonReport(summary: FeedAuditSummary): string {
  return JSON.stringify(
    {
      generator: "Nuuvixx Commerce Rescue Feed Diagnostic Engine v1.0",
      complianceStandard: "Google Merchant Center Product Data Specification",
      disclaimer: "Preliminary static feed diagnostic. Nuuvixx is an independent engineering firm not affiliated with or endorsed by Google LLC. Google performs additional live checks (including real-time landing page price/availability verification and merchant account standing) upon feed ingestion.",
      generatedAt: summary.auditedAt,
      feedMetadata: {
        fileName: summary.fileName,
        fileSizeBytes: summary.fileSizeBytes,
        totalProducts: summary.totalProducts,
      },
      auditScorecard: {
        testedCheckPassRate: `${summary.complianceScore}%`,
        statusBreakdown: {
          passedLocalChecks: summary.passedLocalChecks,
          errorsDetected: summary.errorsDetected,
          warningsDetected: summary.warningsDetected,
        },
        issueBreakdown: {
          criticalErrors: summary.criticalIssueCount,
          policyWarnings: summary.warningIssueCount,
          optimizationInfo: summary.infoIssueCount,
        },
        issuesByField: summary.issuesByField,
        uncheckedAttributes: summary.uncheckedAttributes,
      },
      findings: summary.findings.map((f) => ({
        rowIndex: f.rowIndex,
        sku: f.sku,
        title: f.title,
        status: f.status,
        issueCount: f.issues.length,
        issues: f.issues.map((i) => ({
          severity: i.severity,
          field: i.field,
          ruleId: i.ruleId,
          title: i.title,
          message: i.message,
          remediation: i.remediation,
          specCitation: i.specCitation,
        })),
      })),
      parseErrors: summary.parseErrors,
    },
    null,
    2
  );
}
