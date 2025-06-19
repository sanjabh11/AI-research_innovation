import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, isSupabaseReady } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: true,
      isAuthenticated: false,

      signIn: async (email: string, password: string) => {
        if (!isSupabaseReady) {
          throw new Error('Supabase is not configured. Please check your environment variables.');
        }

        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
          
          set({
            user: data.user,
            session: data.session,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signUp: async (email: string, password: string, metadata = {}) => {
        if (!isSupabaseReady) {
          throw new Error('Supabase is not configured. Please set up your environment variables and connect to Supabase.');
        }

        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: metadata,
            },
          });
          
          if (error) throw error;
          
          set({
            user: data.user,
            session: data.session,
            isAuthenticated: !!data.user,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signOut: async () => {
        if (!isSupabaseReady) {
          // If Supabase isn't configured, just clear local state
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return;
        }

        set({ isLoading: true });
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      updateProfile: async (updates: any) => {
        if (!isSupabaseReady) {
          throw new Error('Supabase is not configured. Please check your environment variables.');
        }

        const { user } = get();
        if (!user) throw new Error('No user logged in');
        
        try {
          const { data, error } = await supabase.auth.updateUser({
            data: updates,
          });
          
          if (error) throw error;
          
          set({ user: data.user });
        } catch (error) {
          throw error;
        }
      },

      initialize: async () => {
        if (!isSupabaseReady) {
          console.warn('Supabase not configured - running in demo mode');
          set({ isLoading: false });
          return;
        }

        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          set({
            user: session?.user || null,
            session,
            isAuthenticated: !!session?.user,
            isLoading: false,
          });

          // Listen for auth changes
          supabase.auth.onAuthStateChange((event, session) => {
            set({
              user: session?.user || null,
              session,
              isAuthenticated: !!session?.user,
              isLoading: false,
            });
          });
        } catch (error) {
          set({ isLoading: false });
          console.error('Auth initialization error:', error);
        }
      },
    }),
    {
      name: 'aria-auth',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);