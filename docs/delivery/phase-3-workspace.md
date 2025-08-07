# Phase 3: Research Workspace Front-end

## Description
Implement the main Research Workspace UI where users submit queries, view pipeline progress, and interact with research artifacts (JSON/Markdown preview, versioning, export).

## Requirements
- `DraftWorkspace` React page/component
- Query input form and submit button (calls `/api/pipeline`)
- Pipeline progress indicator (stepper)
- JSON preview of pipeline output
- Markdown/HTML preview of summaries and reports
- Autosave drafts to localStorage and Supabase
- Versioning snapshot button
- Export options (PDF/Markdown)

## Implementation Plan
1. Scaffold `DraftWorkspace` page and route
2. Build query input and submit logic
3. Add pipeline stepper/progress UI
4. Render JSON and Markdown preview tabs
5. Implement autosave (localStorage, then Supabase)
6. Add versioning and export buttons (UI only for now)
7. Connect to `/api/pipeline` endpoint
8. Integrate with PromptRegistry for selectable pipeline types

## Test Plan
- User can submit a query and see pipeline progress
- JSON and Markdown previews update with output
- Drafts are autosaved and restored
- Versioning and export buttons visible

## Verification
- E2E test: user submits query, receives and views output, can save/export

## Files Modified
- `/src/pages/DraftWorkspace.tsx`
- `/src/components/PipelineStepper.tsx`
- `/src/components/JsonPreview.tsx`
- `/src/components/MarkdownPreview.tsx`
- `/src/components/VersionExportBar.tsx`
- `/docs/delivery/phase-3-workspace.md`

---

## Status History
- 2025-06-20: Task created, implementation plan drafted.
