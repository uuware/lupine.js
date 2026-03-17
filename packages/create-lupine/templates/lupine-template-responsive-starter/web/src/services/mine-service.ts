import { LocalNotesService } from './local-notes-service';

export interface MineStats {
  noteCount: number;
}

export interface BackupData {
  notes: any[];
  timestamp: string;
}

export const MineService = {
  getStats: (): MineStats => {
    const notes = LocalNotesService.getAllNotes();

    return {
      noteCount: notes.length,
    };
  },

  exportBackup: (): string => {
    const data: BackupData = {
      notes: LocalNotesService.getAllNotes(),
      timestamp: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },

  importBackup: (jsonStr: string): boolean => {
    try {
      const data: BackupData = JSON.parse(jsonStr);
      if (Array.isArray(data.notes)) {
        localStorage.setItem('lj_notes', JSON.stringify(data.notes));
      }
      return true;
    } catch (e) {
      console.error('Failed to import backup', e);
      return false;
    }
  },

  clearAllData: () => {
    localStorage.removeItem('lj_notes');
  },
};
