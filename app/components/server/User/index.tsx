import { createClient } from '@/app/utils/supabase/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export async function User() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return (
    <Avatar>
      <AvatarImage src={user?.user_metadata.avatar_url} />
      <AvatarFallback>{user?.user_metadata.name || 'N/A'}</AvatarFallback>
    </Avatar>
  );
}
