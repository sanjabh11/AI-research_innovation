-- Prompt Registry Table
CREATE TABLE prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  system_prompt text NOT NULL,
  function_schema jsonb,
  created_at timestamptz DEFAULT now()
);
