import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { CommercialInquiryInput, CommercialInquiryRecord } from "@/lib/leads/types";
import { anonymizeIp, computeIdempotencyHash } from "@/lib/leads/security";
import { getLeadStorageAdapter } from "@/lib/leads/storage";
import { dispatchLeadNotification } from "@/lib/leads/webhookNotifier";

const ALLOWED_SERVICES = new Set([
  "commerce-rescue",
  "nuuvixx-secure",
  "nuuvixx-creative",
  "trade-intelligence",
  "bid-intelligence",
  "custom-enterprise",
]);

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@nuuvixx.com";

// In-memory sliding-window IP rate limiter (pre-filter)
const ipRequestTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5; // 5 inquiries per 10 minutes

function checkMemoryRateLimit(ipHash: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const timestamps = ipRequestTimestamps.get(ipHash) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= RATE_LIMIT_MAX) {
    const oldest = validTimestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000));
    ipRequestTimestamps.set(ipHash, validTimestamps);
    return { allowed: false, retryAfterSeconds };
  }

  validTimestamps.push(now);
  ipRequestTimestamps.set(ipHash, validTimestamps);

  // Periodic garbage collection
  if (ipRequestTimestamps.size > 2000) {
    for (const [key, val] of ipRequestTimestamps.entries()) {
      if (val.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        ipRequestTimestamps.delete(key);
      }
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp) return firstIp;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp && realIp.trim()) return realIp.trim();
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp && cfIp.trim()) return cfIp.trim();
  return "127.0.0.1";
}

