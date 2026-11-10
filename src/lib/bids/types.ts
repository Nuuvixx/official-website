export type CriterionCategory =
  | "mandatory_qualification"
  | "technical_capability"
  | "financial_compliance"
  | "legal_terms"
  | "submission_deliverable";

export interface QualificationCriterion {
  id: string;
  category: CriterionCategory;
  clauseReference: string;
  requirementText: string;
  isPassFail: boolean;
  riskLevel: "high" | "medium" | "low";
  extractionConfidence: "high" | "medium";
  lineStart: number;
  lineEnd: number;
  actionItem: string;
}

export interface TenderMetadata {
  rfpNumber?: string;
  title?: string;
  issuingAgency?: string;
  estimatedValue?: string;
  submissionDeadline?: string;
  preBidConference?: string;
  earnestMoneyDeposit?: string;
  liquidatedDamages?: string;
}

export interface TenderAnalysisResult {
  documentName: string;
  totalLines: number;
  metadata: TenderMetadata;
  criteria: QualificationCriterion[];
  passFailCount: number;
  riskCount: {
    high: number;
    medium: number;
    low: number;
  };
  complianceScore: number;
  analyzedAt: string;
}

