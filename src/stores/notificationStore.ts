import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Notification = Database['public']['Tables']['notifications']['Row'];
type NotificationInsert = Database['public']['Tables']['notifications']['Insert'];

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  createNotification: (notification: NotificationInsert) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const unreadCount = data?.filter(n => !n.read).length || 0;
      set({ 
        notifications: data || [], 
        unreadCount,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch notifications:', error);
    }
  },

  markAsRead: async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;

      const { notifications } = get();
      const updated = notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      );
      const unreadCount = updated.filter(n => !n.read).length;
      
      set({ notifications: updated, unreadCount });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  },

  markAllAsRead: async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('read', false);

      if (error) throw error;

      const { notifications } = get();
      const updated = notifications.map(n => ({ ...n, read: true }));
      
      set({ notifications: updated, unreadCount: 0 });
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  },

  createNotification: async (notification: NotificationInsert) => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert(notification)
        .select()
        .single();

      if (error) throw error;

      const { notifications, unreadCount } = get();
      set({ 
        notifications: [data, ...notifications],
        unreadCount: unreadCount + 1
      });
    } catch (error) {
      console.error('Failed to create notification:', error);
    }
  },

  deleteNotification: async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      const { notifications } = get();
      const filtered = notifications.filter(n => n.id !== id);
      const unreadCount = filtered.filter(n => !n.read).length;
      
      set({ notifications: filtered, unreadCount });
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  },
}));