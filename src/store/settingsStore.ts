import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, AccentColor } from '@/data/mockData';

interface SettingsState {
  theme: Theme;
  accent: AccentColor;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setAccent: (accent: AccentColor) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      accent: 'blue',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      setAccent: (accent) => set({ accent }),
    }),
    { name: 'lifeos-settings' }
  )
);
