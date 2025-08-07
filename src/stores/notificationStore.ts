import { create } from 'zustand';

export interface Notification {
  id: string;
  message: string;
  read?: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  fetchNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  get unreadCount() {
    return get().notifications.filter((n) => !n.read).length;
  },
  markAllRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true }))
  })),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    )
  })),
  deleteNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id)
  })),
  fetchNotifications: async () => {
    // TODO: integrate real API
    set({ notifications: [] });
  }
}));
