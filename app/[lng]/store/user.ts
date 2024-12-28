import { createPersistStore, refreshSession } from '@/app/utils';
import { createClient } from '@/app/utils/supabase/client';
import { type Session, type AuthError, type User } from '@supabase/supabase-js';

const DEFAULT_USER = {
  user: null as User | undefined | null,
  session: null as Session | null,
  loading: true,
  error: null as AuthError | null
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
        supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('🚀~ event:', event);
          switch (event) {
            case 'SIGNED_IN':
              refreshSession();
            case 'INITIAL_SESSION':
            case 'SIGNED_OUT':
            case 'TOKEN_REFRESHED':
            case 'PASSWORD_RECOVERY':
            case 'USER_UPDATED':
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
      setSession(session: typeof DEFAULT_USER.session) {
        set({ session });
      },
      setLoading(loading: typeof DEFAULT_USER.loading) {
        set({ loading });
      },
      setError(error: typeof DEFAULT_USER.error) {
        set({ error });
      }
    };
    return methods;
  },
  { name: 'user' }
);
