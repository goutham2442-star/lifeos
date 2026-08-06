import { create } from 'zustand';
import type { Task } from '@/data/mockData';
import { tasks as initialTasks } from '@/data/mockData';

interface TasksState {
  tasks: Task[];
  toggleTask: (id: string) => void;
  addTask: (task: Task) => void;
  filter: 'all' | 'today' | 'high' | 'completed';
  setFilter: (filter: 'all' | 'today' | 'high' | 'completed') => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  tasks: initialTasks,
  toggleTask: (id) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    })),
  addTask: (task) => set((s) => ({ tasks: [task, ...s.tasks] })),
  filter: 'all',
  setFilter: (filter) => set({ filter }),
}));
