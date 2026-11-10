import {
  QualificationCriterion,
  TenderAnalysisResult,
  TenderMetadata,
} from "./types";

/**
 * Deterministically parses a public/enterprise tender or RFP text to extract key metadata,
 * pass/fail qualification clauses, bond requirements, and deadline constraints.
 */
export function extractTenderRequirements(
  content: string,
  documentName = "tender-document.txt"
): TenderAnalysisResult {
  const lines = content.split("\n");
  const totalLines = lines.length;
  const metadata: TenderMetadata = {};
  const criteria: QualificationCriterion[] = [];

  // 1. Extract Header Metadata
  const rfpMatch = content.match(/(?:RFP|SOLICITATION|TENDER|BID)\)?\s*(?:#|NO\.?|NUMBER:?)\s*([A-Z0-9\-_/]+)/i);
  if (rfpMatch) metadata.rfpNumber = rfpMatch[1].trim();

  const titleMatch = content.match(/TITLE:\s*([^\n\r]+)/i);
  if (titleMatch) metadata.title = titleMatch[1].trim();

  const valueMatch = content.match(/(?:ESTIMATED VALUE|CONTRACT VALUE|BUDGET):\s*([^\n\r]+)/i);
  if (valueMatch) metadata.estimatedValue = valueMatch[1].trim();

  const deadlineMatch = content.match(/(?:CLOSING DATE|SUBMISSION DEADLINE|DUE DATE)[^:\n]*:\s*([^\n\r]+)/i);
  if (deadlineMatch) metadata.submissionDeadline = deadlineMatch[1].trim();

  const preBidMatch = content.match(/(?:MANDATORY PRE-BID|PRE-BID CONFERENCE|PRE-PROPOSAL CONFERENCE)[^:\n]*:\s*([^\n\r]+)/i);
  if (preBidMatch) metadata.preBidConference = preBidMatch[1].trim();

  // If agency is on line 1 or 2
  if (lines.length > 0 && lines[0].trim().length > 3 && !lines[0].includes(":")) {
    metadata.issuingAgency = lines[0].trim();
  }

  // 2. Scan Lines for Specific Qualification Criteria
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const lineNum = i + 1;

    // Check Pre-Bid Conference Mandate
    if (/PRE-BID|PRE-PROPOSAL/i.test(line) && /MANDATORY|DISQUALIFICATION/i.test(line)) {
      criteria.push({
        id: `CRIT-${criteria.length + 1}`,
        category: "mandatory_qualification",
        clauseReference: "Section 1 · Pre-Bid Attendance",
        requirementText: line,
        isPassFail: true,
        riskLevel: "high",
        extractionConfidence: "high",
        lineStart: lineNum,
        lineEnd: lineNum,
        actionItem: "Register key technical personnel for mandatory pre-bid conference. Failure to attend results in immediate proposal disqualification.",
      });
    }

    // Check Minimum Experience Years
    const expMatch = line.match(/(?:minimum of\s+)?(\w+|\d+)\s*(?:\(\d+\)\s*)?(?:consecutive\s+)?years\s+of\s+experience/i);
    if (expMatch) {
      const clauseRef = line.match(/^(\d+(?:\.\d+)*)/)?.[1] || `Line ${lineNum}`;
      criteria.push({
        id: `CRIT-${criteria.length + 1}`,
        category: "mandatory_qualification",
        clauseReference: clauseRef.startsWith("Line") ? clauseRef : `Section ${clauseRef}`,
        requirementText: line,
        isPassFail: true,
        riskLevel: "high",
        extractionConfidence: "high",
        lineStart: lineNum,
        lineEnd: lineNum,
        actionItem: "Provide company incorporation documents and project histories demonstrating required consecutive operating years.",
      });
    }

    // Check Security Certifications (SOC2, ISO, HITRUST)
    if (/(?:SOC\s*2|ISO\s*\/?\s*IEC\s*27001|HITRUST|FedRAMP|CMMI)/i.test(line)) {
      const clauseRef = line.match(/^(\d+(?:\.\d+)*)/)?.[1] || `Line ${lineNum}`;
      criteria.push({
        id: `CRIT-${criteria.length + 1}`,
        category: "technical_capability",
        clauseReference: clauseRef.startsWith("Line") ? clauseRef : `Section ${clauseRef}`,
        requirementText: line,
        isPassFail: /mandatory|must hold|required at time/i.test(line),
        riskLevel: "high",
        extractionConfidence: "high",
        lineStart: lineNum,
        lineEnd: lineNum,
        actionItem: "Attach current third-party audit reports and valid compliance certificates in proposal technical appendix.",
      });
    }

    // Check Client References
    if (/(?:reference accounts|client references|past performance references)/i.test(line)) {
      const clauseRef = line.match(/^(\d+(?:\.\d+)*)/)?.[1] || `Line ${lineNum}`;
      criteria.push({
        id: `CRIT-${criteria.length + 1}`,
        category: "submission_deliverable",
        clauseReference: clauseRef.startsWith("Line") ? clauseRef : `Section ${clauseRef}`,
        requirementText: line,
        isPassFail: true,
        riskLevel: "medium",
        extractionConfidence: "high",
        lineStart: lineNum,
        lineEnd: lineNum,
        actionItem: "Obtain client contact approval and prepare 3 reference case summaries matching specified fleet/user scale.",
      });
    }

    // Check Bid Bond / Financial EMD
    if (/(?:bid bond|earnest money|emd|surety bond)\b/i.test(line)) {
      metadata.earnestMoneyDeposit = line;
      const clauseRef = line.match(/^(\d+(?:\.\d+)*)/)?.[1] || `Line ${lineNum}`;
      criteria.push({
        id: `CRIT-${criteria.length + 1}`,
        category: "financial_compliance",
        clauseReference: clauseRef.startsWith("Line") ? clauseRef : `Section ${clauseRef}`,
        requirementText: line,
        isPassFail: true,
        riskLevel: "high",
        extractionConfidence: "high",
        lineStart: lineNum,
        lineEnd: lineNum,
        actionItem: "Engage surety broker 10 days prior to submission to issue required Bid Bond instrument.",
      });
    }

    // Check Liquidated Damages
    if (/liquidated damages|penalties|penalty\b/i.test(line)) {
      metadata.liquidatedDamages = line;
      const clauseRef = line.match(/^(\d+(?:\.\d+)*)/)?.[1] || `Line ${lineNum}`;
      criteria.push({
        id: `CRIT-${criteria.length + 1}`,
        category: "legal_terms",
        clauseReference: clauseRef.startsWith("Line") ? clauseRef : `Section ${clauseRef}`,
        requirementText: line,
        isPassFail: false,
        riskLevel: "medium",
        extractionConfidence: "high",
        lineStart: lineNum,
        lineEnd: lineNum,
        actionItem: "Factor daily penalty exposure into project deployment timeline and contingency buffers.",
      });
    }
  }

  // Count risk levels
  let high = 0;
  let medium = 0;
  let low = 0;
  let passFailCount = 0;

  for (const c of criteria) {
    if (c.isPassFail) passFailCount++;
    if (c.riskLevel === "high") high++;
    else if (c.riskLevel === "medium") medium++;
    else low++;
  }

  // Score feasibility (baseline 100, drops per high-risk item without verified submission artifacts)
  const complianceScore = Math.max(30, 100 - high * 12 - medium * 6);

  return {
    documentName,
    totalLines,
    metadata,
    criteria,
    passFailCount,
    riskCount: { high, medium, low },
    complianceScore,
    analyzedAt: new Date().toISOString(),
  };
}

