/**
 * Nuuvixx Commerce Rescue v1: Product Feed Types & Interfaces
 * Grounded in Google Merchant Center (GMC) Product Data Specifications
 * https://support.google.com/merchants/answer/7052112
 */

export type IssueSeverity = "critical" | "warning" | "info";

export type ProductCheckStatus = "passed_local_checks" | "errors_detected" | "warnings_detected";

export interface FeedIssue {
  id: string; // e.g. "ERR_MISSING_ID_01"
  ruleId: string;
  field: string;
  severity: IssueSeverity;
  title: string;
  message: string;
  remediation: string;
  specCitation?: string;
  productSku?: string;
  productTitle?: string;
  rowIndex?: number;
}

export interface RawProductRecord {
  id?: string;
  title?: string;
  description?: string;
  link?: string;
  image_link?: string;
  additional_image_link?: string;
  availability?: string;
  price?: string;
  sale_price?: string;
  brand?: string;
  gtin?: string;
  mpn?: string;
  identifier_exists?: string;
  condition?: string;
  google_product_category?: string;
  product_type?: string;
  item_group_id?: string;
  shipping?: string;
  age_group?: string;
  gender?: string;
  color?: string;
  size?: string;
  [key: string]: string | undefined;
}

export interface ProductAuditFinding {
  product: RawProductRecord;
  rowIndex: number;
  sku: string;
  title: string;
  issues: FeedIssue[];
  status: ProductCheckStatus;
}

export interface FeedAuditSummary {
  fileName: string;
  fileSizeBytes: number;
  totalProducts: number;
  passedLocalChecks: number;
  errorsDetected: number;
  warningsDetected: number;
  complianceScore: number; // 0 - 100% pass rate on local tested rules
  criticalIssueCount: number;
  warningIssueCount: number;
  infoIssueCount: number;
  issuesByField: Record<string, number>;
  auditedAt: string;
  findings: ProductAuditFinding[];
  parseErrors: string[];
  uncheckedAttributes: string[];
}
