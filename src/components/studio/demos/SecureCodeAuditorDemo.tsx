"use client";

import { useState } from "react";
import { Play } from "@phosphor-icons/react";
import styles from "./demos.module.css";

const VULNERABLE_CODE_SAMPLE = `// app/actions/workspace.ts - Next.js Server Action (Vibe-coded via LLM)
"use server";
import { createClient } from "@supabase/supabase-js";

// VULN 1: Service role key initialized directly or leaked to client bundle
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Bypasses all RLS policies!
);

export async function deleteWorkspaceProject(projectId: string) {
  // VULN 2: Zero authentication or authorization check on session user!
  // Any anonymous caller can delete any tenant's project by guessing UUID.
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  return { success: !error };
}

-- VULN 3: Supabase SQL Migration (Overly permissive policy)
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow document access"
ON public.user_documents
FOR ALL
USING (true); -- CRITICAL: Allows ANY authenticated or public visitor to read all users' documents!`;

export default function SecureCodeAuditorDemo() {
  const [analyzed, setAnalyzed] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  const handleAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAnalyzed(true);
    }, 600);
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <div className={styles.demoTitleRow}>
          <span className={styles.demoBadge}>Interactive Prototype</span>
          <h4 className={styles.demoTitle}>Nuuvixx Secure: Static Application Security & RLS Analyzer</h4>
        </div>
        <div className={styles.demoControls}>
          <button
            onClick={handleAudit}
            disabled={isAuditing}
            className={styles.actionBtn}
          >
            {isAuditing ? "Scanning Stack..." : "Execute Security Audit"}
            <Play size={14} weight="bold" />
          </button>
        </div>
      </div>

      <div className={styles.demoBody}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "12px" }}>
          Target Codebase Sample: <code>AI-SaaS-Vulnerable-App/actions/workspace.ts</code> (Simulating common vibe-coding auth oversights)
        </p>
        <div className={styles.codeArea}>{VULNERABLE_CODE_SAMPLE}</div>

        {analyzed && (
          <div className={styles.resultsPanel}>
            <div className={styles.scorecard}>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Security Health Score</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueCritical}`}>22 / 100</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Critical Vulnerabilities</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueCritical}`}>2</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>High Severity Risks</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueWarning}`}>1</div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.scoreLabel}>Tenant Isolation</div>
                <div className={`${styles.scoreValue} ${styles.scoreValueCritical}`}>BREACHED</div>
              </div>
            </div>

            <div className={styles.issuesList}>
              <div className={styles.issueCard}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagCritical}`}>CWE-284 · Critical RLS Vulnerability</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#ff6b6b" }}>public.user_documents</span>
                </div>
                <div className={styles.issueTitle}>Universal Public Read/Write via USING (true)</div>
                <div className={styles.issueDetails}>
                  The policy allows any API caller with the public anon key to read, update, and delete all user records in the table, violating basic tenant data isolation.
                </div>
                <div className={styles.remediationCode}>
{`-- Remediation SQL:
DROP POLICY IF EXISTS "Allow document access" ON public.user_documents;
CREATE POLICY "Users can only access own documents"
ON public.user_documents
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);`}
                </div>
              </div>

              <div className={styles.issueCard}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagCritical}`}>CWE-862 · Missing Authorization in Server Action</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#ff6b6b" }}>deleteWorkspaceProject()</span>
                </div>
                <div className={styles.issueTitle}>Unauthenticated mutation using admin service role</div>
                <div className={styles.issueDetails}>
                  The Server Action directly uses the admin service role client without validating the incoming user session or verifying whether the user is an owner of the project.
                </div>
                <div className={styles.remediationCode}>
{`// Remediation Code:
const supabase = await createServerClient(); // Session-scoped user client
const { data: { user } } = await supabase.auth.getUser();
if (!user) throw new Error("Unauthorized");
// Perform query with RLS or explicit owner check:
const { error } = await supabase.from("projects").delete().eq("id", projectId).eq("owner_id", user.id);`}
                </div>
              </div>

              <div className={`${styles.issueCard} ${styles.issueCardPass}`}>
                <div className={styles.issueHeader}>
                  <span className={`${styles.issueTag} ${styles.tagPass}`}>Remediation Blueprint Delivered</span>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#00e676" }}>Nuuvixx Secure Report</span>
                </div>
                <div className={styles.issueTitle}>Ready-to-Merge PR and Action Checklist Generated</div>
                <div className={styles.issueDetails}>
                  Nuuvixx Secure provides early-stage AI SaaS founders with the exact SQL scripts, middleware checks, and env-var isolation rules needed to close vulnerabilities before launch.
                </div>
              </div>
            </div>

            <div className={styles.disclaimer}>
              Nuuvixx Secure · Application Security & RLS Audit Sandbox v2.0
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
