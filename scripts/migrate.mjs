import fs from "node:fs/promises";
import path from "node:path";
import pg from "pg";
const { Client } = pg;

async function runMigration() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    console.error("[ERROR] DATABASE_URL or POSTGRES_URL environment variable is not defined.");
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
    console.log("[MIGRATE] Connecting to PostgreSQL with strict TLS verification...");
    await client.connect();

    const schemaPath = path.join(process.cwd(), "src", "lib", "leads", "schema.sql");
    const sql = await fs.readFile(schemaPath, "utf-8");

    console.log("[MIGRATE] Applying schema from src/lib/leads/schema.sql...");
    await client.query(sql);

    console.log("[MIGRATE] ✓ Schema applied successfully.");

    // Validate table creation
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'commercial_inquiries'
    `);

    if (res.rows.length === 0) {
      throw new Error("Table 'commercial_inquiries' was not found after migration.");
    }

    console.log("[MIGRATE] ✓ Verified table 'commercial_inquiries' exists.");

    await client.end();
    process.exit(0);
  } catch (err) {
    console.error("[MIGRATE FAILED]:", err.message);
    try {
      await client.end();
    } catch {}
    process.exit(1);
  }
}

runMigration();
