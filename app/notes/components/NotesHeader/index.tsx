import React from 'react';
import { SearchNoteDate, AddNote } from '@/app/notes/components';
import { cn } from '@/lib/utils';

export const NotesHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...restProps }) => {
  const classes = cn('flex gap-2 justify-end flex-wrap', className);
  return (
    <div className={classes} {...restProps}>
      <AddNote />
      <SearchNoteDate />
    </div>
  );
};
