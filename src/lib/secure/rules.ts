import { SecurityFinding, SecurityRule } from "./types";

/**
 * Utility to extract line numbers (1-indexed) and snippet for a matched regex.
 */
function getLineInfo(content: string, matchIndex: number, matchLength: number): {
  lineStart: number;
  lineEnd: number;
  snippet: string;
} {
  const beforeMatch = content.slice(0, matchIndex);
  const lineStart = beforeMatch.split("\n").length;
  const matchLines = content.slice(matchIndex, matchIndex + matchLength).split("\n");
  const lineEnd = lineStart + matchLines.length - 1;

  const lines = content.split("\n");
  const snippetLines = lines.slice(Math.max(0, lineStart - 1), lineEnd);
  const snippet = snippetLines.join("\n").trim();

  return { lineStart, lineEnd, snippet };
}

/**
 * RULE 1: Supabase Service Role Key Leaked or Exposed to Client Context
 */
export const ruleSupabaseServiceKeyLeak: SecurityRule = {
  id: "SEC_SUPABASE_SERVICE_KEY_LEAK",
  name: "Service Role Key Exfiltration or Client Exposure",
  severity: "critical",
  category: "credential_exposure",
  cwe: "CWE-798",
  description:
    "The Supabase service role key bypasses Row-Level Security (RLS) and grants unrestricted superuser access. Referencing it in client components or exposing it via NEXT_PUBLIC_ permits client-side exfiltration.",
  remediation:
    "Never prefix service role keys with NEXT_PUBLIC_. Only initialize service role clients in isolated server-only modules using server-only guards, never in code shipped to client bundles.",
  detect(content: string, filename?: string): SecurityFinding[] {
    const findings: SecurityFinding[] = [];
    const isClientFile =
      content.includes('"use client"') ||
      content.includes("'use client'") ||
      (filename && /client|\.client\./i.test(filename));

    // Regex 1: NEXT_PUBLIC_ containing SERVICE_ROLE
    const nextPublicRegex = /NEXT_PUBLIC_[A-Z0-9_]*SERVICE_ROLE[A-Z0-9_]*/gi;
    let match: RegExpExecArray | null;
    while ((match = nextPublicRegex.exec(content)) !== null) {
      const { lineStart, lineEnd, snippet } = getLineInfo(content, match.index, match[0].length);
      findings.push({
        ruleId: this.id,
        severity: "critical",
        category: this.category,
        title: "Service Role Key Exposed as Public Environment Variable",
        message: `Detected '${match[0]}'. Any environment variable with the 'NEXT_PUBLIC_' prefix is bundled into client JavaScript, allowing visitors to inspect it and acquire administrative privileges.`,
        lineStart,
        lineEnd,
        snippet,
        remediation: "Rename to 'SUPABASE_SERVICE_ROLE_KEY' (without NEXT_PUBLIC_) and ensure it is accessed solely in server code.",
        cwe: this.cwe,
        fixExample: "const supabaseAdmin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);",
      });
    }

    // Regex 2: Referencing SUPABASE_SERVICE_ROLE_KEY in a client component
    if (isClientFile) {
      const serviceKeyRegex = /SUPABASE_SERVICE_ROLE_KEY/g;
      while ((match = serviceKeyRegex.exec(content)) !== null) {
        const { lineStart, lineEnd, snippet } = getLineInfo(content, match.index, match[0].length);
        findings.push({
          ruleId: this.id,
          severity: "critical",
          category: this.category,
          title: "Service Role Key Referenced in 'use client' Component",
          message:
            "Referencing SUPABASE_SERVICE_ROLE_KEY inside a client component risks bundling or leaking the master key to browser runtimes.",
          lineStart,
          lineEnd,
          snippet,
          remediation:
            "Move all service-role operations into a Next.js Server Action or dedicated Route Handler with session authentication.",
          cwe: this.cwe,
        });
      }
    }

    return findings;
  },
};

/**
 * RULE 2: Unauthenticated Next.js Server Action with Database Mutations
 */
