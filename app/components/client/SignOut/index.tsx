'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';
import { Button } from '@/components/ui/button';

export function SignOut() {
  const router = useRouter();
  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/blog');
    router.refresh();
  }

  return (
    <Button onClick={handleLogout} variant="destructive">
      Sign out
    </Button>
  );
}
