import { createClient } from './supabase/client';

export async function refreshSession() {
  const supabase = createClient();
  return await supabase.auth.refreshSession();
}
