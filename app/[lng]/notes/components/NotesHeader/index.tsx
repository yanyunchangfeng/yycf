import React from 'react';
import { cn } from '@/lib/utils';

export const NotesHeader: React.FC<React.HTMLAttributes<HTMLDivElement> & React.PropsWithChildren> = ({
  className,
  children,
  ...restProps
}) => {
  const classes = cn('flex gap-2', className);
  return (
    <div className={classes} {...restProps}>
      {children}
    </div>
  );
};
