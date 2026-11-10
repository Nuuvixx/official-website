export type SecuritySeverity = "critical" | "high" | "medium" | "info";

export type SecurityCategory =
  | "access_control"
  | "credential_exposure"
  | "sql_injection"
  | "authorization"
  | "configuration";

export interface SecurityFinding {
  ruleId: string;
  severity: SecuritySeverity;
  category: SecurityCategory;
  title: string;
  message: string;
  lineStart: number;
  lineEnd: number;
  snippet: string;
  remediation: string;
  cwe: string;
  fixExample?: string;
}

export interface SecurityRule {
  id: string;
  name: string;
  severity: SecuritySeverity;
  category: SecurityCategory;
  cwe: string;
  description: string;
  remediation: string;
  detect: (content: string, filename?: string) => SecurityFinding[];
}

export interface SecurityAuditResult {
  filename: string;
  totalLines: number;
  findings: SecurityFinding[];
  score: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  infoCount: number;
  tenantIsolationStatus: "intact" | "breached" | "unverifiable";
  auditedAt: string;
}

