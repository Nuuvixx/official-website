export interface CommercialInquiryInput {
  name: string;
  email: string;
  companyOrWebsite: string;
  service: string;
  problem: string;
  budget?: string;
  timeline?: string;
  sourceContext?: string;
  consent: boolean;
  honeypot?: string;
}

export interface CommercialInquiryRecord {
  id: string; // UUID v4
  inquiryRef: string; // Human-friendly reference ID: inq_17938...
  idempotencyHash: string; // SHA-256 hash for deduplication
  name: string;
  email: string;
  companyOrWebsite: string;
  service: string;
  problem: string;
  budget: string;
  timeline: string;
  sourceContext: string;
  ipHash: string; // Anonymized SHA-256 hash of client IP
  status: "NEW" | "CONTACTED" | "RESOLVED" | "ARCHIVED";
  createdAt: string;
  receivedAt?: string;
}

export interface LeadPersistenceResult {
  success: boolean;
  id: string;
  inquiryRef: string;
  isDuplicate?: boolean;
  error?: string;
}

export interface LeadStorageAdapter {
  name: string;
  saveInquiry(record: CommercialInquiryRecord): Promise<LeadPersistenceResult>;
  checkDistributedRateLimit(ipHash: string, windowMinutes: number, maxRequests: number): Promise<{ allowed: boolean; count: number }>;
  healthCheck(): Promise<boolean>;
}
