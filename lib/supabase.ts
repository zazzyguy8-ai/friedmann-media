// Re-export browser client (safe for client components)
export { createBrowserClientInstance as createBrowserClient } from './supabase-browser'

// Note: createServerClient and createAdminClient are in lib/supabase-server.ts
// Import those directly in server components and API routes to avoid
// importing next/headers in client components
