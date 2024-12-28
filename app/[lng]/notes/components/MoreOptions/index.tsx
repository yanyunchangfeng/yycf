import { Note } from '@/app/shared';
import { useNotesStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { DropDownMenu } from '@/app/components';

export const MoreOptions: React.FC<{ note: Note }> = ({ note }) => {
  const [open, setOpen] = React.useState(false);
  const { setDeleteIsOpen, setOpenNote, setEditIsOpen } = useNotesStore();
  const handleDelete = () => {
    setDeleteIsOpen(true);
    setOpenNote(note);
  };
  const handleUpdate = () => {
    setEditIsOpen(true);
    setOpenNote(note);
  };
  return (
    <DropDownMenu
      open={open}
      onOpenChange={setOpen}
      asChild
      content={
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleUpdate}>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      }
    >
      <Button variant="ghost" size="sm">
        <MoreHorizontal />
      </Button>
    </DropDownMenu>
  );
};
