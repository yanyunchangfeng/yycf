import React from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { type User } from '@supabase/supabase-js';

export function useUser() {
  const [user, setUser] = React.useState<User>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<unknown>();
  const supabase = createClient();

  React.useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'INITIAL_SESSION':
          setUser(session?.user);
          break;
        case 'SIGNED_IN':
          // 这里不会触发 因为我们是在服务端登录后导航的，所以这里不会触发 因此主动调用fetchUser
          // console.log('User signed in:', session);
          // 本地没有触发 然而在vercel上可以触发 所以注释掉
          break;
        case 'SIGNED_OUT':
          setUser(session?.user);
      }
    });
    async function fetchUser() {
      try {
        const {
          data: { user },
          error
        } = await supabase.auth.getUser();
        if (error) throw error;
        if (user) {
          setUser(user);
        }
      } catch (error: unknown) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { loading, error, user };
}
