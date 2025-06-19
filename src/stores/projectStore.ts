import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Project = Database['public']['Tables']['research_projects']['Row'];
type ProjectInsert = Database['public']['Tables']['research_projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['research_projects']['Update'];

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (project: ProjectInsert) => Promise<Project>;
  updateProject: (id: string, updates: ProjectUpdate) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setCurrentProject: (project: Project | null) => void;
  clearError: () => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('research_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ projects: data || [], isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch projects',
        isLoading: false 
      });
    }
  },

  createProject: async (project: ProjectInsert) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('research_projects')
        .insert(project)
        .select()
        .single();

      if (error) throw error;
      
      const { projects } = get();
      set({ 
        projects: [data, ...projects],
        isLoading: false 
      });
      
      return data;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create project',
        isLoading: false 
      });
      throw error;
    }
  },

  updateProject: async (id: string, updates: ProjectUpdate) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('research_projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const { projects, currentProject } = get();
      const updatedProjects = projects.map(p => p.id === id ? data : p);
      
      set({ 
        projects: updatedProjects,
        currentProject: currentProject?.id === id ? data : currentProject,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update project',
        isLoading: false 
      });
      throw error;
    }
  },

  deleteProject: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('research_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      const { projects, currentProject } = get();
      const filteredProjects = projects.filter(p => p.id !== id);
      
      set({ 
        projects: filteredProjects,
        currentProject: currentProject?.id === id ? null : currentProject,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete project',
        isLoading: false 
      });
      throw error;
    }
  },

  setCurrentProject: (project: Project | null) => {
    set({ currentProject: project });
  },

  clearError: () => {
    set({ error: null });
  },
}));