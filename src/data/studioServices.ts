export interface CommercialService {
  id: string;
  slug: string;
  name: string;
  division: string;
  tagline: string;
  description: string;
  targetAudience: string[];
  primaryProblems: string[];
  deliverables: string[];
  scopeAndExclusions: { included: string[]; excluded: string[] };
  processSteps: { step: string; title: string; description: string }[];
  introPricing: { range: string; model: string; note: string };
  futureRoadmap: string;
  faqs: { question: string; answer: string }[];
  badge: string;
  accentColor: string;
}

const quote = {
  range: "Request a quote",
  model: "Scoped engagement",
  note: "We confirm scope, deliverables, timing and price after reviewing your requirements. The browser demonstration is free to try.",
};

export const STUDIO_SERVICES: CommercialService[] = [
  {
    id: "commerce-rescue", slug: "commerce", name: "Commerce Rescue",
    division: "Product-feed diagnostics", badge: "COMMERCE", accentColor: "#F56B25",
    tagline: "Find product-feed errors and plan a practical fix.",
    description: "A browser-side validator checks CSV, TSV and XML product feeds for common attribute, identifier and price-format issues. A scoped review can help turn the findings into a remediation plan.",
    targetAudience: ["Merchants maintaining product catalogs", "Teams preparing feeds for Merchant Center review", "Agencies investigating feed errors"],
    primaryProblems: ["Missing or malformed feed attributes", "Invalid GTIN values", "Pricing and availability formatting issues"],
    deliverables: ["Local feed diagnostic with issue explanations", "CSV and JSON report exports", "Scoped human review and remediation plan on request"],
    scopeAndExclusions: {
      included: ["Static checks on uploaded CSV, TSV or XML feeds", "Issue severity and field-level guidance", "Downloadable reports"],
      excluded: ["Live storefront crawling", "Google account policy decisions or reinstatement", "A guarantee that a feed will be approved"],
    },
    processSteps: [
      { step: "01", title: "Run a local check", description: "Choose a sample or upload a feed in your browser." },
      { step: "02", title: "Review findings", description: "Inspect field-level errors and export the report." },
      { step: "03", title: "Scope the fix", description: "Share the problem and agree on any further engineering work." },
    ],
    introPricing: quote,
    futureRoadmap: "Live storefront and account checks are outside the current validator.",
    faqs: [
      { question: "Does the validator upload my catalog?", answer: "No. The current diagnostic parses and checks the file in your browser." },
      { question: "Can this guarantee Merchant Center approval?", answer: "No. It performs preliminary local checks; Google makes its own account and crawler decisions." },
    ],
  },
  {
    id: "nuuvixx-secure", slug: "secure", name: "Nuuvixx Secure",
    division: "Scoped code security review", badge: "SECURITY", accentColor: "#F56B25",
    tagline: "Inspect common access-control and secret-handling mistakes.",
    description: "A local demonstration checks source snippets for five defined Next.js and Supabase security patterns. A permissioned human review can be scoped separately.",
    targetAudience: ["Teams using Next.js and Supabase", "Developers reviewing generated application code", "Founders preparing to handle customer data"],
    primaryProblems: ["Secrets exposed in source", "Missing authorization in server actions", "Permissive data access policies"],
    deliverables: ["Local pattern-based findings with line evidence", "Example remediation guidance", "A scoped review proposal on request"],
    scopeAndExclusions: {
      included: ["Five documented static heuristics", "Sample code inspection in the browser", "Guidance for a permissioned review"],
      excluded: ["Dynamic penetration testing", "Formal compliance certification", "A guarantee that code is vulnerability-free"],
    },
    processSteps: [
      { step: "01", title: "Define permission", description: "Agree on the code and systems that may be reviewed." },
      { step: "02", title: "Inspect code", description: "Review findings against the application context." },
      { step: "03", title: "Plan remediation", description: "Prioritize changes and validate them with the team." },
    ],
    introPricing: quote,
    futureRoadmap: "The current demonstration is a scoped heuristic checker, not a full audit engine.",
    faqs: [
      { question: "Is this a penetration test?", answer: "No. The demonstration applies five static pattern checks to code snippets." },
      { question: "Is source code sent to a server?", answer: "The current interactive checker runs locally in the browser." },
    ],
  },
  {
    id: "nuuvixx-creative", slug: "creative", name: "Nuuvixx Creative",
    division: "Campaign planning workflow", badge: "CREATIVE", accentColor: "#F56B25",
    tagline: "Turn a product brief into a structured production plan.",
    description: "The local brief builder turns supplied product details into a scene outline, script cues and a JSON blueprint. It does not render finished video.",
    targetAudience: ["Product teams preparing a campaign", "Founders organizing a product demonstration", "Creative teams needing a production brief"],
    primaryProblems: ["Unclear campaign direction", "Missing scene and format requirements", "Briefs that are hard to hand off"],
    deliverables: ["Four-scene campaign outline", "Camera, voiceover and sound cues", "JSON blueprint export"],
    scopeAndExclusions: {
      included: ["Structured brief generation from entered details", "Format and scene planning", "Exportable planning blueprint"],
      excluded: ["Rendered video files from the browser tool", "Licensing of third-party media", "Guaranteed campaign performance"],
    },
    processSteps: [
      { step: "01", title: "Describe the product", description: "Enter the audience, offer and product details." },
      { step: "02", title: "Review the outline", description: "Check the scenes and production cues." },
      { step: "03", title: "Export the brief", description: "Use the JSON blueprint for a production discussion." },
    ],
    introPricing: quote,
    futureRoadmap: "Finished media production is a separately scoped service.",
    faqs: [
      { question: "Does the tool generate a finished video?", answer: "No. It produces a pre-production blueprint and shot plan." },
      { question: "Can I export the plan?", answer: "Yes. The current workflow exports a JSON campaign blueprint." },
    ],
  },
  {
    id: "trade-intelligence", slug: "trade", name: "Trade Intelligence",
    division: "Trade document reconciliation", badge: "TRADE", accentColor: "#F56B25",
    tagline: "Compare structured shipment records for discrepancies.",
    description: "The browser tool compares commercial invoice and packing-list data for item, HS-code and weight differences, then produces a CSV variance report for human review.",
    targetAudience: ["Export documentation teams", "Suppliers comparing shipment paperwork", "Operations teams checking invoice and packing-list data"],
    primaryProblems: ["Mismatched item details", "HS-code differences", "Weight and quantity variances"],
    deliverables: ["Field-level discrepancy matrix", "CSV variance export", "Human review of flagged records when scoped"],
    scopeAndExclusions: {
      included: ["Structured invoice and packing-list comparison", "Sample document demonstration", "Downloadable discrepancy report"],
      excluded: ["OCR for scanned documents", "Customs filing or legal classification advice", "Predictions of border authority decisions"],
    },
    processSteps: [
      { step: "01", title: "Provide structured records", description: "Use the sample document pair or prepared data." },
      { step: "02", title: "Compare fields", description: "Inspect the highlighted differences." },
      { step: "03", title: "Review exceptions", description: "Export a matrix for an operations specialist." },
    ],
    introPricing: quote,
    futureRoadmap: "OCR and customs integrations are not part of the current tool.",
    faqs: [
      { question: "Does this clear shipments through customs?", answer: "No. It flags document inconsistencies for human review." },
      { question: "Can it read scanned paperwork?", answer: "The current tool works with structured input; scanned-document OCR is not available." },
    ],
  },
  {
    id: "bid-intelligence", slug: "bids", name: "Bid Intelligence",
    division: "Tender requirement extraction", badge: "PROCUREMENT", accentColor: "#F56B25",
    tagline: "Find submission requirements in tender text.",
    description: "A local parser extracts selected deadlines, qualification clauses and financial requirements from tender text and builds a checklist with source lines.",
    targetAudience: ["Suppliers screening tender opportunities", "Proposal teams reviewing RFP text", "Operations teams organizing submission requirements"],
    primaryProblems: ["Requirements buried in long documents", "Missed deadlines or mandatory conditions", "Manual checklist preparation"],
    deliverables: ["Extracted requirement matrix with source lines", "Filterable checklist", "CSV checklist export"],
    scopeAndExclusions: {
      included: ["Text-based tender parsing", "Traceable source-line references", "Downloadable checklist"],
      excluded: ["OCR of scanned PDFs", "Official eligibility decisions", "A guarantee of award or compliant submission"],
    },
    processSteps: [
      { step: "01", title: "Supply tender text", description: "Paste text or use a supported text-based document." },
      { step: "02", title: "Review requirements", description: "Check extracted items against source lines." },
      { step: "03", title: "Prepare the checklist", description: "Export and verify the matrix before submission." },
    ],
    introPricing: quote,
    futureRoadmap: "Scanned-document OCR is not available in the current parser.",
    faqs: [
      { question: "Can the parser decide whether we qualify?", answer: "No. It highlights text for a human reviewer; the issuing authority decides eligibility." },
      { question: "Does it process scanned PDFs?", answer: "No. The current tool works with text and text-extractable PDFs, not scanned images." },
    ],
  },
];
