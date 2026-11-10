export interface SampleCodeSnippet {
  id: string;
  name: string;
  filename: string;
  description: string;
  code: string;
}

export const SAMPLE_VULNERABLE_ACTION: SampleCodeSnippet = {
  id: "vibe-coded-saas",
  name: "Vibe-Coded Next.js Action (Vulnerable)",
  filename: "app/actions/workspace.ts",
  description: "Common AI-scaffolded Server Action with unauthenticated mutations and exposed keys.",
  code: `// app/actions/workspace.ts - Next.js Server Action
"use server";

import { createClient } from "@supabase/supabase-js";

// VULN 1: Service role key initialized with NEXT_PUBLIC_ prefix
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY! // Leaks master admin secret to client!
);

// VULN 2: Exported Server Action has zero session / auth check
export async function deleteWorkspaceProject(projectId: string) {
  // Any public caller can invoke this HTTP endpoint with any arbitrary UUID
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  return { success: !error };
}

// VULN 3: Overly permissive RLS migration
/*
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public document access"
ON public.user_documents
FOR ALL
USING (true); -- Permissive access allows cross-tenant leaks!
*/`,
};

export const SAMPLE_SQL_MIGRATION: SampleCodeSnippet = {
  id: "permissive-sql",
  name: "Supabase SQL Policies & Direct SQL",
  filename: "supabase/migrations/20261108_policies.sql",
  description: "Database policies and server functions with permissive clauses and SQL concatenation.",
  code: `-- supabase/migrations/20261108_policies.sql
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_invoices ENABLE ROW LEVEL SECURITY;

-- VULN 1: Permissive access policy on organization data
CREATE POLICY "Public organization access"
ON public.organizations
FOR ALL
USING (true);

-- VULN 2: Permissive billing invoice access
CREATE POLICY "Allow invoice download"
ON public.billing_invoices
FOR SELECT
USING (true);

// VULN 3: Server function interpolating direct SQL
export async function queryInvoicesByOrg(dbClient: any, orgId: string) {
  // Vulnerable to SQL injection via unescaped string concatenation
  return await dbClient.query("SELECT * FROM billing_invoices WHERE org_id = " + orgId);
}`,
};

export const SAMPLE_HARDENED_APP: SampleCodeSnippet = {
  id: "hardened-tenant-app",
  name: "Hardened Production Stack (Clean)",
  filename: "app/actions/workspace.ts",
  description: "Audited architecture with session guards, tenant ownership verification, and user-scoped RLS.",
  code: `// app/actions/workspace.ts - Audited Production Server Action
"use server";

import { createClient } from "@/lib/supabase/server";

export async function deleteWorkspaceProject(projectId: string) {
  const supabase = await createClient();

  // 1. Mandatory authenticated session verification
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Authentication required to modify workspace assets.");
  }

  // 2. Tenant isolation check: Scoped to user_id ownership
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error("Failed to delete project or unauthorized.");
  }

  return { success: true };
}

/*
-- HARDENED ROW-LEVEL SECURITY POLICY
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only manage their own documents"
ON public.user_documents
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
*/`,
};

export const ALL_SAMPLE_SNIPPETS: SampleCodeSnippet[] = [
  SAMPLE_VULNERABLE_ACTION,
  SAMPLE_SQL_MIGRATION,
  SAMPLE_HARDENED_APP,
];

