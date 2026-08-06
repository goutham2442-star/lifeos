import { create } from 'zustand';
import type { Habit } from '@/data/mockData';
import { habits as initialHabits } from '@/data/mockData';

interface HabitsState {
  habits: Habit[];
  toggleHabit: (id: string) => void;
}

export const useHabitsStore = create<HabitsState>((set) => ({
  habits: initialHabits,
  toggleHabit: (id) =>
    set((s) => ({
      habits: s.habits.map((h) =>
        h.id === id
          ? {
              ...h,
              completedToday: !h.completedToday,
              streak: h.completedToday ? h.streak : h.streak + 1,
            }
          : h
      ),
    })),
}));
