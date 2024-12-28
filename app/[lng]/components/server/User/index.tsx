import { createClient } from '@/app/utils/supabase/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export async function User() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user?.user_metadata?.avatar_url} />
        <AvatarFallback>{user?.user_metadata?.name || 'N/A'}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user?.user_metadata?.name || 'N/A'}</span>
        <span className="truncate text-xs">{user?.user_metadata?.email}</span>
      </div>
    </>
  );
}