export const ruleUnauthenticatedServerAction: SecurityRule = {
  id: "SEC_UNAUTHENTICATED_SERVER_ACTION",
  name: "Unauthenticated Server Action Mutation",
  severity: "critical",
  category: "authorization",
  cwe: "CWE-306",
  description:
    "Next.js Server Actions are public HTTP POST endpoints callable by anyone on the internet. Mutating databases without validating session credentials enables unauthorized tenant data alteration or deletion.",
  remediation:
    "Call an authentication guard (e.g. `const { data: { user } } = await supabase.auth.getUser()`) and verify tenant tenancy ownership prior to executing database writes or deletes.",
  detect(content: string): SecurityFinding[] {
    const findings: SecurityFinding[] = [];
    const hasUseServer = content.includes('"use server"') || content.includes("'use server'");
    if (!hasUseServer) return findings;

    // Split content into lines to analyze export functions
    const lines = content.split("\n");
    let currentFuncStart = -1;
    let currentFuncName = "";
    let funcLines: string[] = [];

    const flushFunc = () => {
      if (currentFuncStart === -1) return;
      const funcBody = funcLines.join("\n");

      // Check if function performs database mutation
      const hasMutation =
        /\.(delete|update|insert|upsert)\s*\(/.test(funcBody) ||
        /\b(DELETE\s+FROM|UPDATE\s+\w+|INSERT\s+INTO)\b/i.test(funcBody);

      // Check if function has session verification
      const hasAuthCheck =
        /auth\.getUser\s*\(/.test(funcBody) ||
        /auth\.getSession\s*\(/.test(funcBody) ||
        /getServerSession\s*\(/.test(funcBody) ||
        /getAuth\s*\(/.test(funcBody) ||
        /verifySession\s*\(/.test(funcBody) ||
        /requireUser\s*\(/.test(funcBody) ||
        /requireAuth\s*\(/.test(funcBody);

      if (hasMutation && !hasAuthCheck) {
        findings.push({
          ruleId: "SEC_UNAUTHENTICATED_SERVER_ACTION",
          severity: "critical",
          category: "authorization",
          title: `Unauthenticated Server Action: '${currentFuncName}'`,
          message: `Server Action '${currentFuncName}' performs database mutations without verifying the caller's session. Any unauthenticated user can invoke this action over HTTP and modify or delete tenant records.`,
          lineStart: currentFuncStart,
          lineEnd: currentFuncStart + funcLines.length - 1,
          snippet: funcLines.slice(0, 5).join("\n") + "\n  ...",
          remediation:
            "Enforce session verification at the top of the function: verify caller authentication and ensure the record belongs to the active tenant.",
          cwe: "CWE-306",
          fixExample: `const { data: { user } } = await supabase.auth.getUser();\nif (!user) throw new Error("Unauthorized");`,
        });
      }

      currentFuncStart = -1;
      currentFuncName = "";
      funcLines = [];
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const exportFuncMatch = line.match(/export\s+(?:async\s+)?function\s+([a-zA-Z0-9_]+)/) ||
                              line.match(/export\s+const\s+([a-zA-Z0-9_]+)\s*=\s*(?:async\s*)?\(/);

      if (exportFuncMatch) {
        flushFunc();
        currentFuncStart = i + 1;
        currentFuncName = exportFuncMatch[1];
        funcLines.push(line);
      } else if (currentFuncStart !== -1) {
        funcLines.push(line);
      }
    }
    flushFunc();

    return findings;
  },
};

/**
 * RULE 3: Permissive Row-Level Security (RLS) Policy (USING true)
 */
export const rulePermissiveRlsPolicy: SecurityRule = {
  id: "SEC_PERMISSIVE_RLS_POLICY",
  name: "Permissive Row-Level Security Policy (USING true)",
  severity: "critical",
  category: "access_control",
  cwe: "CWE-284",
  description:
    "Configuring RLS policies with `USING (true)` or `WITH CHECK (true)` on multi-tenant tables disables authorization boundaries, granting all users unrestricted read or write access to every tenant's data.",
  remediation:
    "Scope the policy condition to the verified user or tenant identifier, such as `USING (auth.uid() = user_id)` or `USING (tenant_id = (SELECT tenant_id FROM user_profiles WHERE id = auth.uid()))`.",
  detect(content: string): SecurityFinding[] {
    const findings: SecurityFinding[] = [];

    // Regex to match CREATE POLICY ... USING (true) or WITH CHECK (true)
    const policyRegex = /CREATE\s+POLICY\s+["']?([^"'\n]+)["']?\s+ON\s+([a-zA-Z0-9_.]+)[^;]+?(USING\s*\(\s*true\s*\)|WITH\s+CHECK\s*\(\s*true\s*\))/gi;

    let match: RegExpExecArray | null;
    while ((match = policyRegex.exec(content)) !== null) {
      const policyName = match[1].trim();
      const tableName = match[2].trim();
      const permissiveClause = match[3].trim();
      const { lineStart, lineEnd, snippet } = getLineInfo(content, match.index, match[0].length);

      findings.push({
        ruleId: this.id,
        severity: "critical",
        category: this.category,
        title: `Overly Permissive RLS Policy '${policyName}' on table '${tableName}'`,
        message: `Policy '${policyName}' uses '${permissiveClause}'. This completely bypasses tenant isolation on table '${tableName}', allowing any authenticated or anonymous user to query or tamper with all records.`,
        lineStart,
        lineEnd,
        snippet,
        remediation: `Scope policy to authenticated tenant: Replace '${permissiveClause}' with 'USING (auth.uid() = user_id)' or your multi-tenant organization check.`,
        cwe: this.cwe,
        fixExample: `CREATE POLICY "${policyName}" ON ${tableName}\n  FOR ALL\n  USING (auth.uid() = user_id);`,
      });
    }

    return findings;
  },
};

/**
 * RULE 4: Exposed Environment Secret via NEXT_PUBLIC_
 */
export const ruleExposedEnvSecret: SecurityRule = {
  id: "SEC_EXPOSED_ENV_SECRET",
  name: "Exposed Private Key via NEXT_PUBLIC_ Prefix",
  severity: "high",
  category: "credential_exposure",
  cwe: "CWE-200",
  description:
    "Variables starting with NEXT_PUBLIC_ are inlined into client JavaScript bundles at build time. Prefixing sensitive secrets with NEXT_PUBLIC_ leaks them publicly.",
  remediation:
    "Remove NEXT_PUBLIC_ prefix from backend secrets like Stripe Secret Keys, OpenAI API keys, database credentials, or signing tokens.",
  detect(content: string): SecurityFinding[] {
    const findings: SecurityFinding[] = [];
    const regex = /NEXT_PUBLIC_[A-Z0-9_]*(SECRET|PRIVATE_KEY|API_KEY|PASSWORD|TOKEN)[A-Z0-9_]*/gi;

    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
      const varName = match[0];
      // Allow well-known public tokens like NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY or NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
      if (/publishable|public_key|anon_key/i.test(varName)) {
        continue;
      }

      const { lineStart, lineEnd, snippet } = getLineInfo(content, match.index, varName.length);
      findings.push({
        ruleId: this.id,
        severity: "high",
        category: this.category,
        title: `Confidential Secret Key Leaked in Public Variable '${varName}'`,
        message: `The variable '${varName}' appears to store private credentials but has the 'NEXT_PUBLIC_' prefix. This exposes the secret in browser network requests and source maps.`,
        lineStart,
        lineEnd,
        snippet,
        remediation: `Remove 'NEXT_PUBLIC_' prefix and access '${varName.replace("NEXT_PUBLIC_", "")}' only from server-side code.`,
        cwe: this.cwe,
      });
    }

    return findings;
  },
};

/**
 * RULE 5: Unsafe Raw SQL String Concatenation or Interpolation
 */
export const ruleUnsafeDirectSql: SecurityRule = {
  id: "SEC_UNSAFE_DIRECT_SQL",
  name: "Unsafe SQL String Concatenation",
  severity: "critical",
  category: "sql_injection",
  cwe: "CWE-89",
  description:
    "Directly interpolating variables into SQL statements creates SQL injection vulnerabilities where malicious user inputs can bypass authentication or execute arbitrary database commands.",
  remediation:
    "Use parameterized queries, prepared statements, or ORM builder methods (e.g. `$1, $2` with `client.query(sql, [values])`).",
  detect(content: string): SecurityFinding[] {
    const findings: SecurityFinding[] = [];

    // Regex for template literals in SQL queries: query(`SELECT ... ${...}`) or sql`... ${...}`
    const sqlInterpolationRegex = /(?:\.query|\.execute|raw|run)\s*\(\s*`[^`]*\b(?:SELECT|INSERT|UPDATE|DELETE|FROM|WHERE)\b[^`]*\$\{[^}]+\}[^`]*`/gi;

    let match: RegExpExecArray | null;
    while ((match = sqlInterpolationRegex.exec(content)) !== null) {
      const { lineStart, lineEnd, snippet } = getLineInfo(content, match.index, match[0].length);
      findings.push({
        ruleId: this.id,
        severity: "critical",
        category: this.category,
        title: "SQL Injection via Template String Interpolation",
        message:
          "Detected raw template literal string interpolation inside a SQL execution method. User-controlled input placed directly in SQL strings allows attackers to alter query logic.",
        lineStart,
        lineEnd,
        snippet,
        remediation:
          "Refactor to parameterized queries using placeholders (e.g., $1, $2) and pass values as a separate parameters array.",
        cwe: this.cwe,
        fixExample: "await client.query('SELECT * FROM users WHERE tenant_id = $1', [tenantId]);",
      });
    }

    // Also check string concatenation in SQL: "SELECT ... " + id
    const sqlConcatRegex = /(?:\.query|\.execute)\s*\(\s*["']\s*(?:SELECT|UPDATE|DELETE|INSERT)[^"']*["']\s*\+\s*[a-zA-Z0-9_.]+/gi;
    while ((match = sqlConcatRegex.exec(content)) !== null) {
      const { lineStart, lineEnd, snippet } = getLineInfo(content, match.index, match[0].length);
      findings.push({
        ruleId: this.id,
        severity: "critical",
        category: this.category,
        title: "SQL Injection via String Concatenation",
        message:
          "Detected string concatenation (+) inside a SQL execution call. This exposes the database to injection attacks.",
        lineStart,
        lineEnd,
        snippet,
        remediation: "Use parameterized queries ($1, $2) instead of string concatenation.",
        cwe: this.cwe,
      });
    }

    return findings;
  },
};

export const ALL_SECURITY_RULES: SecurityRule[] = [
  ruleSupabaseServiceKeyLeak,
  ruleUnauthenticatedServerAction,
  rulePermissiveRlsPolicy,
  ruleExposedEnvSecret,
  ruleUnsafeDirectSql,
];
