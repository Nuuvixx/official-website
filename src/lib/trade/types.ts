export type TradeDiscrepancyType =
  | "hs_code_mismatch"
  | "weight_variance"
  | "quantity_mismatch"
  | "unit_price_variance"
  | "incoterm_conflict";

export interface TradeDiscrepancy {
  id: string;
  type: TradeDiscrepancyType;
  severity: "critical" | "warning" | "info";
  itemReference: string;
  invoiceValue: string;
  packingListValue: string;
  difference: string;
  customsRiskExplanation: string;
  remediation: string;
}

export interface TradeReconciliationResult {
  invoiceNumber: string;
  packingListNumber: string;
  consignee: string;
  incoterm: string;
  itemsReconciled: number;
  declaredInvoiceWeightKg: number;
  manifestPackingWeightKg: number;
  weightVarianceKg: number;
  discrepancies: TradeDiscrepancy[];
  customsRiskScore: number; // 0 - 100 (higher = riskier)
  clearanceStatus: "clean_clearance" | "customs_hold_risk" | "mandatory_inspection_risk";
  reconciledAt: string;
}

