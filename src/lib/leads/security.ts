import crypto from "node:crypto";

/**
 * Anonymizes client IP address using SHA-256 HMAC with server-side salt.
 * Ensures zero plaintext IP storage, complying with GDPR/CCPA data minimization.
 */
export function anonymizeIp(ip: string): string {
  const ipSalt = process.env.LEADS_IP_SALT;
  if (process.env.NODE_ENV === "production" && !ipSalt) {
    throw new Error("LEADS_IP_SALT is required for production inquiry intake");
  }
  const cleanIp = ip.split(",")[0].trim().replace(/:\d+$/, "");
  return crypto.createHmac("sha256", ipSalt || "local-development-only").update(cleanIp).digest("hex").slice(0, 32);
}

/**
 * Computes an idempotency hash for duplicate submission detection.
 * Combines normalized email, service, sanitized problem, and a 10-minute time window.
 */
export function computeIdempotencyHash(
  email: string,
  service: string,
  problem: string,
  windowMinutes: number = 10
): string {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedService = service.trim().toLowerCase();
  // Normalize problem snippet (first 300 chars, collapse whitespace)
  const normalizedProblem = problem.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 300);
  
  // Quantize time into windows (e.g. 10 minutes)
  const timeWindow = Math.floor(Date.now() / (windowMinutes * 60 * 1000));

  return crypto
    .createHash("sha256")
    .update(`${normalizedEmail}|${normalizedService}|${normalizedProblem}|${timeWindow}`)
    .digest("hex");
}

/**
 * Signs an outbound webhook payload using HMAC-SHA256.
 */
export function signWebhookPayload(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Sanitizes an error message or identifier for logging without exposing PII.
 */
export function sanitizeLogId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_\-]/g, "");
}
