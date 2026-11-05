import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { CommercialInquiryRecord, LeadPersistenceResult, LeadStorageAdapter } from "./types";

// In-memory idempotency store for local development / test runs
const localIdempotencyMap = new Map<string, { id: string; inquiryRef: string }>();
const localRateLimitMap = new Map<string, number[]>();

export class LocalFileLeadAdapter implements LeadStorageAdapter {
  readonly name = "LocalFileDevFallback";

  async healthCheck(): Promise<boolean> {
    return true;
  }

  async checkDistributedRateLimit(
    ipHash: string,
    windowMinutes: number,
    maxRequests: number
  ): Promise<{ allowed: boolean; count: number }> {
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;
    const timestamps = localRateLimitMap.get(ipHash) || [];
    const recent = timestamps.filter((t) => now - t < windowMs);

    if (recent.length >= maxRequests) {
      return { allowed: false, count: recent.length };
    }

    recent.push(now);
    localRateLimitMap.set(ipHash, recent);
    return { allowed: true, count: recent.length };
  }

  async saveInquiry(record: CommercialInquiryRecord): Promise<LeadPersistenceResult> {
    // 1. Idempotency deduplication check
    const existing = localIdempotencyMap.get(record.idempotencyHash);
    if (existing) {
      return {
        success: true,
        id: existing.id,
        inquiryRef: existing.inquiryRef,
        isDuplicate: true,
      };
    }

    localIdempotencyMap.set(record.idempotencyHash, {
      id: record.id,
      inquiryRef: record.inquiryRef,
    });

    // 2. Local JSONL file storage with temporary directory fallback
    const primaryDir = path.join(process.cwd(), ".leads");
    const primaryFile = path.join(primaryDir, "inquiries.jsonl");

    try {
      await fs.mkdir(primaryDir, { recursive: true });
      await fs.appendFile(primaryFile, JSON.stringify(record) + "\n", "utf-8");
      return {
        success: true,
        id: record.id,
        inquiryRef: record.inquiryRef,
        isDuplicate: false,
      };
    } catch {
      try {
        const fallbackDir = path.join(os.tmpdir(), "nuuvixx-leads");
        await fs.mkdir(fallbackDir, { recursive: true });
        const fallbackFile = path.join(fallbackDir, "inquiries.jsonl");
        await fs.appendFile(fallbackFile, JSON.stringify(record) + "\n", "utf-8");
        return {
          success: true,
          id: record.id,
          inquiryRef: record.inquiryRef,
          isDuplicate: false,
        };
      } catch (fallbackErr) {
        const errMessage = `Local file persistence failed: ${(fallbackErr as Error).message}`;
        console.error("[LocalFileLeadAdapter Error]:", errMessage);
        return {
          success: false,
          id: record.id,
          inquiryRef: record.inquiryRef,
          error: errMessage,
        };
      }
    }
  }
}
