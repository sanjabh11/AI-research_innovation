import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Runtime-safe access to environment variables.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

// Fallback: throw an error in development if keys are missing, but allow empty in production build pipeline.
if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase URL or Anon Key is not set. Supabase client will be limited.');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