// -----------------------------------------------------------------------------
// Explicitly reject non-POST methods to prevent public discovery or retrieval
// -----------------------------------------------------------------------------
export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method not allowed. Use POST to submit commercial inquiries." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function POST(request: Request) {
  try {
    // 1. Content-Type and Payload Size Validation
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Unsupported Media Type. Content-Type must be application/json." },
        { status: 415 }
      );
    }

    const contentLengthHeader = request.headers.get("content-length");
    if (contentLengthHeader) {
      const contentLength = parseInt(contentLengthHeader, 10);
      if (!isNaN(contentLength) && contentLength > 65536) { // 64KB max
        return NextResponse.json(
          { success: false, error: "Payload Too Large. Inquiries must not exceed 64KB." },
          { status: 413 }
        );
      }
    }

    // 2. Client Identity & Abuse Protection
    const rawIp = getClientIp(request);
    const ipHash = anonymizeIp(rawIp);

    // In-memory rate limiting check (fast pre-filter)
    const memRateCheck = checkMemoryRateLimit(ipHash);
    if (!memRateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many inquiries submitted from this network. Please wait a few minutes before trying again or email us directly at ${CONTACT_EMAIL}.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(memRateCheck.retryAfterSeconds) },
        }
      );
    }

    // 3. Safe JSON Body Parsing
    let body: unknown;
    try {
      const rawBody = await request.text();
      if (Buffer.byteLength(rawBody, "utf8") > 65536) {
        return NextResponse.json(
          { success: false, error: "Payload Too Large. Inquiries must not exceed 64KB." },
          { status: 413 }
        );
      }
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: "Request payload must be a JSON object." },
        { status: 400 }
      );
    }

    const payload = body as Partial<CommercialInquiryInput>;

    // 4. Anti-spam Honeypot Check (Silently drop bots without processing)
    if (payload.honeypot && typeof payload.honeypot === "string" && payload.honeypot.trim() !== "") {
      return NextResponse.json(
        { success: true, message: "Inquiry received." },
        { status: 200 }
      );
    }

    // 5. Strict Input Validation & Type Boundaries
    const { name, email, companyOrWebsite, service, problem, consent } = payload;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }
    if (name.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: "Name must not exceed 100 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid business email address." },
        { status: 400 }
      );
    }
    if (email.trim().length > 120) {
      return NextResponse.json(
        { success: false, error: "Email address must not exceed 120 characters." },
        { status: 400 }
      );
    }

    if (!companyOrWebsite || typeof companyOrWebsite !== "string" || companyOrWebsite.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your company name or website URL (minimum 2 characters)." },
        { status: 400 }
      );
    }
    if (companyOrWebsite.trim().length > 150) {
      return NextResponse.json(
        { success: false, error: "Company or website URL must not exceed 150 characters." },
        { status: 400 }
      );
    }

    if (!service || typeof service !== "string" || !ALLOWED_SERVICES.has(service.trim())) {
      return NextResponse.json(
        { success: false, error: "Please select a valid commercial service division." },
        { status: 400 }
      );
    }

    if (!problem || typeof problem !== "string" || problem.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a brief description of your technical problem or project scope (minimum 10 characters)." },
        { status: 400 }
      );
    }
    if (problem.trim().length > 5000) {
      return NextResponse.json(
        { success: false, error: "Problem description must not exceed 5,000 characters." },
        { status: 400 }
      );
    }

    if (consent !== true) {
      return NextResponse.json(
        { success: false, error: "You must acknowledge confidentiality terms to submit an inquiry." },
        { status: 400 }
      );
    }

    // Optional fields with type assertions
    const budget = typeof payload.budget === "string" && payload.budget.trim().length > 0
      ? payload.budget.trim().slice(0, 100)
      : "Not specified";

    const timeline = typeof payload.timeline === "string" && payload.timeline.trim().length > 0
      ? payload.timeline.trim().slice(0, 100)
      : "Flexible";

    const sourceContext = typeof payload.sourceContext === "string" && payload.sourceContext.trim().length > 0
      ? payload.sourceContext.trim().slice(0, 150)
      : "Website direct";

    // 6. Compute Cryptographic Idempotency Hash & Build Record
    const idempotencyHash = computeIdempotencyHash(email, service, problem);
    const inquiryRef = `inq_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
    const id = crypto.randomUUID();

    const inquiryRecord: CommercialInquiryRecord = {
      id,
      inquiryRef,
      idempotencyHash,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      companyOrWebsite: companyOrWebsite.trim(),
      service: service.trim(),
      problem: problem.trim(),
      budget,
      timeline,
      sourceContext,
      ipHash,
      status: "NEW",
      createdAt: new Date().toISOString(),
      receivedAt: new Date().toISOString(),
    };

    // 7. Resolve Durable Storage Adapter
    const { adapter, mode } = getLeadStorageAdapter();

    if (mode === "unconfigured_production" || !adapter) {
      console.error("[Inquiry Storage Critical] Production durable storage is unconfigured. DATABASE_URL is missing.");
      return NextResponse.json(
        {
          success: false,
          error: `Inquiry intake is currently undergoing scheduled infrastructure updates. Please email our engineering desk directly at ${CONTACT_EMAIL}.`,
        },
        { status: 503 }
      );
    }

    // 8. Distributed Rate Limit Check (Multi-instance Cross-Container)
    const distRateCheck = await adapter.checkDistributedRateLimit(ipHash, 10, 5);
    if (!distRateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many inquiries submitted from this network. Please wait a few minutes before trying again or email us directly at ${CONTACT_EMAIL}.`,
        },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    // 9. Execute Durable Server-Side Persistence
    const saveResult = await adapter.saveInquiry(inquiryRecord);

    if (!saveResult.success) {
      console.error(`[Inquiry Storage Error] Failed to persist inquiry for ref: ${inquiryRecord.inquiryRef}`);
      return NextResponse.json(
        {
          success: false,
          error: `An unexpected storage failure occurred while recording your inquiry. Please email our founding engineers directly at ${CONTACT_EMAIL}.`,
        },
        { status: 503 }
      );
    }

    // 10. Privacy-Sanitized Operational Logging (ZERO PII leaked in logs)
    console.log(`[LEAD_PROCESSED] ref=${saveResult.inquiryRef} service=${inquiryRecord.service} isDuplicate=${Boolean(saveResult.isDuplicate)} status=PERSISTED`);

    // 11. Asynchronous Webhook Notification Dispatch
    if (!saveResult.isDuplicate) {
      // Fire notification in background; do not block or fail client response if remote webhook is slow
      dispatchLeadNotification(inquiryRecord).catch((webhookErr) => {
        console.warn(`[Webhook Background Error] Non-fatal notification failure for ref: ${saveResult.inquiryRef}:`, (webhookErr as Error).message);
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out. We have received your inquiry and will review the details you provided.",
      inquiryId: saveResult.inquiryRef,
    });
  } catch (err: unknown) {
    console.error("[Inquiry API Unhandled Error]:", (err as Error).message);
    return NextResponse.json(
      {
        success: false,
        error: `An unexpected server error occurred while processing your request. Please email us directly at ${CONTACT_EMAIL}.`,
      },
      { status: 500 }
    );
  }
}
