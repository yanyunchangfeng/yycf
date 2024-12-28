import { createClient } from './supabase/client';

export async function logOut() {
  const supabase = createClient();
  return await supabase.auth.signOut();
}
