import { create } from 'zustand';
import type { Note } from '@/data/mockData';
import { notes as initialNotes } from '@/data/mockData';

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  setActiveNote: (id: string | null) => void;
  togglePin: (id: string) => void;
  addNote: (note: Note) => void;
  toggleChecklistItem: (noteId: string, itemId: string) => void;
  search: string;
  setSearch: (s: string) => void;
  activeTag: string | null;
  setActiveTag: (t: string | null) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: initialNotes,
  activeNoteId: null,
  setActiveNote: (id) => set({ activeNoteId: id }),
  togglePin: (id) =>
    set((s) => ({
      notes: s.notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    })),
  addNote: (note) => set((s) => ({ notes: [note, ...s.notes] })),
  toggleChecklistItem: (noteId, itemId) =>
    set((s) => ({
      notes: s.notes.map((n) =>
        n.id === noteId
          ? {
              ...n,
              checklist: n.checklist?.map((c) =>
                c.id === itemId ? { ...c, done: !c.done } : c
              ),
            }
          : n
      ),
    })),
  search: '',
  setSearch: (s) => set({ search: s }),
  activeTag: null,
  setActiveTag: (t) => set({ activeTag: t }),
}));
