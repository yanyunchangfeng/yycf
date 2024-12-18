import { useNotesStore } from '@/app/store';
import { Input } from '@/components/ui/input';
import { CusDateRange, DatePickerRange } from '@/app/components';
import { debounce } from 'lodash-es';
import React from 'react';

export const SearchNote: React.FC = () => {
  const { searchNote, setSearchNote, fetchNotes } = useNotesStore();

  const debounceSearchNote = React.useCallback(debounce(fetchNotes, 500), []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNote({ keyWord: e.target.value });
    debounceSearchNote();
  };
  const handleDateChange = (date: CusDateRange) => {
    setSearchNote({ date: date });
    debounceSearchNote();
  };
  return (
    <>
      <DatePickerRange date={searchNote.date} setDate={handleDateChange} />
      <Input onChange={handleOnChange} value={searchNote.keyWord} placeholder="Search note" className="max-w-sm" />
    </>
  );
};
