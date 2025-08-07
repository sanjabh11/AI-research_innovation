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
