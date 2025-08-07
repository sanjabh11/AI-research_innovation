# Phase 4: Analytics & Collaboration Enhancement

## Description
Wire up analytics and collaboration features to live data, replacing mock data with real queries to Supabase and API endpoints. Enable real project/team management and dashboard metrics.

## Requirements
- `AnalyticsDashboard` uses live metrics from Supabase (research papers, patents, inventions, collaborations)
- `CollaborationPanel` uses real project/collaborator data from Supabase
- Implement project and collaborator CRUD endpoints
- Connect dashboard and panel components to backend
- Add notification triggers for collaboration events

## Implementation Plan
1. Scaffold project and collaborator API endpoints
2. Refactor `AnalyticsDashboard` to fetch and display live metrics
3. Refactor `CollaborationPanel` to manage real collaborators (invite, remove, update roles)
4. Add notification triggers for key events (invites, joins, updates)
5. Document API and update plan.md

## Test Plan
- AnalyticsDashboard shows live metrics from DB
- CollaborationPanel displays real collaborators and updates on changes
- Notifications fire on invite/role changes

## Verification
- E2E test: add collaborator, see dashboard metrics update

## Files Modified
- `/src/api/projects.ts`, `/src/api/collaborators.ts`
- `/src/components/AnalyticsDashboard.tsx`
- `/src/components/collaboration/CollaborationPanel.tsx`
- `/src/stores/notificationStore.ts`
- `/docs/delivery/phase-4-analytics-collab.md`

---

## Status History
- 2025-06-20: Task created, implementation plan drafted.
