import { createPersistStore } from '@/app/utils';
import { Note, Notes, NoteSearchParams } from '@/app/shared';
import RequestService from '@/app/platform/request/browser/RequestService';
import { CusDateRange } from '@/app/components';

export const DEFAULT_NOTES = {
  notes: {
    pageNo: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    data: [] as Note[]
  },
  searchNote: { keyWord: '', date: { from: undefined, to: undefined } as CusDateRange },
  deleteIsOpen: false,
  editIsOpen: false,
  addIsOpen: false,
  openNote: {} as Partial<Note>,
  pending: true,
  perPages: [
    { label: `5/page`, value: '5' },
    { label: `10/page`, value: '10' },
    { label: `15/page`, value: '15' },
    { label: `20/page`, value: '20' }
  ]
};

export const useNotesStore = createPersistStore(
  { ...DEFAULT_NOTES },
  (set, _get) => {
    function get() {
      return {
        ..._get(),
        ...methods
      };
    }
    const methods = {
      async fetchNotes(searchParams?: Partial<NoteSearchParams>) {
        set(() => ({ pending: true }));
        const newSearchParams = Object.assign(
          {
            pageNo: get().notes.pageNo,
            pageSize: get().notes.pageSize,
            keyWord: get().searchNote.keyWord?.trim(),
            startDate: get().searchNote.date?.from,
            endDate: get().searchNote.date?.to
          },
          searchParams
        );
        const notes = await RequestService.notes.fetchData(newSearchParams);
        set(() => ({ notes, pending: false }));
      },
      async addNote(note: Partial<Note>) {
        const id = await RequestService.notes.addNote(note);
        if (!id) return;
        set(() => ({ searchNote: DEFAULT_NOTES.searchNote }));
        get().fetchNotes({ pageNo: 1 });
      },
      async updateNote(note: Note) {
        const data = await RequestService.notes.updateNote(note);
        if (!data) return;
        get().fetchNotes();
      },
      async deleteNote() {
        const data = await RequestService.notes.deleteNote(get().openNote.id as unknown as number);
        if (!data) return;
        get().fetchNotes();
      },
      setNotes(notes: Notes) {
        set(() => ({ notes }));
      },
      setAddIsOpen(addIsOpen: boolean) {
        set(() => ({ addIsOpen }));
      },
      setDeleteIsOpen(deleteIsOpen: boolean) {
        set(() => ({ deleteIsOpen }));
      },
      setEditIsOpen(editIsOpen: boolean) {
        set(() => ({ editIsOpen }));
      },
      setOpenNote(note: Note) {
        set(() => ({ openNote: note }));
      },
      setSelectedPerPage(pageSize: string) {
        set(() => ({ notes: { ...get().notes, pageSize: Number(pageSize) } }));
        get().fetchNotes();
      },
      setSearchNote(searchNote: Partial<typeof DEFAULT_NOTES.searchNote>) {
        set(() => ({ searchNote: { ...get().searchNote, ...searchNote } }));
      }
    };
    return methods;
  },
  { name: 'notes' }
);
