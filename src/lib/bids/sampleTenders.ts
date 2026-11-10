export interface SampleTenderDoc {
  id: string;
  name: string;
  filename: string;
  description: string;
  content: string;
}

export const SAMPLE_TRANSIT_RFP: SampleTenderDoc = {
  id: "transit-fleet",
  name: "Transit Authority Telemetry RFP",
  filename: "CityTransit_RFP_2026_Excerpt.txt",
  description: "Municipal transit authority tender with strict pre-bid conference and bond requirements.",
  content: `CITY METROPOLITAN TRANSIT AUTHORITY
REQUEST FOR PROPOSAL (RFP) #2026-IT-094
TITLE: Autonomous Dispatch & Telemetry Fleet Integration System
ESTIMATED VALUE: $450,000 - $600,000 USD
CLOSING DATE & TIME: November 28, 2026 at 14:00 EST (Strict Deadline)
MANDATORY PRE-BID CONFERENCE: November 14, 2026 at 10:00 EST (Attendance Mandatory - Failure to attend results in immediate bid disqualification)

SECTION 3.2 - MINIMUM QUALIFICATIONS (PASS/FAIL CRITERIA):
3.2.1 Proposer must demonstrate a minimum of five (5) consecutive years of experience in enterprise fleet scheduling or real-time IoT telemetry software.
3.2.2 Proposer must hold active SOC2 Type II or ISO/IEC 27001 certification at time of proposal submission.
3.2.3 Proposer must provide three (3) client reference accounts from public sector or transit entities operating fleets of at least 150 vehicles.
3.2.4 Proposer must furnish a Bid Bond equal to 5% of the total proposed contract sum.

SECTION 7.4 - LIQUIDATED DAMAGES & PENALTIES:
Vendor agrees to pay $2,500 USD per calendar day for unexcused deployment delays exceeding established project milestones. Cumulative damages capped at 20% of total contract value.`,
};

export const SAMPLE_HEALTHCARE_RFP: SampleTenderDoc = {
  id: "state-healthcare",
  name: "State Health Dept Portal RFP",
  filename: "State_HHS_RFP_2026_HIPAA.txt",
  description: "State department tender requiring HITRUST certification and 10-year experience history.",
  content: `STATE DEPARTMENT OF HEALTH & HUMAN SERVICES
SOLICITATION #HHS-2026-CLOUD-901
TITLE: Patient Electronic Health Records & Rural Telemedicine Integration
CONTRACT VALUE: $1,200,000 USD
SUBMISSION DEADLINE: December 15, 2026 at 17:00 CST
PRE-PROPOSAL CONFERENCE: December 01, 2026 at 11:00 CST (Mandatory attendance for prime contractors)

SECTION 4.1 - MANDATORY VENDOR ELIGIBILITY (PASS/FAIL):
4.1.1 Prime vendor must demonstrate a minimum of ten (10) consecutive years of experience supporting HIPAA-regulated healthcare portals.
4.1.2 Bidders must hold current HITRUST CSF Certification and active ISO/IEC 27001 compliance.
4.1.3 Submission must include five (5) client reference accounts from governmental or hospital health networks.
4.1.4 Bidder must furnish a certified Cashier's Check or Bid Bond equal to 10% of total bid value.

SECTION 9.2 - REMEDIES AND PENALTIES:
Vendor shall be subject to liquidated damages of $5,000 USD per day for any unplanned outage or deployment delay.`,
};

export const SAMPLE_ENTERPRISE_RFP: SampleTenderDoc = {
  id: "enterprise-saas",
  name: "Corporate SaaS Modernization RFP",
  filename: "ApexGlobal_RFP_Enterprise.txt",
  description: "Enterprise procurement with standard security attestations and reference requests.",
  content: `APEX GLOBAL LOGISTICS CORP
RFP #CORP-2026-042
TITLE: Multi-Carrier Shipping & Warehouse Optimization API
ESTIMATED VALUE: $280,000 USD
DUE DATE: January 10, 2027 at 17:00 EST

SECTION 2 - VENDOR REQUIREMENTS:
2.1 Vendor must demonstrate a minimum of 3 years of experience in high-volume API integrations.
2.2 Vendor must possess active SOC 2 Type II compliance reports.
2.3 Vendor must provide 3 client references from logistics or supply chain enterprises.
2.4 No bid bond required; standard performance escrow will be established upon contract execution.`,
};

export const ALL_SAMPLE_TENDERS: SampleTenderDoc[] = [
  SAMPLE_TRANSIT_RFP,
  SAMPLE_HEALTHCARE_RFP,
  SAMPLE_ENTERPRISE_RFP,
];

