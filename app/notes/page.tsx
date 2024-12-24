'use client';

import { AlertNote, Notes, PaganitionContainer, NotesHeader, SearchNoteInput } from '@/app/notes/components';
import { Header } from '@/app/components';
import { useSidebar } from '@/components/ui/sidebar';
import React from 'react';

const NotePage: React.FC = () => {
  const { isMobile } = useSidebar();
  return React.useMemo(() => {
    if (isMobile) {
      return (
        <>
          <Header>
            <div className="flex gap-2 flex-1 justify-end">
              <SearchNoteInput />
            </div>
          </Header>
          <div className="flex flex-col gap-2 flex-1">
            <NotesHeader />
            <Notes />
            <PaganitionContainer />
            <AlertNote />
          </div>
        </>
      );
    }
    return (
      <>
        <Header>
          <div className="flex gap-2 flex-1 justify-end">
            <NotesHeader className="max-sm:hidden" />
            <SearchNoteInput />
          </div>
        </Header>
        <div className="flex flex-col gap-2 flex-1">
          <Notes />
          <PaganitionContainer />
          <AlertNote />
        </div>
      </>
    );
  }, [isMobile]);
};

export default NotePage;
