# Nuuvixx Production Deployment Runbook & Operational Guide (v1.0)

> **Target Environment:** Production (`nuuvixx.com`)  
> **Hosting Platform:** Vercel (Next.js 16 App Router)  
> **Database:** Managed Supabase PostgreSQL 17  
> **Status:** Deployment Preparation / Pre-Launch Approval Required  

---

## 1. Production Environment Variables Checklist

Configure these variables in your hosting provider's project settings (e.g. Vercel Project Settings -> Environment Variables) and GitHub Secrets before deploying to production:

### Vercel Serverless Hosting Environment Variables

| Variable Name | Required? | Recommended Production Format | Description |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | **YES** | `postgresql://nuuvixx_app.[PROJECT_REF]:[APP_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require` | Supabase Supavisor Transaction Pooler (port 6543) using restricted `nuuvixx_app` role. Username MUST include `.[PROJECT_REF]`. |
| `DATABASE_CA_CERT` | Optional | `[Contents of supabase-root-ca.crt]` | Overrides file reading if deploying to ephemeral serverless containers without disk access. |
| `LEADS_IP_SALT` | **YES** | Cryptographically random 64-character hex string | Salt used for HMAC-SHA256 IP hashing (GDPR/CCPA compliant rate limiting). |
| `NEXT_PUBLIC_SITE_URL`| **YES** | `https://nuuvixx.com` | Canonical domain used for sitemap, robots.txt, and OpenGraph images. |
| `NEXT_PUBLIC_CONTACT_EMAIL`| **YES** | `hello@nuuvixx.com` | Monitored contact address displayed on inquiries and privacy footer. |
| `LEADS_WEBHOOK_URL`| Optional | `https://discord.com/api/webhooks/...` or Slack incoming webhook | Asynchronous instant notification dispatched upon new verified inquiry. |
| `LEADS_WEBHOOK_SECRET`| Optional | Cryptographically random secret string | Used to sign outbound webhook payloads with `X-Nuuvixx-Signature-256`. |
| `ALLOW_DEV_LOCAL_STORAGE`| **NO** | `false` | Must remain `false` or unset in production so leads never fall back to ephemeral disk. |

### GitHub Actions Secrets (Automated 90-Day Retention Cleanup)

| Secret Name | Required? | Recommended Format | Description |
| :--- | :--- | :--- | :--- |
| `RETENTION_DATABASE_URL` | **YES** | `postgresql://nuuvixx_cleanup.[PROJECT_REF]:[CLEANUP_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require` | Supabase pooled connection string using restricted `nuuvixx_cleanup` role (SELECT & column-level UPDATE on PII fields). |
| `DATABASE_CA_CERT` | Optional | `[Contents of supabase-root-ca.crt]` | Trusted Supabase Root CA certificate (fallback provided by committed cert file). |

---

## 2. Pre-Deployment Verification Protocol

Run the five automated verification checks locally before pushing or triggering a production build:

```bash
# 1. Static code analysis and ESLint rules
npm run lint

# 2. Production build and Turbopack optimization
npm run build

# 3. Unit, parsing, and security tests for Commerce Rescue
npm run test:commerce

# 4. Playwright Chromium browser validation (Desktop + Mobile + Uploads)
npm run test:browser

# 5. Live Supabase PostgreSQL connection, TLS CA check, persistence & deduplication
npm run test:readiness
```

---

## 3. Step-by-Step Deployment Execution

> [!CAUTION]
> Do not execute these commands without explicit administrative confirmation.

### Option A: Git Push via GitHub Vercel Integration (Standard)
1. Ensure all working directory changes are reviewed:
   ```bash
   git status
   ```
2. Stage and commit approved launch files:
   ```bash
   git add .
   git commit -m "feat(commerce): Commerce Rescue v1 and production readiness"
   ```
3. Push to remote repository:
   ```bash
   git push origin main
   ```
4. Monitor the deployment in the Vercel Dashboard until `Ready` (200 OK).

### Option B: Vercel CLI Direct Deployment
```bash
npx vercel --prod
```

---

## 4. Post-Deployment Live Smoke Tests

Immediately upon production DNS propagation, execute these live smoke tests against `https://nuuvixx.com`:

1. **HTTPS & Canonical SSL:**
   * Verify SSL certificate valid for `nuuvixx.com` and `www.nuuvixx.com`.
   * Verify HTTP 301 redirect from `http://` to `https://`.
2. **Commerce Rescue Diagnostic Route:**
   * Visit `https://nuuvixx.com/studio/commerce`.
   * Verify responsive layout on desktop and mobile viewports.
   * Click "Compliant Baseline Feed" -> Confirm 100% pass rate score.
   * Click "Shopify XML Feed" -> Confirm 25% pass rate with 3 errors flagged.
   * Upload test CSV / XML file -> Confirm instant parsing with 0 disk upload latency.
   * Click "Export Diagnostic CSV" and "Export Diagnostic JSON" -> Verify file download.
3. **End-to-End Inquiry Submission (Synthetic Smoke Test):**
   * Navigate to `#intake` on the Commerce Rescue page.
   * Fill out the inquiry form with clearly identified test data:
     * Name: `Production Smoke Tester`
     * Email: `smoke-test@nuuvixx.internal`
     * Store URL: `https://example-smoke-test.com`
     * Scope: `Single-catalog GMC remediation test`
     * Timeline: `Immediate`
     * Consent checkbox: Checked
   * Click "Submit Commercial Inquiry".
   * Verify UI displays green confirmation badge with reference ID (`NX-XXXXXX`).
   * Confirm record appears in Supabase `commercial_inquiries`.
   * Delete the synthetic test record from Supabase via SQL Editor:
     ```sql
     DELETE FROM commercial_inquiries WHERE email = 'smoke-test@nuuvixx.internal';
     ```

---

## 5. Rollback Runbook

If any critical issue or routing defect is observed post-deployment:

1. **Vercel Instant Rollback (Zero Downtime):**
   * Open the Vercel Dashboard -> Project: `nuuvixx` -> **Deployments**.
   * Locate the previous stable production deployment.
   * Click the three dots (`...`) -> Select **Instant Rollback** or **Promote to Production**.
   * Traffic is routed to the previous build within seconds.
2. **Database Backward Compatibility:**
   * Schema migrations (`scripts/migrate.mjs`) are strictly non-destructive.
   * The `commercial_inquiries` table does not alter existing legacy data.
   * Rollbacks do not require database schema downgrades.
