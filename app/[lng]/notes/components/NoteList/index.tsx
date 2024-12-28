import { useNotesStore } from '@/app/store';
import React from 'react';
import { MoreOptions } from '@/app/notes/components';
import { Popover } from '@/app/components';

export const NoteList: React.FC = () => {
  const { notes } = useNotesStore();

  return (
    <>
      {notes.data.map((note) => {
        const createTime = new Date(note.created_at).toLocaleString();
        let updateTime: React.ReactNode = note.updated_at ? new Date(note.updated_at).toLocaleString() : null;
        const classes = 'text-[hsl(var(--foreground-light))]';
        updateTime = updateTime ? (
          <Popover content={updateTime} className={classes}>
            (edited)
          </Popover>
        ) : null;

        return (
          <div key={note.id} className="rounded-md shadow-md flex items-center gap-2 pr-2 w-full">
            <div className="font-medium flex-1 pl-2 flex gap-2 items-center truncate min-h-[60px] w-full">
              <Popover content={note.title} className="flex-1 truncate text-left ">
                {note.title}
              </Popover>
              <Popover content={createTime} className={classes}>
                (created)
              </Popover>
              {updateTime}
            </div>
            <MoreOptions note={note} />
          </div>
        );
      })}
    </>
  );
};
