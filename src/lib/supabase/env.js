// Centralizes env access so the rest of the app does not read import.meta.env directly.
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
export const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ??
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ??
  ''

// The app keeps working without Supabase by falling back to local content.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
