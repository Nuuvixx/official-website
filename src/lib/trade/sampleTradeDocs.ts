export interface SampleTradePair {
  id: string;
  name: string;
  description: string;
  invoice: string;
  packingList: string;
}

export const SAMPLE_DISCREPANT_TRADE: SampleTradePair = {
  id: "discrepant-customs-hold",
  name: "Sample documents with differences",
  description: "Detects tariff code variance and +320 kg tare weight discrepancy on Rotterdam consignment.",
  invoice: `=== DOCUMENT A: COMMERCIAL INVOICE #CI-2026-881 ===
Consignee: Global Tech Logistics BV (Rotterdam, Netherlands)
Incoterm: CIF Rotterdam
Item 1: Model X Industrial Edge Gateway (QTY: 500 units @ $120.00 = $60,000.00)
        HS Tariff Code: 8471.30.0100
        Total Gross Weight: 2,450.00 KGS
Item 2: Heavy-Duty IP67 Mounting Bracket (QTY: 500 units @ $15.00 = $7,500.00)
        HS Tariff Code: 8302.49.0000
        Total Gross Weight: 1,800.00 KGS
Declared Grand Total: $67,500.00 USD
Declared Total Gross Weight: 4,250.00 KGS`,
  packingList: `=== DOCUMENT B: PACKING LIST #PL-2026-881 ===
Consignee: Global Tech Logistics BV (Rotterdam, Netherlands)
Container Number: MSCU-992184-7
Seal Number: SL-49201
Item 1: Model X Industrial Edge Gateway (50 Pallets, 500 units)
        HS Tariff Code: 8471.50.0100  <-- VARIANCE DETECTED
        Actual Net Weight: 2,100 KGS | Actual Gross Weight: 2,450 KGS
Item 2: Heavy-Duty IP67 Mounting Bracket (25 Pallets, 500 units)
        HS Tariff Code: 8302.49.0000
        Actual Net Weight: 1,650 KGS | Actual Gross Weight: 2,120 KGS  <-- VARIANCE DETECTED (+320 KGS)
Total Manifest Gross Weight: 4,570.00 KGS  <-- MISMATCH (+320 KGS over Commercial Invoice!)`,
};

export const SAMPLE_ALIGNED_TRADE: SampleTradePair = {
  id: "aligned-clean-clearance",
  name: "Sample documents with matching fields",
  description: "Sample records with matching HS codes and stated gross weights on the compared fields.",
  invoice: `=== DOCUMENT A: COMMERCIAL INVOICE #CI-2026-902 ===
Consignee: Pacific Marine Supplies Pte Ltd (Singapore)
Incoterm: FOB Busan
Item 1: High-Torque Brushless Marine Pump (QTY: 200 units @ $250.00 = $50,000.00)
        HS Tariff Code: 8413.70.2004
        Total Gross Weight: 1,200.00 KGS
Item 2: Reinforced Neoprene Seal Kit (QTY: 200 units @ $25.00 = $5,000.00)
        HS Tariff Code: 4016.93.5010
        Total Gross Weight: 150.00 KGS
Declared Grand Total: $55,000.00 USD
Declared Total Gross Weight: 1,350.00 KGS`,
  packingList: `=== DOCUMENT B: PACKING LIST #PL-2026-902 ===
Consignee: Pacific Marine Supplies Pte Ltd (Singapore)
Container Number: ONEU-440192-3
Seal Number: SL-78012
Item 1: High-Torque Brushless Marine Pump (20 Pallets, 200 units)
        HS Tariff Code: 8413.70.2004
        Actual Net Weight: 1,050 KGS | Actual Gross Weight: 1,200.00 KGS
Item 2: Reinforced Neoprene Seal Kit (5 Cartons, 200 units)
        HS Tariff Code: 4016.93.5010
        Actual Net Weight: 130 KGS | Actual Gross Weight: 150.00 KGS
Total Manifest Gross Weight: 1,350.00 KGS`,
};

export const ALL_SAMPLE_TRADE_PAIRS: SampleTradePair[] = [
  SAMPLE_DISCREPANT_TRADE,
  SAMPLE_ALIGNED_TRADE,
];