/**
 * Escapes a value for RFC 4180 CSV export with defense against Formula Injection (CWE-1236).
 */
function escapeCsv(value: string | number | boolean | undefined): string {
  if (value === undefined || value === null) return "";
  let str = String(value);

  // Mitigate CSV / Formula Injection: prepend ' to cells starting with formula triggers
  if (/^[=\+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  if (str.includes('"') || str.includes(",") || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Exports a structured Compliance Matrix CSV from the Tender analysis result.
 */
export function generateBidMatrixCsv(result: TenderAnalysisResult): string {
  const metaRows = [
    `# Nuuvixx Bid Intelligence — Tender Compliance Matrix`,
    `# Tender / RFP: ${result.metadata.rfpNumber || "N/A"} - ${result.metadata.title || result.documentName}`,
    `# Issuing Agency: ${result.metadata.issuingAgency || "N/A"}`,
    `# Submission Deadline: ${result.metadata.submissionDeadline || "N/A"}`,
    `# Generated: ${result.analyzedAt}`,
    `# DISCLAIMER: Preliminary document extraction tool. Does not substitute for formal legal/commercial review of complete procurement documents.`,
    `# --------------------------------------------------------------------------------`,
  ];

  const headers = [
    "ID",
    "Category",
    "Clause Reference",
    "Pass/Fail Mandatory",
    "Risk Level",
    "Extracted Requirement",
    "Required Action / Artifact",
    "Line Number",
  ];

  const rows: string[] = [...metaRows, headers.join(",")];

  for (const c of result.criteria) {
    rows.push(
      [
        escapeCsv(c.id),
        escapeCsv(c.category),
        escapeCsv(c.clauseReference),
        escapeCsv(c.isPassFail ? "YES (MANDATORY)" : "NO"),
        escapeCsv(c.riskLevel.toUpperCase()),
        escapeCsv(c.requirementText),
        escapeCsv(c.actionItem),
        escapeCsv(c.lineStart),
      ].join(",")
    );
  }

  return rows.join("\r\n");
}
