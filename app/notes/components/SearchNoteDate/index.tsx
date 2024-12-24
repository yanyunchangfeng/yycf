import { useNotesStore } from '@/app/store';
import { CusDateRange, DatePickerRange } from '@/app/components';
import { debounce } from 'lodash-es';
import React from 'react';

export const SearchNoteDate: React.FC = () => {
  const { searchNote, setSearchNote, fetchNotes } = useNotesStore();

  const debounceSearchNote = React.useCallback(debounce(fetchNotes, 500), []);

  const handleDateChange = (date: CusDateRange) => {
    setSearchNote({ date: date });
    debounceSearchNote();
  };
  return <DatePickerRange date={searchNote.date} setDate={handleDateChange} />;
};
