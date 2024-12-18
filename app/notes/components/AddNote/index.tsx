import { useNotesStore } from '@/app/store';
import { Plus } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { NoteDrawer } from '@/app/notes/components';
import { Note } from '@/app/shared';
import { toast } from 'sonner';
import RequestService from '@/app/platform/request/browser/RequestService';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const AddNote: React.FC = () => {
  const { setAddIsOpen, addIsOpen, addNote } = useNotesStore();
  const handleAddNote = async (note: Partial<Note>) => {
    try {
      await addNote(note);
      setAddIsOpen(false);
    } catch (err) {
      toast.error(`${err}`);
    }
  };
  const handleOpen = async () => {
    setAddIsOpen(true);
  };
  const handleCancel = async () => {
    RequestService.notes.notesAbortController.abort('abort add note');
    setAddIsOpen(false);
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleOpen}>
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Write a note...</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <NoteDrawer open={addIsOpen} onOk={handleAddNote} onCancel={handleCancel} />
    </>
  );
};
