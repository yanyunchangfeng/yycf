import React from 'react';
import { Skeleton } from '@/app/components';
import { useNotesStore } from '@/app/store';
import { NoteList, NoteDrawer } from '@/app/notes/components';
import { Note } from '@/app/shared';
import { toast } from 'sonner';
import RequestService from '@/app/platform/request/browser/RequestService';

export const Notes: React.FC = () => {
  const { pending, fetchNotes, setEditIsOpen, updateNote, editIsOpen, openNote } = useNotesStore();
  const handleUpdateNote = async (note: Note) => {
    try {
      await updateNote(note);
      setEditIsOpen(false);
    } catch (err) {
      toast.error(`${err}`, { position: 'top-center' });
    }
  };
  const handleCancel = async () => {
    RequestService.notes.notesAbortController.abort('abort update note');
    setEditIsOpen(false);
  };
  React.useEffect(() => {
    fetchNotes();
  }, []);

  return React.useMemo(() => {
    if (pending) {
      return <Skeleton />;
    }
    return (
      <>
        <NoteList />
        <NoteDrawer onOk={handleUpdateNote} open={editIsOpen} data={openNote} onCancel={handleCancel} />
      </>
    );
  }, [pending, editIsOpen, openNote]);
};
