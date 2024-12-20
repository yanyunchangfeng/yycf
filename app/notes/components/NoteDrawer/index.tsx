import React from 'react';
import { Drawer } from '@/app/components';
import { Note } from '@/app/shared';
import { Textarea } from '@/components/ui/textarea';
import { useUserStore } from '@/app/store';

interface NoteDrawerProps {
  open: boolean;
  onOk: (note: Note) => Promise<void>;
  onCancel: () => Promise<void>;
  data?: Partial<Note>;
}

export const NoteDrawer: React.FC<NoteDrawerProps> = ({ open, data = {}, onOk, onCancel }) => {
  const [title, setTitle] = React.useState(data.title);
  const { user } = useUserStore();
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleOk = async () => {
    if (title) {
      await onOk({ ...data, title, user_id: user?.id } as Note);
    }
  };

  const handleCancel = async () => {
    await onCancel();
  };

  React.useEffect(() => {
    setTitle(data.title);
  }, [data]);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.focus();
          textAreaRef.current.setSelectionRange(textAreaRef.current.value.length, textAreaRef.current.value.length);
        }
      }, 0);
    }
  }, [open]);

  return (
    <Drawer open={open} onCancel={handleCancel} onOk={handleOk} okDisabled={!title || title === data.title}>
      <div className="p-4 pb-0">
        <Textarea
          rows={5}
          placeholder="Write a note..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={textAreaRef}
        />
      </div>
    </Drawer>
  );
};
