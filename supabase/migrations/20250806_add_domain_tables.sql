-- Domain-specific tables for ARIA Platform
-- Generated: 2025-08-06

-- Patent Landscapes ---------------------------------------------------------
CREATE TABLE patent_landscapes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  domain text NOT NULL,
  scope jsonb NOT NULL,                 -- e.g., {"ipc": ["G06F"], "keywords": ["machine learning"]}
  summary jsonb,                        -- high-level insights
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Analytics Models ----------------------------------------------------------
CREATE TABLE analytics_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  model_type text NOT NULL,             -- e.g., "prediction", "risk", "sentiment"
  version text DEFAULT 'v1',
  metadata jsonb,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Predictions (outputs of analytics models) ---------------------------------
CREATE TABLE predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id uuid REFERENCES analytics_models(id) ON DELETE CASCADE,
  input_params jsonb,
  output jsonb,
  confidence numeric,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES users(id)
);

-- Risk Metrics --------------------------------------------------------------
CREATE TABLE risk_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  metric jsonb,                         -- structured risk data
  generated_by uuid REFERENCES analytics_models(id),
  created_at timestamptz DEFAULT now()
);

-- Row Level Security --------------------------------------------------------
ALTER TABLE patent_landscapes ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_metrics ENABLE ROW LEVEL SECURITY;

-- Policies: allow owner or collaborators read/write -------------------------
CREATE POLICY "patent_landscapes_owner_rw" ON patent_landscapes
  USING ( auth.uid() = project_id )
  WITH CHECK ( auth.uid() = project_id );

-- TODO: refine RLS with organization membership & roles
