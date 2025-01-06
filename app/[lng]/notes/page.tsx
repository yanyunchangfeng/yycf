'use client';

import {
  AlertNote,
  Notes,
  PaganitionContainer,
  NotesHeader,
  SearchNoteInput,
  SearchNoteDate,
  AddNote
} from '@/app/notes/components';
import { Header } from '@/app/components';
import { useSidebar } from '@/components/ui/sidebar';
import React from 'react';
import { ParamsWithLng } from '@/app/shared';
import { useTranslation } from '@/app/i18n/client';

const NotePage: React.FC<ParamsWithLng> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, 'basic');
  const { isMobile } = useSidebar();
  return React.useMemo(() => {
    if (isMobile) {
      return (
        <>
          <Header lng={lng} />
          <h1 className="text-center p-2" suppressHydrationWarning>
            {t('title')}
          </h1>
          <div className="flex flex-col gap-2 flex-1">
            <NotesHeader>
              <SearchNoteInput />
              <SearchNoteDate />
              <AddNote />
            </NotesHeader>
            <Notes />
            <PaganitionContainer />
            <AlertNote />
          </div>
        </>
      );
    }
    return (
      <>
        <Header lng={lng}>
          <NotesHeader className="flex gap-2 flex-1 justify-end max-sm:hidden">
            <AddNote />
            <SearchNoteDate />
            <SearchNoteInput />
          </NotesHeader>
        </Header>
        <h1 className="text-center p-2" suppressHydrationWarning>
          {t('title')}
        </h1>
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
