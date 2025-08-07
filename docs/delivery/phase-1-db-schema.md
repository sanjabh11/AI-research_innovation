# Phase 1: Foundation & DB Schema

## Description
Design and implement the foundational database schema in Supabase for ARIA Platform, and scaffold REST endpoints for core research data objects.

## Requirements
- Supabase tables:
  - `queries`: User-submitted research queries
  - `sources`: Literature/patent sources linked to queries
  - `artifacts`: Summaries, themes, data, reports (JSON)
  - `projects`: User projects/collections
  - `collaborators`: Project-level user roles
  - `versions`: Snapshots of reports/artifacts
- REST API endpoints for `queries` and `artifacts`

## Implementation Plan
1. Write SQL migration scripts for all tables (see below)
2. Apply migrations in Supabase dashboard or CLI
3. Scaffold Express API endpoints for `queries` and `artifacts`
4. Add Supabase client integration in backend
5. Document schema in `docs/` and update plan.md

## Test Plan
- Table creation succeeds in Supabase
- Insert/select/update/delete for each table
- API endpoints respond with correct data

## Verification
- Demo: Insert/query artifacts from API
- DB schema matches PRD and Addl Features

## Files Modified
- `/supabase/migrations/<timestamp>_init.sql`
- `/src/api/queries.ts`, `/src/api/artifacts.ts`
- `/docs/delivery/phase-1-db-schema.md`

---

## SQL Schema
```sql
-- Research Queries
CREATE TABLE queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  query_text text,
  created_at timestamptz DEFAULT now()
);

-- Sources
CREATE TABLE sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_id uuid REFERENCES queries(id),
  title text,
  url text,
  abstract text
);

-- Artifacts (summaries, themes, data, reports)
CREATE TABLE artifacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_id uuid REFERENCES queries(id),
  type text, -- e.g., "summary", "data_insights"
  payload jsonb,
  created_at timestamptz DEFAULT now()
);

-- Projects
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  name text,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Collaborators
CREATE TABLE collaborators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id),
  user_id uuid,
  role text,
  invited_at timestamptz DEFAULT now()
);

-- Versions
CREATE TABLE versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artifact_id uuid REFERENCES artifacts(id),
  label text,
  snapshot jsonb,
  created_at timestamptz DEFAULT now()
);
```

---

## Status History
- 2025-06-20: Task created, schema drafted.
