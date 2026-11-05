-- ==============================================================================
-- Nuuvixx Production Database Least-Privilege Role Setup
-- For Supabase SQL Editor or Direct PostgreSQL DBA Execution
-- ==============================================================================
--
-- This script provisions two strictly isolated, non-admin roles:
-- 1. `nuuvixx_app`     : Runtime web application role (SELECT & INSERT only, no DDL, no DELETE/UPDATE)
-- 2. `nuuvixx_cleanup` : Scheduled retention role (SELECT & column-level UPDATE on PII fields only for resolved/archived leads)
--
-- INSTRUCTIONS FOR SUPABASE DASHBOARD:
-- 1. Open Supabase Dashboard -> Select your Project -> SQL Editor -> New Query.
-- 2. Generate two independent, strong 32+ character passwords (alphanumeric + safe symbols).
--    (Note: If passwords include special characters like @ or #, percent-encode them in connection URLs).
-- 3. Replace 'REPLACE_WITH_STRONG_APP_PASSWORD' and 'REPLACE_WITH_STRONG_CLEANUP_PASSWORD' below.
-- 4. Click 'Run' to execute.
-- 5. Obtain your Project Ref and Pooler Host from:
--    Supabase Dashboard -> Project Settings -> Database -> Connection string
--    - For Vercel Serverless (Supavisor Transaction Pooler, Port 6543):
--      DATABASE_URL=postgresql://nuuvixx_app.[PROJECT_REF]:[APP_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
--    - For Scheduled Cleanup Worker (Port 6543 or Port 5432):
--      RETENTION_DATABASE_URL=postgresql://nuuvixx_cleanup.[PROJECT_REF]:[CLEANUP_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- PART 1: Provision `nuuvixx_app` (Web Application Runtime Role)
-- ------------------------------------------------------------------------------

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'nuuvixx_app') THEN
    CREATE ROLE nuuvixx_app WITH LOGIN 
      PASSWORD 'REPLACE_WITH_STRONG_APP_PASSWORD'
      NOSUPERUSER 
      NOCREATEDB 
      NOCREATEROLE 
      NOINHERIT;
  ELSE
    ALTER ROLE nuuvixx_app WITH LOGIN 
      PASSWORD 'REPLACE_WITH_STRONG_APP_PASSWORD'
      NOSUPERUSER 
      NOCREATEDB 
      NOCREATEROLE 
      NOINHERIT;
  END IF;
END $$;

-- Lock search path to public schema
ALTER ROLE nuuvixx_app SET search_path = public, pg_catalog;

-- Connect and schema usage
GRANT CONNECT ON DATABASE postgres TO nuuvixx_app;
GRANT USAGE ON SCHEMA public TO nuuvixx_app;

-- Strictly grant SELECT and INSERT on commercial_inquiries (for inquiry saves, deduplication & rate limiting)
GRANT SELECT, INSERT ON TABLE public.commercial_inquiries TO nuuvixx_app;

-- Explicitly revoke destructive and modification permissions
REVOKE UPDATE, DELETE, TRUNCATE, REFERENCES ON TABLE public.commercial_inquiries FROM nuuvixx_app;
REVOKE CREATE ON SCHEMA public FROM nuuvixx_app;

-- Block public API access from Supabase PostgREST anon and authenticated roles
REVOKE ALL ON TABLE public.commercial_inquiries FROM anon, authenticated, public;

-- Enable Row Level Security (RLS)
ALTER TABLE public.commercial_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for nuuvixx_app
DROP POLICY IF EXISTS nuuvixx_app_insert_policy ON public.commercial_inquiries;
CREATE POLICY nuuvixx_app_insert_policy ON public.commercial_inquiries
  FOR INSERT TO nuuvixx_app
  WITH CHECK (true);

DROP POLICY IF EXISTS nuuvixx_app_select_policy ON public.commercial_inquiries;
CREATE POLICY nuuvixx_app_select_policy ON public.commercial_inquiries
  FOR SELECT TO nuuvixx_app
  USING (true);


