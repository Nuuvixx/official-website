-- ==============================================================================
-- Nuuvixx Commercial Inquiries Database Schema (PostgreSQL)
-- Compatible with Supabase, Neon, AWS RDS, GCP Cloud SQL, Render, Railway
-- ==============================================================================

CREATE TABLE IF NOT EXISTS commercial_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_ref VARCHAR(64) UNIQUE NOT NULL,
    idempotency_hash VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    company_or_website VARCHAR(150) NOT NULL,
    service VARCHAR(60) NOT NULL,
    problem TEXT NOT NULL,
    budget VARCHAR(100) NOT NULL DEFAULT 'Not specified',
    timeline VARCHAR(100) NOT NULL DEFAULT 'Flexible',
    source_context VARCHAR(150) NOT NULL DEFAULT 'Website direct',
    ip_hash VARCHAR(64) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'NEW',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance and Query Optimization Indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON commercial_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_service ON commercial_inquiries(service);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON commercial_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_ip_rate ON commercial_inquiries(ip_hash, created_at DESC);

-- ==============================================================================
-- Privacy, Row Level Security (RLS) & Role Access Control:
-- 1. Inquiries are stored strictly server-side with no public retrieval route.
-- 2. IP addresses are hashed using salted HMAC-SHA256 before insertion.
-- 3. In Supabase/PostgREST, RLS is enabled and public/anon access is revoked
--    to prevent accidental client-side data exposure via anon keys.
-- ==============================================================================

ALTER TABLE commercial_inquiries ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON commercial_inquiries FROM anon;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL ON commercial_inquiries FROM authenticated;
  END IF;
END $$;

-- ==============================================================================
-- Data Retention Policy (90-day post-resolution purge):
--
-- UPDATE commercial_inquiries
-- SET name = 'REDACTED',
--     email = 'redacted@nuuvixx.internal',
--     company_or_website = 'REDACTED',
--     problem = '[RETENTION PURGED]'
-- WHERE created_at < NOW() - INTERVAL '90 days'
--   AND status IN ('RESOLVED', 'ARCHIVED');
-- ==============================================================================
