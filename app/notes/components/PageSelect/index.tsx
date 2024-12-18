import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNotesStore } from '@/app/store';

export const PageSelect: React.FC = () => {
  const { perPages, selectedPerPage, setSelectedPerPage } = useNotesStore();
  return (
    <Select value={String(selectedPerPage)} onValueChange={setSelectedPerPage}>
      <SelectTrigger className="w-[100px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {perPages.map((page) => (
          <SelectItem key={page.value} value={page.value}>
            {page.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
