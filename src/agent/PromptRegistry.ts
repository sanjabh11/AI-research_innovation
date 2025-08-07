import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export interface Prompt {
  id: string;
  name: string;
  system_prompt: string;
  function_schema: any;
}

export class PromptRegistry {
  static async getPrompt(name: string): Promise<Prompt | null> {
    const { data, error } = await supabase.from('prompts').select('*').eq('name', name).single();
    if (error) return null;
    return data as Prompt;
  }

  static async setPrompt(name: string, system_prompt: string, function_schema: any): Promise<void> {
    await supabase.from('prompts').upsert([{ name, system_prompt, function_schema }], { onConflict: 'name' });
  }

  static async listPrompts(): Promise<Prompt[]> {
    const { data } = await supabase.from('prompts').select('*');
    return (data || []) as Prompt[];
  }
}
