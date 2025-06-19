import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase credentials are properly configured
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://placeholder.supabase.co' && 
  supabaseAnonKey !== 'placeholder-key' &&
  supabaseUrl.includes('supabase.co');

if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase is not properly configured. Please set up your environment variables:');
  console.warn('1. Create a .env file in your project root');
  console.warn('2. Add your Supabase URL: VITE_SUPABASE_URL=your_supabase_project_url');
  console.warn('3. Add your Supabase anon key: VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
  console.warn('4. Get these values from your Supabase project dashboard at https://app.supabase.com');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Export configuration status for use in components
export const isSupabaseReady = isSupabaseConfigured;

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: string;
          organization_id?: string;
          avatar_url?: string;
          preferences: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role: string;
          organization_id?: string;
          avatar_url?: string;
          preferences?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: string;
          organization_id?: string;
          avatar_url?: string;
          preferences?: any;
          updated_at?: string;
        };
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          type: string;
          description?: string;
          website?: string;
          logo_url?: string;
          settings: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          description?: string;
          website?: string;
          logo_url?: string;
          settings?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          description?: string;
          website?: string;
          logo_url?: string;
          settings?: any;
        };
      };
      research_projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          status: string;
          owner_id: string;
          organization_id?: string;
          domain: string;
          objectives: string[];
          methodology?: string;
          timeline: any[];
          budget?: number;
          tags: string[];
          visibility: string;
          metadata: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          status?: string;
          owner_id: string;
          organization_id?: string;
          domain: string;
          objectives?: string[];
          methodology?: string;
          timeline?: any[];
          budget?: number;
          tags?: string[];
          visibility?: string;
          metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          status?: string;
          owner_id?: string;
          organization_id?: string;
          domain?: string;
          objectives?: string[];
          methodology?: string;
          timeline?: any[];
          budget?: number;
          tags?: string[];
          visibility?: string;
          metadata?: any;
          updated_at?: string;
        };
      };
      ai_analyses: {
        Row: {
          id: string;
          type: string;
          query?: string;
          input_data: any;
          results: any;
          confidence_score: number;
          model_version: string;
          processing_time: number;
          user_id: string;
          project_id?: string;
          status: string;
          created_at: string;
          completed_at?: string;
        };
        Insert: {
          id?: string;
          type: string;
          query?: string;
          input_data: any;
          results: any;
          confidence_score: number;
          model_version: string;
          processing_time: number;
          user_id: string;
          project_id?: string;
          status?: string;
          created_at?: string;
          completed_at?: string;
        };
        Update: {
          id?: string;
          type?: string;
          query?: string;
          input_data?: any;
          results?: any;
          confidence_score?: number;
          model_version?: string;
          processing_time?: number;
          user_id?: string;
          project_id?: string;
          status?: string;
          completed_at?: string;
        };
      };
      inventions: {
        Row: {
          id: string;
          title: string;
          description: string;
          technical_field: string;
          problem_statement: string;
          solution_overview: string;
          creator_id: string;
          project_id?: string;
          status: string;
          novelty_score?: number;
          commercial_potential: any;
          embodiments: any[];
          claims: any[];
          prior_art: string[];
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          technical_field: string;
          problem_statement: string;
          solution_overview: string;
          creator_id: string;
          project_id?: string;
          status?: string;
          novelty_score?: number;
          commercial_potential?: any;
          embodiments?: any[];
          claims?: any[];
          prior_art?: string[];
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          technical_field?: string;
          problem_statement?: string;
          solution_overview?: string;
          creator_id?: string;
          project_id?: string;
          status?: string;
          novelty_score?: number;
          commercial_potential?: any;
          embodiments?: any[];
          claims?: any[];
          prior_art?: string[];
          tags?: string[];
          updated_at?: string;
        };
      };
      collaborations: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          role: string;
          permissions: string[];
          status: string;
          joined_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id: string;
          role?: string;
          permissions?: string[];
          status?: string;
          joined_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          user_id?: string;
          role?: string;
          permissions?: string[];
          status?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          data?: any;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          data?: any;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          data?: any;
          read?: boolean;
        };
      };
    };
  };
}