import fs from "node:fs/promises";
import path from "node:path";
import pg from "pg";
const { Client } = pg;

async function runRetentionCleanup() {
  const connectionString =
    process.env.RETENTION_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    console.error("[ERROR] Neither RETENTION_DATABASE_URL nor DATABASE_URL is defined.");
    process.exit(1);
  }

  const isRemote = !connectionString.includes("localhost") && !connectionString.includes("127.0.0.1");
  let sslConfig = undefined;

  if (isRemote) {
    let ca = process.env.DATABASE_CA_CERT;
    if (!ca) {
      try {
        const caPath = path.join(process.cwd(), "src", "lib", "leads", "certs", "supabase-root-ca.crt");
        ca = await fs.readFile(caPath, "utf-8");
      } catch {}
    }
    sslConfig = {
      rejectUnauthorized: true,
      ca,
    };
  }

  const client = new Client({
    connectionString,
    ssl: sslConfig,
  });

  try {
    console.log("[RETENTION] Connecting to PostgreSQL with strict TLS validation...");
    await client.connect();

    // Query records eligible for anonymization (resolved/archived and > 90 days old)
    const countCheck = await client.query(`
      SELECT COUNT(*)::int AS count
      FROM commercial_inquiries
      WHERE created_at < NOW() - INTERVAL '90 days'
        AND status IN ('RESOLVED', 'ARCHIVED')
        AND (name != 'REDACTED' OR email != 'redacted@nuuvixx.internal')
    `);

    const eligibleCount = countCheck.rows[0].count;
    console.log(`[RETENTION] Found ${eligibleCount} resolved/archived inquiries older than 90 days.`);

    if (eligibleCount > 0) {
      const purgeRes = await client.query(`
        UPDATE commercial_inquiries
        SET name = 'REDACTED',
            email = 'redacted@nuuvixx.internal',
            company_or_website = 'REDACTED',
            problem = '[RETENTION PURGED]'
        WHERE created_at < NOW() - INTERVAL '90 days'
          AND status IN ('RESOLVED', 'ARCHIVED')
          AND (name != 'REDACTED' OR email != 'redacted@nuuvixx.internal')
        RETURNING id, inquiry_ref;
      `);
      console.log(`[RETENTION] Successfully anonymized ${purgeRes.rows.length} inquiries.`);
    } else {
      console.log("[RETENTION] Zero inquiries require retention redaction at this time.");
    }

    await client.end();
    process.exit(0);
  } catch (err) {
    console.error("[RETENTION CLEANUP ERROR]:", err.message);
    try {
      await client.end();
    } catch {}
    process.exit(1);
  }
}

runRetentionCleanup();
