import { useNotesStore } from '@/app/store';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash-es';
import React from 'react';

export const SearchNoteInput: React.FC = () => {
  const { searchNote, setSearchNote, fetchNotes } = useNotesStore();

  const debounceSearchNote = React.useCallback(debounce(fetchNotes, 500), []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNote({ keyWord: e.target.value });
    debounceSearchNote();
  };

  return <Input onChange={handleOnChange} value={searchNote.keyWord} placeholder="Search note" className="max-w-sm" />;
};
