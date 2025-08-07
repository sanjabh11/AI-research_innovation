# Phase 2: Agent Orchestration Engine

## Description
Implement the core agent pipeline engine for the ARIA Platform, enabling multi-step research synthesis by orchestrating LLM agents (Gemini 2.5 Pro) with function-calling and JSON schema enforcement.

## Requirements
- `AgentPipelineManager` service: orchestrates Literature → Analysis → Synthesis agent calls
- `PromptRegistry` table in Supabase for storing/editing system prompts and function specs
- Gemini 2.5 Pro API wrapper with function-calling
- Tool adapters: `web_search`, `execute_python`, `translate`
- Backend endpoints to trigger and monitor agent pipelines

## Implementation Plan
1. Design AgentPipelineManager class (step orchestration, error handling, state persistence)
2. Implement PromptRegistry table and admin UI stub
3. Create Gemini API wrapper with function-call support
4. Implement tool adapters for web search, code execution, translation
5. Expose `/api/pipeline` endpoint to run agent pipelines
6. Document pipeline logic and update plan.md

## Test Plan
- Pipeline runs with mock and real Gemini calls
- Each agent step produces valid JSON output
- Errors are logged and do not crash pipeline
- PromptRegistry can be updated and read

## Verification
- Demo: Submit a query, pipeline produces and stores artifacts
- Outputs match required schemas

## Files Modified
- `/src/agent/AgentPipelineManager.ts`
- `/src/agent/PromptRegistry.ts`
- `/src/api/pipeline.ts`
- `/docs/delivery/phase-2-agent-engine.md`

---

## Status History
- 2025-06-20: Task created, implementation plan drafted.
