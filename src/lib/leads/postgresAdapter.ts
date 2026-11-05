import fs from "node:fs";
import path from "node:path";
import { Pool, PoolConfig } from "pg";
import { CommercialInquiryRecord, LeadPersistenceResult, LeadStorageAdapter } from "./types";

let poolInstance: Pool | null = null;

function getSslConfig(connectionString: string): PoolConfig["ssl"] {
  const isRemote = !connectionString.includes("localhost") && !connectionString.includes("127.0.0.1");
  if (!isRemote) return undefined;

  let ca = process.env.DATABASE_CA_CERT;
  if (!ca && process.env.DATABASE_CA_FILE) {
    try {
      ca = fs.readFileSync(process.env.DATABASE_CA_FILE, "utf-8");
    } catch (e) {
      console.error("[PostgresPool CA File Read Error]:", (e as Error).message);
    }
  }

  // Automatic trusted Supabase Root CA resolution if connecting to Supabase
  if (!ca && (connectionString.includes("supabase.co") || connectionString.includes("supabase.com"))) {
    try {
      const defaultCertPath = path.join(process.cwd(), "src", "lib", "leads", "certs", "supabase-root-ca.crt");
      if (fs.existsSync(defaultCertPath)) {
        ca = fs.readFileSync(defaultCertPath, "utf-8");
      }
    } catch {}
  }

  return {
    rejectUnauthorized: true,
    ca: ca || undefined,
  };
}

function getPool(): Pool {
  if (poolInstance) return poolInstance;

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error("PostgreSQL connection string missing (DATABASE_URL or POSTGRES_URL).");
  }

  const config: PoolConfig = {
    connectionString,
    max: 5, // Serverless-friendly max connection pool size
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000,
    ssl: getSslConfig(connectionString),
  };

  poolInstance = new Pool(config);

  poolInstance.on("error", (err) => {
    // Avoid leaking connection strings or credentials
    console.error("[PostgresPool Client Error]:", err.message);
  });

  return poolInstance;
}

export function getPostgresPool(): Pool {
  return getPool();
}

export class PostgresLeadAdapter implements LeadStorageAdapter {
  readonly name = "PostgreSQL";

  async healthCheck(): Promise<boolean> {
    try {
      const pool = getPool();
      const res = await pool.query("SELECT 1 AS healthy");
      return res.rowCount !== null && res.rowCount > 0;
    } catch {
      return false;
    }
  }

  async checkDistributedRateLimit(
    ipHash: string,
    windowMinutes: number,
    maxRequests: number
  ): Promise<{ allowed: boolean; count: number }> {
    try {
      const pool = getPool();

      const query = `
        SELECT COUNT(*)::int AS count
        FROM commercial_inquiries
        WHERE ip_hash = $1
          AND created_at > (NOW() - ($2 || ' minutes')::interval);
      `;

      const res = await pool.query(query, [ipHash, String(windowMinutes)]);
      const count = Number(res.rows[0]?.count || 0);

      return {
        allowed: count < maxRequests,
        count,
      };
    } catch (err: unknown) {
      console.warn("[PostgresLeadAdapter Distributed Rate Check Fallback]:", (err as Error).message);
      // Fallback to allowing request if rate check query fails, so DB transient issue doesn't block users
      return { allowed: true, count: 0 };
    }
  }

  async saveInquiry(record: CommercialInquiryRecord): Promise<LeadPersistenceResult> {
    try {
      const pool = getPool();

      const insertQuery = `
        INSERT INTO commercial_inquiries (
          id, inquiry_ref, idempotency_hash, name, email, company_or_website,
          service, problem, budget, timeline, source_context, ip_hash, status, created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        )
        ON CONFLICT (idempotency_hash) DO NOTHING
        RETURNING id, inquiry_ref;
      `;

      const values = [
        record.id,
        record.inquiryRef,
        record.idempotencyHash,
        record.name,
        record.email,
        record.companyOrWebsite,
        record.service,
        record.problem,
        record.budget,
        record.timeline,
        record.sourceContext,
        record.ipHash,
        record.status,
        record.createdAt,
      ];

      const res = await pool.query(insertQuery, values);

      if (res.rows.length > 0) {
        return {
          success: true,
          id: res.rows[0].id,
          inquiryRef: res.rows[0].inquiry_ref,
          isDuplicate: false,
        };
      }

      // If conflict occurred, retrieve existing inquiry reference
      const selectQuery = `
        SELECT id, inquiry_ref
        FROM commercial_inquiries
        WHERE idempotency_hash = $1
        LIMIT 1;
      `;
      const existingRes = await pool.query(selectQuery, [record.idempotencyHash]);
      if (existingRes.rows.length > 0) {
        return {
          success: true,
          id: existingRes.rows[0].id,
          inquiryRef: existingRes.rows[0].inquiry_ref,
          isDuplicate: true,
        };
      }

      return {
        success: true,
        id: record.id,
        inquiryRef: record.inquiryRef,
        isDuplicate: true,
      };
    } catch (err: unknown) {
      const errorMessage = (err as Error).message;
      console.error("[PostgresLeadAdapter Save Error]:", errorMessage);
      return {
        success: false,
        id: record.id,
        inquiryRef: record.inquiryRef,
        error: errorMessage,
      };
    }
  }
}
