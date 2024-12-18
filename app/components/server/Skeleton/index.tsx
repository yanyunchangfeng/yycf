import React from 'react';
import { Skeleton as DefaultSkeleton } from '@/components/ui/skeleton';

export const Skeleton: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 justify-center flex-1">
      <DefaultSkeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <DefaultSkeleton className="h-4 w-[250px]" />
        <DefaultSkeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
