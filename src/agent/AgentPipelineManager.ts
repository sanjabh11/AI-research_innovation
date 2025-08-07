import { PromptRegistry } from './PromptRegistry';
import fetch from 'node-fetch';

export interface PipelineStep {
  name: string;
  input: any;
  output?: any;
  promptName: string;
}

export class AgentPipelineManager {
  steps: PipelineStep[];
  constructor(steps: PipelineStep[]) {
    this.steps = steps;
  }

  async runPipeline(): Promise<PipelineStep[]> {
    for (const step of this.steps) {
      const prompt = await PromptRegistry.getPrompt(step.promptName);
      if (!prompt) throw new Error(`Prompt ${step.promptName} not found`);
      const output = await callGeminiAgent(prompt.system_prompt, step.input, prompt.function_schema);
      step.output = output;
    }
    return this.steps;
  }
}

async function callGeminiAgent(systemPrompt: string, userPayload: any, functionSchema: any): Promise<any> {
  const GEMINI = process.env.GEMINI_API_URL || 'https://api.gemini.com/v2/chat';
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: JSON.stringify(userPayload) }
  ];
  const res = await fetch(GEMINI, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GEMINI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model: 'gemini-2.5-pro', messages, function_call: 'auto', functions: [functionSchema] })
  });
  const data = await res.json();
  return data;
}
