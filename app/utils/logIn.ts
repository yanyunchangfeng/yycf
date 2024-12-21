import { createClient } from './supabase/client';

export async function logIn() {
  const supabase = createClient();
  const { protocol, host } = location;
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${protocol}//${host}/auth/callback`
    }
  });
}
