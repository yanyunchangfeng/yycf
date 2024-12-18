import { useNotesStore } from '@/app/store';
import { Confirm } from '@/app/components';
import { toast } from 'sonner';
import RequestService from '@/app/platform/request/browser/RequestService';

export const AlertNote: React.FC = () => {
  const { deleteIsOpen, setDeleteIsOpen, deleteNote, openNote } = useNotesStore();
  const handleCancel = async () => {
    RequestService.notes.notesAbortController.abort('abort delete note');
    setDeleteIsOpen(false);
  };
  const handleDelete = async () => {
    try {
      await deleteNote();
      setDeleteIsOpen(false);
    } catch (err) {
      toast.error(`${err}`);
    }
  };
  return (
    <Confirm open={deleteIsOpen} onOk={handleDelete} onCancel={handleCancel} data={{ description: openNote.title }} />
  );
};
