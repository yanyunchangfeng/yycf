import React from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { type User, type AuthError, type Session } from '@supabase/supabase-js';

export function useUser() {
  const [user, setUser] = React.useState<User | null>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<AuthError | null>();
  const [session, setSession] = React.useState<Session | null>();
  const supabase = createClient();

  React.useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'INITIAL_SESSION':
        case 'SIGNED_IN':
        case 'SIGNED_OUT':
          setUser(session?.user);
          break;
        default:
          setUser(session?.user);
      }
    });
    async function fetchUser() {
      try {
        const {
          data: { session },
          error
        } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
        setUser(session?.user);
      } catch (error) {
        setUser(null);
        setSession(null);
        setError(error as AuthError);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { loading, error, user, session };
}
