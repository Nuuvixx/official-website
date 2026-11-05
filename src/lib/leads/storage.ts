import { LeadStorageAdapter } from "./types";
import { PostgresLeadAdapter } from "./postgresAdapter";
import { LocalFileLeadAdapter } from "./fileAdapter";

let activeAdapter: LeadStorageAdapter | null = null;

export function getLeadStorageAdapter(): {
  adapter: LeadStorageAdapter | null;
  mode: "postgres" | "local_dev" | "unconfigured_production";
} {
  if (process.env.DATABASE_URL || process.env.POSTGRES_URL) {
    if (!activeAdapter || activeAdapter.name !== "PostgreSQL") {
      activeAdapter = new PostgresLeadAdapter();
    }
    return { adapter: activeAdapter, mode: "postgres" };
  }

  // If in production and no database is configured
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_DEV_LOCAL_STORAGE !== "true") {
    return { adapter: null, mode: "unconfigured_production" };
  }

  // Development / Test fallback
  if (!activeAdapter || activeAdapter.name !== "LocalFileDevFallback") {
    activeAdapter = new LocalFileLeadAdapter();
  }
  return { adapter: activeAdapter, mode: "local_dev" };
}
