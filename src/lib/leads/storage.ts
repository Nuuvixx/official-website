import { LeadStorageAdapter } from "./types";
import { PostgresLeadAdapter } from "./postgresAdapter";
import { LocalFileLeadAdapter } from "./fileAdapter";

let activeAdapter: LeadStorageAdapter | null = null;

export function getLeadStorageAdapter(): {
  adapter: LeadStorageAdapter | null;
  mode: "postgres" | "local_dev" | "unconfigured_production";
} {
  const connectionString =
    process.env.APP_DATABASE_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.SUPABASE_DATABASE_URL;

  if (connectionString) {
    if (!activeAdapter || activeAdapter.name !== "PostgreSQL") {
      activeAdapter = new PostgresLeadAdapter();
    }
    return { adapter: activeAdapter, mode: "postgres" };
  }

  // In production, FAIL CLOSED: Never silently fallback to local file or console
  if (process.env.NODE_ENV === "production") {
    return { adapter: null, mode: "unconfigured_production" };
  }

  // Isolated development / test fallback ONLY when NODE_ENV !== "production"
  if (!activeAdapter || activeAdapter.name !== "LocalFileDevFallback") {
    activeAdapter = new LocalFileLeadAdapter();
  }
  return { adapter: activeAdapter, mode: "local_dev" };
}
