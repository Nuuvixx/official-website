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
  scopeAndExclusions: {
    included: string[];
    excluded: string[];
  };
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  introPricing: {
    range: string;
    model: string;
    note: string;
  };
  futureRoadmap: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  badge: string;
  accentColor: string;
}

export const STUDIO_SERVICES: CommercialService[] = [
  {
    id: "commerce-rescue",
    slug: "commerce",
    name: "Nuuvixx Commerce Rescue",
    division: "Ecommerce Systems & Catalog Engineering",
    tagline: "Fix broken product feeds and Google Merchant Center disapprovals with engineering precision.",
    description: "Shopify merchants and ecommerce brands lose thousands in ad spend due to feed disapprovals, missing variant attributes, and inventory desyncs. We diagnose catalog anomalies, repair XML/JSON feed architectures, and re-establish compliant merchant feeds.",
    targetAudience: [
      "Shopify & Shopify Plus store owners with 100+ SKUs",
      "Performance marketing agencies facing GMC account suspensions",
      "Multi-channel ecommerce retailers managing complex variant matrices",
      "Direct-to-consumer brands migrating catalog architecture"
    ],
    primaryProblems: [
      "Google Merchant Center disapprovals (GTIN, MPN, brand, availability)",
      "Broken Google Shopping and Meta Catalog XML/RSS/JSON feeds",
      "Variant mapping errors and missing attribute mismatches",
      "Inventory synchronization failures between ERP/WMS and storefront",
      "Truncated titles, policy compliance violations, and bad structured data"
    ],
    deliverables: [
      "Full catalog feed diagnostic report (critical issues, warnings, policy risks)",
      "Automated feed sanitization and attribute mapping script/endpoint",
      "Google Merchant Center attribute compliance remediation plan",
      "Direct fix implementation for Shopify / headless feed endpoints",
      "Post-resolution feed audit and re-crawl verification guidance"
    ],
    scopeAndExclusions: {
      included: [
        "In-depth feed XML/JSON schema validation against current GMC requirements",
        "Direct remediation of feed templates, variant attributes, and sync logic",
        "Assistance with GMC review submission and error verification"
      ],
      excluded: [
        "Ad account management or PPC campaign optimization",
        "Legal dispute of trademark or counterfeit policy suspensions",
        "Complete ecommerce store redesigns or payment processor disputes"
      ]
    },
    processSteps: [
      {
        step: "01",
        title: "Feed Ingestion & Audit",
        description: "We ingest your raw product feed and GMC error reports, running our automated diagnostic suite across all active SKUs."
      },
      {
        step: "02",
        title: "Root Cause Localization",
        description: "We isolate schema violations, missing mandatory attributes, invalid barcode checksums, and inventory delta bugs."
      },
      {
        step: "03",
        title: "Remediation & Testing",
        description: "We patch the feed generation logic or provide corrected feed endpoints and test them against Google's Merchant validation sandbox."
      },
      {
        step: "04",
        title: "Re-submission & Handover",
        description: "We verify clean ingestion in Merchant Center, provide documentation for your team, and establish ongoing health checks."
      }
    ],
    introPricing: {
      range: "$99 – $249",
      model: "Fixed-Scope Audit & Remediation",
      note: "Tiered by catalog size (Under 1,000 SKUs: $99 | 1,000–10,000 SKUs: $179 | 10,000+ SKUs: $249). Subject to initial catalog review."
    },
    futureRoadmap: "Continuous automated feed validation, real-time inventory anomaly alerts, and automated policy linting SaaS.",
    faqs: [
      {
        question: "How long does a Commerce Rescue diagnostic and fix take?",
        answer: "Standard catalog audits and fixes are typically completed within 24 to 48 business hours once read-only access to feed URLs or storefront exports is provided."
      },
      {
        question: "Do you need full store admin credentials?",
        answer: "No. We prioritize zero-trust operations. We only require read access to your product feed URL or export file, and standard collaborator access if direct Shopify feed app modifications are needed."
      },
      {
        question: "Can you guarantee Google will reinstate my account?",
        answer: "No. Nuuvixx is an independent engineering firm and cannot guarantee account reinstatement or official Google approval, as final policy enforcement resides solely with Google LLC. We deliver technical remediation for underlying feed attribute errors, schema inconsistencies, and crawl discrepancies required for resubmission."
      }
    ],
    badge: "ECOMMERCE RESCUE",
    accentColor: "#FF6B2C"
  },
  {
    id: "nuuvixx-secure",
    slug: "secure",
    name: "Nuuvixx Secure",
    division: "AI Application & Full-Stack Security",
    tagline: "Rigorous security audits and access-control reviews for AI-generated codebases.",
    description: "Developers building fast with Cursor, Lovable, Bolt, Claude Code, and Replit frequently deploy critical vulnerabilities: broken Supabase RLS policies, leaked API keys, unauthorized server actions, and exposed database routes. We provide permissioned, targeted code security audits and concrete remediation.",
    targetAudience: [
      "AI SaaS founders and indie hackers building with modern vibe-coding tools",
      "Early-stage engineering teams deploying Supabase, Next.js Server Actions, or FastAPI",
      "Startups preparing for customer data onboarding or investor technical due diligence",
      "Agencies delivering AI applications requiring third-party security verification"
    ],
    primaryProblems: [
      "Permissive or missing Supabase Row Level Security (RLS) policies",
      "Exposed backend API keys and client-side secret leakage",
      "Insecure Server Actions and missing role-based access control (RBAC)",
      "Unrestricted AI prompt endpoints prone to SSRF or data exfiltration",
      "Database tenant isolation breaches in multi-tenant architectures"
    ],
    deliverables: [
      "Targeted Application Security Assessment Report (Severity-ranked: Critical to Low)",
      "Comprehensive Supabase RLS policy audit and copy-paste remediation SQL",
      "Server Action & API authorization matrix review",
      "Secret exposure and environment configuration analysis",
      "Live remediation guidance session or direct PR with security patches"
    ],
    scopeAndExclusions: {
      included: [
        "Permissioned static & architectural code review of auth, RLS, and APIs",
        "Analysis of AI endpoint boundaries and model input validation",
        "Actionable code snippets and configuration fixes"
      ],
      excluded: [
        "Comprehensive network penetration testing or red-team infrastructure hacking",
        "SOC2 / ISO27001 formal regulatory compliance certification",
        "Guarantees of absolute security (we focus on high-impact code vulnerabilities)"
      ]
    },
    processSteps: [
      {
        step: "01",
        title: "Permissioned Scope Definition",
        description: "We define review boundaries (frontend, server actions, database schema, RLS policies) under mutual confidentiality."
      },
      {
        step: "02",
        title: "Static & Architecture Audit",
        description: "We inspect access control models, tenant boundaries, environment variable handling, and AI call flows."
      },
      {
        step: "03",
        title: "Vulnerability Verification",
        description: "We verify whether theoretical risks are exploitable in your specific application stack and assign severity."
      },
      {
        step: "04",
        title: "Remediation Delivery",
        description: "We deliver an actionable Markdown/PDF security report along with ready-to-merge SQL policies and code fixes."
      }
    ],
    introPricing: {
      range: "$149 – $399",
      model: "Targeted Security Audit & Fix Blueprint",
      note: "Small single-purpose SaaS: $149 | Multi-tenant SaaS with complex RBAC: $279 | Full stack + PR remediation: $399."
    },
    futureRoadmap: "Automated GitHub Action security linter for AI-generated code, continuous Supabase RLS posture monitoring, and API boundary probes.",
    faqs: [
      {
        question: "Do you perform invasive penetration testing against live production?",
        answer: "No. Nuuvixx Secure is a code-level and architecture-level security review. We do not perform destructive denial-of-service or external network penetration testing. We review repository code, configurations, and authorization rules."
      },
      {
        question: "Why do AI-generated apps specifically need this?",
        answer: "LLMs frequently generate functional code that works for the happy path but defaults to public database policies ('true' for all users) or leaves server mutations unauthenticated. We specialize in catching these exact patterns."
      },
      {
        question: "How do you protect our proprietary codebase during the audit?",
        answer: "We sign NDAs, work on dedicated secure offline workstations, never use your proprietary code to train external models, and purge local checkouts immediately after deliverable handover."
      }
    ],
    badge: "CODE SECURITY",
    accentColor: "#E5252A"
  },
  {
    id: "nuuvixx-creative",
    slug: "creative",
    name: "Nuuvixx Creative",
    division: "AI-Augmented Commercial Video & Motion",
    tagline: "Commercial video ads, product demonstrations, and high-converting campaign variations.",
    description: "Creating engaging video advertising shouldn't cost $15,000 per shoot or require months of post-production. We combine cutting-edge generative video pipelines with human creative direction, professional typography, and motion design to produce high-performing social ads and product videos.",
    targetAudience: [
      "Direct-to-consumer ecommerce brands scaling TikTok, Reels, and YouTube Shorts",
      "Marketing agencies requiring rapid creative testing variations",
      "B2B SaaS companies seeking clear, high-impact product announcement videos",
      "App founders needing conversion-focused app store and social previews"
    ],
    primaryProblems: [
      "High production costs and slow turnaround of traditional video agencies",
      "Creative fatigue in paid media requiring constant new ad variations",
      "Incoherent AI video outputs with artifacting, weird physics, or inconsistent branding",
      "Lack of sound design, punchy captions, and editorial pacing in raw generative clips"
    ],
    deliverables: [
      "3 to 5 high-resolution commercial ad concepts (1080x1920 9:16 and 1920x1080 16:9)",
      "A/B creative hooks and tailored script variations for performance testing",
      "Professional motion graphics, animated captions, and licensed sound design",
      "Brand-aligned color grading and product asset compositing",
      "Ready-to-launch MP4 export packages optimized for Meta and TikTok ad networks"
    ],
    scopeAndExclusions: {
      included: [
        "AI-assisted video generation, professional human editing, kinetic typography, audio mixing",
        "Compositing customer-supplied high-res logos, product packshots, and brand guidelines",
        "Two rounds of editorial revisions per package"
      ],
      excluded: [
        "Physical on-location film crews or physical talent scouting",
        "Creation of deceptive or synthetic deepfakes of real public figures",
        "Fabrication of false testimonials or unverified product performance claims"
      ]
    },
    processSteps: [
      {
        step: "01",
        title: "Creative Brief & Brand Ingestion",
        description: "You share your product details, key value propositions, brand visual assets, and target audience hooks."
      },
      {
        step: "02",
        title: "Scripting & Storyboard Pipeline",
        description: "Our creative directors engineer punchy hook scripts and generate visual styleboards for your review."
      },
      {
        step: "03",
        title: "Synthesis & Human Motion Design",
        description: "We generate video elements, composite your genuine product assets, animate dynamic typography, and sync custom audio."
      },
      {
        step: "04",
        title: "Review & Delivery",
        description: "You review the drafts via interactive preview, request refinements, and receive production ad packages."
      }
    ],
    introPricing: {
      range: "$149 – $299",
      model: "Fixed Commercial Creative Package",
      note: "Starter Package (2 hooks, 1 master video): $149 | Growth Package (5 hooks, 2 master creatives, multi-aspect): $299."
    },
    futureRoadmap: "Cloud creative workflow platform allowing brands to self-generate variations based on approved master brand guidelines.",
    faqs: [
      {
        question: "Do you use licensed assets?",
        answer: "Yes. All audio tracks, sound effects, typography, and visual assets are fully commercial-licensed or custom-synthesized. We never deliver unlicensed copyrighted material."
      },
      {
        question: "How do you ensure the product looks like our actual product?",
        answer: "We composite genuine high-resolution photographic cutouts and vector assets of your real product into synthesized contextual environments, ensuring realistic brand fidelity."
      },
      {
        question: "What is the turnaround time?",
        answer: "Standard production turnaround is 3 to 5 business days from brief approval."
      }
    ],
    badge: "CREATIVE PRODUCTION",
    accentColor: "#FF6B47"
  },
  {
    id: "trade-intelligence",
    slug: "trade",
    name: "Nuuvixx Trade Intelligence",
    division: "Cross-Border Logistics & Documentation Systems",
    tagline: "Automated document reconciliation and discrepancy detection across international trade records.",
    description: "Cross-border trade operations are crippled by mismatches between commercial invoices, packing lists, bills of lading, and purchase orders. A single typo in HS code, gross weight, or consignee details leads to port demurrage fees and customs clearance holds. We provide automated multi-document reconciliation and structured exception reporting.",
    targetAudience: [
      "Export & import documentation teams handling 20+ shipments per month",
      "Freight forwarders and customs clearance brokers",
      "Global manufacturing suppliers coordinating cross-border container loads",
      "Trade financing companies auditing commercial paper"
    ],
    primaryProblems: [
      "Discrepancies in total gross vs net weight across packing list and commercial invoice",
      "Mismatched Harmonized System (HS) codes and inconsistent tariff descriptions",
      "Purchase order line-item quantity variances against shipment container manifests",
      "Costly manual multi-hour document cross-checking by junior operations staff",
      "Port customs holds caused by typographical or currency code inconsistencies"
    ],
    deliverables: [
      "Multi-document side-by-side reconciliation matrix",
      "Automated discrepancy audit identifying line-item, price, weight, and party mismatches",
      "Standardized CSV/JSON structured data export for ERP/TMS ingestion",
      "Pre-clearance documentation risk scorecard with severity indicators",
      "Executive summary of exceptions requiring customs attention"
    ],
    scopeAndExclusions: {
      included: [
        "Structured comparison of commercial invoices, packing lists, and purchase orders",
        "Mathematical checksum validation (unit price x quantity = line total = invoice grand total)",
        "Party name, Incoterm, currency, and container number alignment checks"
      ],
      excluded: [
        "Legal customs brokerage representation or filing on your behalf",
        "Official tariff classification legal counsel or binding government rulings",
        "Guarantee against random customs inspection or customs authority physical seizures"
      ]
    },
    processSteps: [
      {
        step: "01",
        title: "Document Ingestion",
        description: "Submit digital PDFs, scans, or spreadsheets of your shipment's Commercial Invoice, Packing List, and PO."
      },
      {
        step: "02",
        title: "Schema Extraction",
        description: "Our pipeline parses non-standard table formats, line items, item descriptions, and metadata headers."
      },
      {
        step: "03",
        title: "Cross-Reconciliation",
        description: "Algorithms cross-reference every SKU, total weight, quantity, currency, and consignee record for variance."
      },
      {
        step: "04",
        title: "Exception Report Handover",
        description: "Receive a clear exception brief highlighting every discrepancy before shipping documents reach customs brokers."
      }
    ],
    introPricing: {
      range: "Validation Pilot / Custom Scope",
      model: "Document Pilot & Batch Processing",
      note: "Introductory validation pilot: $99 for up to 10 shipment document sets. Enterprise monthly volume tiers available upon request."
    },
    futureRoadmap: "Cloud-native trade document validation SaaS with direct integration into CargoWise, Flexport, and enterprise ERPs.",
    faqs: [
      {
        question: "Can your system handle scanned or messy PDF invoices?",
        answer: "Yes. Our extraction pipeline combines high-accuracy OCR with spatial table analysis to accurately capture multi-page invoices with varied column configurations."
      },
      {
        question: "Does Nuuvixx provide legal customs clearance advice?",
        answer: "No. Nuuvixx provides software and engineering tools for document consistency and mathematical reconciliation. We do not act as licensed customs brokers or legal attorneys."
      },
      {
        question: "Is our shipping data kept confidential?",
        answer: "Strictly. Trade documents contain sensitive pricing and buyer information. We isolate customer data, enforce strict encryption in transit and at rest, and never share commercial data with third parties."
      }
    ],
    badge: "TRADE SYSTEMS",
    accentColor: "#7ECFF4"
  },
  {
    id: "bid-intelligence",
    slug: "bids",
    name: "Nuuvixx Bid Intelligence",
    division: "Procurement Technology & Tender Analysis",
    tagline: "Turn complex 100-page tender documents into actionable qualification briefs in minutes.",
    description: "Small suppliers, specialized contractors, and consulting firms miss lucrative public and commercial contracts because analyzing complex Request for Proposals (RFPs) and government tenders takes days of tedious reading. We parse tenders, extract strict mandatory qualification requirements, map compliance risks, and deliver verified bid qualification briefs.",
    targetAudience: [
      "Small-to-medium enterprise (SME) contractors and technology suppliers",
      "Specialized engineering, IT, and maintenance consulting firms",
      "Bid managers handling tight submission deadlines across municipal and federal portals",
      "Subcontractors seeking to qualify partnership eligibility"
    ],
    primaryProblems: [
      "Hundreds of pages of dense legalese hiding strict mandatory eligibility traps",
      "Missed submission deadlines, tender amendments, and technical Q&A addenda",
      "Wasted dozens of engineering hours bidding on contracts with disqualifying clauses",
      "Manual drafting of compliance matrices and document checklists",
      "Disorganized tender document discovery across scattered public portals"
    ],
    deliverables: [
      "Structured Executive Opportunity Brief (scope, value, timeline, evaluation criteria)",
      "Mandatory Qualification & Eligibility Checklist (pass/fail criteria)",
      "Technical Compliance Matrix template mapped to RFP clauses",
      "Risk analysis highlighting uncapped liabilities, SLA penalties, and submission traps",
      "Tender Amendment & Addendum delta tracker"
    ],
    scopeAndExclusions: {
      included: [
        "In-depth analysis of provided tender and RFP PDFs/DOCXs",
        "Extraction of explicit technical, financial, and certification requirements",
        "Human-verified summary brief and actionable submission checklist"
      ],
      excluded: [
        "Writing your technical proposal or marketing narrative from scratch",
        "Legal opinion on procurement disputes or bid protest representation",
        "Guarantee of tender award or selection by the issuing authority"
      ]
    },
    processSteps: [
      {
        step: "01",
        title: "Tender Ingestion",
        description: "Submit the tender URL, RFP PDF, or tender specification bundle you are considering bidding on."
      },
      {
        step: "02",
        title: "Clause Parsing & Risk Extraction",
        description: "Our intelligence engine breaks down requirements, evaluation point schemes, financial thresholds, and timelines."
      },
      {
        step: "03",
        title: "Engineering Verification",
        description: "A senior analyst verifies ambiguous clauses, certification requirements, and submission formats."
      },
      {
        step: "04",
        title: "Brief & Matrix Delivery",
        description: "You receive your complete Opportunity Brief, Compliance Matrix, and go/no-go qualification verdict."
      }
    ],
    introPricing: {
      range: "$49 – $149",
      model: "Per Tender Research Brief",
      note: "Standard RFP Brief (Under 50 pages): $49 | Complex Multi-Part Tender (50–200 pages): $99 | Full Compliance Matrix & Risk Extraction: $149."
    },
    futureRoadmap: "Automated municipal and national portal opportunity discovery with personalized relevance scoring and automated addendum delta alerts.",
    faqs: [
      {
        question: "Can Nuuvixx guarantee that we will win the contract?",
        answer: "No. Winning bids depend on your pricing, past performance, and agency evaluation. Nuuvixx Bid Intelligence ensures you never miss a mandatory clause, never bid on contracts you are ineligible for, and arrive prepared with a flawless compliance matrix."
      },
      {
        question: "How fast can you process a tender?",
        answer: "Standard Opportunity Briefs are delivered within 24 hours of document submission, giving your bid team maximum runway before deadlines."
      },
      {
        question: "Do you write our bid responses?",
        answer: "Our primary service provides analysis, requirement extraction, compliance checklists, and risk mapping. We do not write entire custom proposal narratives, though our matrices form the foundation of your response."
      }
    ],
    badge: "PROCUREMENT INTELLIGENCE",
    accentColor: "#CCFF00"
  }
];
