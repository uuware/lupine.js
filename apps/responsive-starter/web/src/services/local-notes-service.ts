export interface LocalNoteProps {
  id: number;
  title: string;
  content: string; // HTML string
  updatedAt: number;
  images?: string[]; // Optional base64 strings
  color?: string; // Optional color tag
  orderIndex?: number;
}

const STORAGE_KEY = 'lj_notes';

export const LocalNotesService = {
  getAllNotes: (): LocalNoteProps[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      const notes: LocalNoteProps[] = data ? JSON.parse(data) : [];
      return notes.sort((a, b) => {
        const orderA = a.orderIndex !== undefined ? a.orderIndex : a.id;
        const orderB = b.orderIndex !== undefined ? b.orderIndex : b.id;
        // Default sort: descending (newest/highest first), unless orderIndex dictates otherwise.
        // If we want manual ordering, let's just sort descending by orderIndex.
        return orderB - orderA;
      });
    } catch (e) {
      console.error('Failed to load notes', e);
      return [];
    }
  },

  getNoteById: (id: number): LocalNoteProps | undefined => {
    return LocalNotesService.getAllNotes().find((n) => n.id === id);
  },

  saveNote: (note: LocalNoteProps): LocalNoteProps => {
    const notes = LocalNotesService.getAllNotes();
    note.updatedAt = Date.now();

    if (note.id <= 0) {
      note.id = Date.now();
      // Calculate next highest order index
      const maxOrder = notes.length > 0 ? Math.max(...notes.map((n) => n.orderIndex ?? n.id)) : Date.now();
      note.orderIndex = maxOrder + 1;
      notes.unshift(note);
    } else {
      const index = notes.findIndex((n) => n.id === note.id);
      if (index > -1) {
        notes[index] = note;
      } else {
        notes.unshift(note);
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return note;
  },

  updateNoteOrders: (orderedIds: number[]): boolean => {
    // orderedIds is passed from top to bottom. Top has highest orderIndex.
    const notes = LocalNotesService.getAllNotes();
    let updated = false;
    const len = orderedIds.length;
    orderedIds.forEach((id, idx) => {
      const note = notes.find((n) => n.id === id);
      if (note) {
        note.orderIndex = len - idx; // Highest index for first item
        updated = true;
      }
    });

    if (updated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
    return updated;
  },

  deleteNote: (id: number): boolean => {
    let notes = LocalNotesService.getAllNotes();
    const len = notes.length;
    notes = notes.filter((n) => n.id !== id);
    if (notes.length !== len) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      return true;
    }
    return false;
  },
};
