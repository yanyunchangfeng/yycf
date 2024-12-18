import { createPersistStore } from '@/app/utils';
import { createClient } from '@/app/utils/supabase/client';
import { type User } from '@supabase/supabase-js';

const DEFAULT_USER = {
  user: undefined as User | undefined,
  loading: true
};

export const useUserStore = createPersistStore(
  { ...DEFAULT_USER },
  (set, _get) => {
    function get() {
      return {
        ..._get(),
        ...methods
      };
    }
    const methods = {
      async fetchUser() {
        const supabase = createClient();
        supabase.auth.onAuthStateChange((event, session) => {
          switch (event) {
            case 'INITIAL_SESSION':
              get().setUser(session?.user);
              break;
            case 'SIGNED_IN':
              // 这里不会触发 因为我们是在服务端登录后导航的，所以这里不会触发 因此主动调用fetchUser
              // console.log('User signed in:', session);
              // 本地没有触发 然而在vercel上可以触发 所以注释掉
              break;
            case 'SIGNED_OUT':
              get().setUser(session?.user);
          }
          get().setLoading(false);
        });
      },
      setUser(user: typeof DEFAULT_USER.user) {
        set({ user });
      },
      setLoading(loading: typeof DEFAULT_USER.loading) {
        set({ loading });
      }
    };
    return methods;
  },
  { name: 'user' }
);
