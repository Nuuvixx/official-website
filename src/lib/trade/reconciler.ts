import {
  TradeDiscrepancy,
  TradeReconciliationResult,
} from "./types";

interface ParsedDocMeta {
  docNumber: string;
  consignee: string;
  incoterm: string;
  totalGrossWeightKg: number;
  items: {
    name: string;
    qty: number;
    hsCode?: string;
    grossWeightKg?: number;
  }[];
}

function parseTradeDocument(text: string): ParsedDocMeta {
  const lines = text.split("\n");
  let docNumber = "N/A";
  let consignee = "N/A";
  let incoterm = "N/A";
  let totalGrossWeightKg = 0;
  const items: ParsedDocMeta["items"] = [];

  const docNumMatch = text.match(/(?:INVOICE|PACKING LIST)\s*#?([A-Z0-9\-]+)/i);
  if (docNumMatch) docNumber = docNumMatch[1];

  const consigneeMatch = text.match(/Consignee:\s*([^\n\r]+)/i);
  if (consigneeMatch) consignee = consigneeMatch[1].trim();

  const incotermMatch = text.match(/Incoterm:\s*([^\n\r]+)/i);
  if (incotermMatch) incoterm = incotermMatch[1].trim();

  const totalWeightMatch =
    text.match(/(?:Declared Total Gross Weight|Total Manifest Gross Weight|Total Consignment Gross Weight)[:\s]*([0-9,.]+)\s*KGS?/i) ||
    text.match(/Total Gross Weight[:\s]*([0-9,.]+)\s*KGS?/i);
  if (totalWeightMatch) {
    totalGrossWeightKg = parseFloat(totalWeightMatch[1].replace(/,/g, ""));
  }

  let currentItem: ParsedDocMeta["items"][0] | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    const itemMatch = line.match(/Item\s*\d+:\s*([^(]+?)(?:\s*\(|$)/i);
    if (itemMatch) {
      if (currentItem) items.push(currentItem);
      const qtyMatch = line.match(/(?:QTY:\s*|,\s*)(\d+)\s*units?/i);
      currentItem = {
        name: itemMatch[1].trim(),
        qty: qtyMatch ? parseInt(qtyMatch[1], 10) : 0,
      };
    }

    if (currentItem) {
      const hsMatch = line.match(/HS(?:\s*Tariff)?\s*Code:\s*([0-9.]+)/i);
      if (hsMatch) {
        currentItem.hsCode = hsMatch[1].trim();
      }

      const weightMatch = line.match(/(?:Actual )?Gross Weight:\s*([0-9,.]+)\s*KGS?/i);
      if (weightMatch) {
        currentItem.grossWeightKg = parseFloat(weightMatch[1].replace(/,/g, ""));
      }
    }
  }

  if (currentItem) items.push(currentItem);

  return {
    docNumber,
    consignee,
    incoterm,
    totalGrossWeightKg,
    items,
  };
}

/**
 * Reconciles Document A (Commercial Invoice) and Document B (Packing List)
 * to identify classification and weight differences for human review.
 */
export function reconcileTradeDocuments(
  invoiceText: string,
  packingListText: string
): TradeReconciliationResult {
  const invoice = parseTradeDocument(invoiceText);
  const packingList = parseTradeDocument(packingListText);
  const discrepancies: TradeDiscrepancy[] = [];

  // Match items by name similarity
  for (const invItem of invoice.items) {
    const packItem = packingList.items.find(
      (p) =>
        p.name.toLowerCase().includes(invItem.name.toLowerCase().slice(0, 15)) ||
        invItem.name.toLowerCase().includes(p.name.toLowerCase().slice(0, 15))
    );

    if (packItem) {
      // 1. Check HS Code Match
      if (invItem.hsCode && packItem.hsCode && invItem.hsCode !== packItem.hsCode) {
        discrepancies.push({
          id: `DISC-HS-${discrepancies.length + 1}`,
          type: "hs_code_mismatch",
          severity: "critical",
          itemReference: invItem.name,
          invoiceValue: invItem.hsCode,
          packingListValue: packItem.hsCode,
          difference: `Tariff subheading shift (${invItem.hsCode} vs ${packItem.hsCode})`,
          customsRiskExplanation:
            "HS codes differ between these records. Confirm the correct classification with a qualified reviewer before filing.",
          remediation:
            "Review the source classification and correct whichever document is inaccurate before submission.",
        });
      }

      // 2. Check Item Weight Match
      if (invItem.grossWeightKg && packItem.grossWeightKg) {
        const weightDiff = Math.abs(packItem.grossWeightKg - invItem.grossWeightKg);
        if (weightDiff > 20) {
          const sign = packItem.grossWeightKg > invItem.grossWeightKg ? "+" : "-";
          discrepancies.push({
            id: `DISC-WT-${discrepancies.length + 1}`,
            type: "weight_variance",
            severity: "critical",
            itemReference: invItem.name,
            invoiceValue: `${invItem.grossWeightKg.toLocaleString()} KGS`,
            packingListValue: `${packItem.grossWeightKg.toLocaleString()} KGS`,
            difference: `${sign}${weightDiff.toFixed(2)} KGS variance`,
            customsRiskExplanation:
              "Item gross weights differ between the invoice and packing list. Verify source measurements and document units.",
            remediation:
              "Check the weighing records and amend the inaccurate document after human review.",
          });
        }
      }
    }
  }

  // 3. Overall Gross Weight Check
  const declaredTotal = invoice.totalGrossWeightKg;
  const manifestTotal = packingList.totalGrossWeightKg;
  const totalVariance = Math.abs(manifestTotal - declaredTotal);

  if (declaredTotal > 0 && manifestTotal > 0 && totalVariance > 25 && !discrepancies.some((d) => d.type === "weight_variance")) {
    const sign = manifestTotal > declaredTotal ? "+" : "-";
    discrepancies.push({
      id: `DISC-TOTAL-WT`,
      type: "weight_variance",
      severity: "warning",
      itemReference: "Total Consignment Manifest",
      invoiceValue: `${declaredTotal.toLocaleString()} KGS`,
      packingListValue: `${manifestTotal.toLocaleString()} KGS`,
      difference: `${sign}${totalVariance.toFixed(2)} KGS discrepancy`,
      customsRiskExplanation:
        "The total gross weights differ between the invoice and packing list.",
      remediation: "Verify total container tare and gross weight before customs clearance filing.",
    });
  }

  // Calculate Customs Risk Score (0 - 100)
  let riskScore = 0;
  for (const d of discrepancies) {
    if (d.severity === "critical") riskScore += 45;
    else riskScore += 20;
  }
  riskScore = Math.min(100, riskScore);

  let clearanceStatus: TradeReconciliationResult["clearanceStatus"] = "clean_clearance";
  if (riskScore >= 60) {
    clearanceStatus = "mandatory_inspection_risk";
  } else if (riskScore > 0) {
    clearanceStatus = "customs_hold_risk";
  }

  return {
    invoiceNumber: invoice.docNumber,
    packingListNumber: packingList.docNumber,
    consignee: invoice.consignee !== "N/A" ? invoice.consignee : packingList.consignee,
    incoterm: invoice.incoterm,
    itemsReconciled: Math.max(invoice.items.length, packingList.items.length),
    declaredInvoiceWeightKg: declaredTotal,
    manifestPackingWeightKg: manifestTotal,
    weightVarianceKg: totalVariance,
    discrepancies,
    customsRiskScore: riskScore,
    clearanceStatus,
    reconciledAt: new Date().toISOString(),
  };
}

/**
 * Escapes a string field for RFC 4180 CSV export with defense against Formula Injection (CWE-1236).
 */
function escapeCsv(value: string | number | undefined): string {
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

export function generateTradeReconciliationCsv(result: TradeReconciliationResult): string {
  const meta = [
    `# Nuuvixx Trade Intelligence — Multi-Document Reconciliation Report`,
    `# Commercial Invoice: ${result.invoiceNumber} | Packing List: ${result.packingListNumber}`,
    `# Consignee: ${result.consignee} | Incoterm: ${result.incoterm}`,
    `# Local Review: ${result.discrepancies.length} document difference(s) flagged; no customs decision is predicted`,
    `# Generated: ${result.reconciledAt}`,
    `# DISCLAIMER: Technical document reconciliation tool. Shippers are responsible for official customs filings and compliance certificates.`,
    `# --------------------------------------------------------------------------------`,
  ];

  const headers = [
    "Discrepancy ID",
    "Type",
    "Severity",
    "Item Reference",
    "Commercial Invoice Value",
    "Packing List Value",
    "Calculated Variance",
    "Difference Explanation",
    "Recommended Action",
  ];

  const rows: string[] = [...meta, headers.join(",")];

  for (const d of result.discrepancies) {
    rows.push(
      [
        escapeCsv(d.id),
        escapeCsv(d.type),
        escapeCsv(d.severity.toUpperCase()),
        escapeCsv(d.itemReference),
        escapeCsv(d.invoiceValue),
        escapeCsv(d.packingListValue),
        escapeCsv(d.difference),
        escapeCsv(d.customsRiskExplanation),
        escapeCsv(d.remediation),
      ].join(",")
    );
  }

  return rows.join("\r\n");
}