-- ------------------------------------------------------------------------------
-- PART 2: Provision `nuuvixx_cleanup` (Dedicated 90-Day Retention Worker Role)
-- ------------------------------------------------------------------------------

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'nuuvixx_cleanup') THEN
    CREATE ROLE nuuvixx_cleanup WITH LOGIN 
      PASSWORD 'REPLACE_WITH_STRONG_CLEANUP_PASSWORD'
      NOSUPERUSER 
      NOCREATEDB 
      NOCREATEROLE 
      NOINHERIT;
  ELSE
    ALTER ROLE nuuvixx_cleanup WITH LOGIN 
      PASSWORD 'REPLACE_WITH_STRONG_CLEANUP_PASSWORD'
      NOSUPERUSER 
      NOCREATEDB 
      NOCREATEROLE 
      NOINHERIT;
  END IF;
END $$;

-- Lock search path to public schema
ALTER ROLE nuuvixx_cleanup SET search_path = public, pg_catalog;

-- Connect and schema usage
GRANT CONNECT ON DATABASE postgres TO nuuvixx_cleanup;
GRANT USAGE ON SCHEMA public TO nuuvixx_cleanup;

-- Grant SELECT to identify resolved/archived records older than 90 days
GRANT SELECT ON TABLE public.commercial_inquiries TO nuuvixx_cleanup;

-- Grant column-level UPDATE ONLY on the four redacted PII fields
GRANT UPDATE (name, email, company_or_website, problem) ON TABLE public.commercial_inquiries TO nuuvixx_cleanup;

-- Explicitly revoke INSERT, DELETE, TRUNCATE, and schema alteration
REVOKE INSERT, DELETE, TRUNCATE, REFERENCES ON TABLE public.commercial_inquiries FROM nuuvixx_cleanup;
REVOKE CREATE ON SCHEMA public FROM nuuvixx_cleanup;

-- RLS Policies for nuuvixx_cleanup:
-- CRITICAL DEFENSE-IN-DEPTH: nuuvixx_cleanup can NEVER view or update active ('NEW') inquiries
DROP POLICY IF EXISTS nuuvixx_cleanup_select_policy ON public.commercial_inquiries;
CREATE POLICY nuuvixx_cleanup_select_policy ON public.commercial_inquiries
  FOR SELECT TO nuuvixx_cleanup
  USING (status IN ('RESOLVED', 'ARCHIVED'));

DROP POLICY IF EXISTS nuuvixx_cleanup_update_policy ON public.commercial_inquiries;
CREATE POLICY nuuvixx_cleanup_update_policy ON public.commercial_inquiries
  FOR UPDATE TO nuuvixx_cleanup
  USING (status IN ('RESOLVED', 'ARCHIVED'))
  WITH CHECK (status IN ('RESOLVED', 'ARCHIVED'));


-- ------------------------------------------------------------------------------
-- PART 3: Post-Execution Verification Audits
-- ------------------------------------------------------------------------------

-- 1. Confirm roles are provisioned with login and non-superuser flags
SELECT rolname, rolsuper, rolinherit, rolcreaterole, rolcreatedb, rolcanlogin 
FROM pg_roles 
WHERE rolname IN ('nuuvixx_app', 'nuuvixx_cleanup');

-- 2. Confirm table-level grants on commercial_inquiries
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name = 'commercial_inquiries' 
  AND grantee IN ('nuuvixx_app', 'nuuvixx_cleanup')
ORDER BY grantee, privilege_type;

-- 3. Confirm column-level grants (nuuvixx_cleanup UPDATE on PII fields)
SELECT grantee, table_name, column_name, privilege_type 
FROM information_schema.column_privileges 
WHERE table_name = 'commercial_inquiries' 
  AND grantee IN ('nuuvixx_app', 'nuuvixx_cleanup')
ORDER BY grantee, column_name, privilege_type;

-- 4. Confirm RLS policies applied
SELECT policyname, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'commercial_inquiries'
ORDER BY policyname;
