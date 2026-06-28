import { create } from 'zustand';
import type { TaskFilters } from '~/types/task';

export interface Notification {
  id: string;
  type: 'success' | 'error';
  message: string;
}

interface UIState {
  filters: TaskFilters;
  isFormOpen: boolean;
  editingTaskId: string | null;
  notifications: Notification[];

  setFilters: (filters: Partial<TaskFilters>) => void;
  openCreateForm: () => void;
  openEditForm: (id: string) => void;
  closeForm: () => void;
  addNotification: (n: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  filters: { status: 'all', priority: 'all', search: '' },
  isFormOpen: false,
  editingTaskId: null,
  notifications: [],

  setFilters: (filters) =>
    set((s) => ({ filters: { ...s.filters, ...filters } })),

  openCreateForm: () =>
    set({ isFormOpen: true, editingTaskId: null }),

  openEditForm: (id) =>
    set({ isFormOpen: true, editingTaskId: id }),

  closeForm: () =>
    set({ isFormOpen: false, editingTaskId: null }),

  addNotification: (n) =>
    set((s) => ({
      notifications: [...s.notifications, { ...n, id: crypto.randomUUID() }],
    })),

  removeNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    })),
}));
