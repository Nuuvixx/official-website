# Website release review — 10 November 2026

## Candidate

This release includes the Studio website redesign, five working browser tools, the secured inquiry path, original service illustrations, and local tests. The five illustrations are visual metaphors; tool behavior is demonstrated by the working product pages and labeled sample data. No client outcome or endorsement is represented by the artwork.

## Security checks completed

- Updated Next.js and its ESLint configuration to 16.4.6. `npm audit --omit=dev --audit-level=moderate` reports zero production dependency vulnerabilities.
- Full `npm audit` still reports seven moderate findings in the development-only TypeScript ESLint dependency chain through `minimatch`. No high or critical findings remain. A major override was not forced into the lint toolchain without compatibility evidence.
- Removed the unused public `/api/contact` proxy and client form that sent contact data to FormSubmit. The public contact pages now use `/api/inquire` and its durable storage path.
- Inquiry intake validates types and lengths, limits the actual UTF-8 body to 64 KiB, uses a honeypot, and fails closed when production storage is unavailable. The production IP hash requires `LEADS_IP_SALT`.
- Applied `nosniff`, frame denial, a restricted referrer policy, and a permissions policy to all routes; removed the framework identification header.
- Reviewed SQL adapter calls for parameterized queries, restricted role use, and production storage fallback behavior. Existing local role evidence is recorded in Phase C; this release did not execute database-writing tests against a hosted database.
- Reviewed the candidate for exposed credentials before staging. Local environment files, build outputs, lead data, Vercel metadata, old tool screenshots, and unused raw art are excluded from the commit.

## Functional gates

`npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run test:all`, `npm run test:browser`, and `npm run test:journeys` pass. The browser journey suite covers 23 checks across all five service tools. A local production response includes the configured security headers.

## Hosted limits

GitHub stores source history; inquiries are stored through the configured PostgreSQL adapter. A successful static page load does not prove hosted inquiry delivery. Preview and production environment variable names can be checked without exposing values, but the database target, inbox ownership, and live persistence require a controlled test before accepting real leads. No synthetic lead was sent to the hosted database as part of this release.
