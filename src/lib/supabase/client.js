import { createClient } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from './env.js'

let browserClient = null

// Lazily creates a singleton browser client once env vars are present.
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured) {
    return null
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }

  return browserClient
}
