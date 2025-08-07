// Utility to check for required environment variables at runtime
// Logs warning if any are missing. Use in main entry points.

// SUPABASE_URL: Your Supabase project URL (https://xyzcompany.supabase.co)
// Used for all database and authentication requests.
// SUPABASE_KEY: Supabase anonymous/public API key (never use service_role in frontend!)
// Used for client-side and server-side data access.
// GEMINI_API_KEY: Google Gemini LLM API key
// Used for all LLM-powered research, summarization, and invention generation features.
// Add any new required keys below, with comments explaining their usage and security requirements.
const REQUIRED_ENV_VARS = [
  'SUPABASE_URL',
  'SUPABASE_KEY',
  'GEMINI_API_KEY',
  // Add any new required keys here
];

export function checkRequiredEnvVars() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length) {
  
    console.warn(
      `\n[ARIA] WARNING: Missing required environment variables: ${missing.join(', ')}.\n` +
      'Please check your .env file or deployment configuration.\n'
    );
  }
  return missing;
}
