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
          console.log('🚀 ~ supabase.auth.onAuthStateChange ~ event:', event);
          switch (event) {
            case 'INITIAL_SESSION':
            case 'SIGNED_IN':
            case 'SIGNED_OUT':
              get().setUser(session?.user);
              break;
            default:
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
