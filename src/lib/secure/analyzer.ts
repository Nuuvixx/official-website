import { ALL_SECURITY_RULES } from "./rules";
import { SecurityAuditResult, SecurityFinding } from "./types";

/**
 * Analyzes code content against deterministic security rules for Next.js, Supabase, and AI-coded architectures.
 */
export function analyzeSecuritySnippet(
  content: string,
  filename = "snippet.ts"
): SecurityAuditResult {
  const lines = content.split("\n");
  const totalLines = lines.length;

  const rawFindings: SecurityFinding[] = [];
  for (const rule of ALL_SECURITY_RULES) {
    try {
      const findings = rule.detect(content, filename);
      rawFindings.push(...findings);
    } catch {
      // Graceful error handling for rule execution
    }
  }

  // Deduplicate findings by ruleId and lineStart
  const seenKeys = new Set<string>();
  const uniqueFindings: SecurityFinding[] = [];
  for (const f of rawFindings) {
    const key = `${f.ruleId}_${f.lineStart}_${f.lineEnd}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueFindings.push(f);
    }
  }

  // Sort findings by line number
  uniqueFindings.sort((a, b) => a.lineStart - b.lineStart);

  let criticalCount = 0;
  let highCount = 0;
  let mediumCount = 0;
  let infoCount = 0;

  for (const f of uniqueFindings) {
    if (f.severity === "critical") criticalCount++;
    else if (f.severity === "high") highCount++;
    else if (f.severity === "medium") mediumCount++;
    else infoCount++;
  }

  // Calculate health score (0 - 100)
  const penalty = criticalCount * 35 + highCount * 20 + mediumCount * 10;
  const score = Math.max(0, Math.min(100, 100 - penalty));

  // Determine Tenant Isolation Status
  let tenantIsolationStatus: "intact" | "breached" | "unverifiable" = "intact";
  const hasTenantBreach = uniqueFindings.some(
    (f) =>
      f.ruleId === "SEC_PERMISSIVE_RLS_POLICY" ||
      f.ruleId === "SEC_UNAUTHENTICATED_SERVER_ACTION" ||
      f.ruleId === "SEC_SUPABASE_SERVICE_KEY_LEAK"
  );

  if (hasTenantBreach) {
    tenantIsolationStatus = "breached";
  } else if (uniqueFindings.length > 0) {
    tenantIsolationStatus = "unverifiable";
  }

  return {
    filename,
    totalLines,
    findings: uniqueFindings,
    score,
    criticalCount,
    highCount,
    mediumCount,
    infoCount,
    tenantIsolationStatus,
    auditedAt: new Date().toISOString(),
  };
}

