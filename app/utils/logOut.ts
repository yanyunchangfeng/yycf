import { createClient } from './supabase/client';

export async function logOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
