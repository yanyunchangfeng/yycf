'use client';

import { useUserStore } from '@/app/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { Skeleton } from '@/app/components';

export const User: React.FC = () => {
  const { loading, user, fetchUser } = useUserStore();

  React.useEffect(() => {
    fetchUser();
  }, []);

  if (loading)
    return (
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarFallback>
          <Skeleton />
        </AvatarFallback>
      </Avatar>
    );
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
};
