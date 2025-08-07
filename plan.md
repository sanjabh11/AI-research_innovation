# ARIA Platform – Comprehensive Implementation Plan

*Last updated: 2025-06-20*

---

## 0. Purpose
This `plan.md` consolidates:
* Original platform requirements (`prd.MD`)
* Additional **Research Synthesizer** requirements (`Addl features.md`)
* Current code-base capabilities

The document will be kept up-to-date as implementation proceeds.

---

## 1. Feature Inventory (Deduplicated)

| # | Feature Group | Specific Capability | Current Status |
|---|---------------|---------------------|----------------|
| 1 | **Auth & Users** | Sign-up / login / profile (Supabase) | ✅ Implemented |
| 2 | | Role-based access, project permissions | 🚧 Partial (basic roles in UI only) |
| 3 | **Collaboration** | Invite collaborators, activity feed | 🚧 UI only |
| 4 | **Research Query** | Persist user query, metadata | ❌ Pending |
| 5 | **Literature Retrieval** | `web_search` agent, fetch top sources | ❌ Pending |
| 6 | **Literature Summarisation** | Summaries + citations JSON | ❌ Pending |
| 7 | **Thematic Analysis** | Theme extraction agent | ❌ Pending |
| 8 | **Data Analysis** | Python code exec, chart spec output | ❌ Pending |
| 9 | **Executive Summary** | One-page bullet report | ❌ Pending |
|10 | **Translation** | Translate summary | ❌ Pending |
|11 | **Patent Intelligence** | Prior-art search, gap detection | ❌ Pending |
|12 | **Invention Generation** | Novel solution ideation | ❌ Pending |
|13 | **Patent Drafting** | Claims/spec drawings JSON | ❌ Pending |
|14 | **Analytics** | KPI dashboards (live) | 🚧 Mock data only |
|15 | **Versioning** | Snapshot & diff reports | ❌ Pending |
|16 | **Export** | PDF / MD / slides | ❌ Pending |
|17 | **Innovation Pipeline UI** | Visual workflow board | ❌ Pending |
|18 | **Testing & QA** | Unit / integration / e2e | ❌ Pending |

---

## 2. Phased Road-map

### Phase 0 – Repository & CI Setup (1 day)
* Create `.env.example`, update README.
* Add ESLint + Prettier, Husky pre-commit.
* Set up GitHub Actions for lint, test, build.

### Phase 1 – Foundation & DB Schema (3 days)
* Design Supabase tables: `queries`, `sources`, `artifacts`, `projects`, `collaborators`, `versions`.
* Implement REST endpoints (Express API routes) for queries & artifacts (per section 5.4 of Addl PRD).
* Refactor existing auth store to expose `userId` globally.

### Phase 2 – Agent Orchestration Engine (5 days)
* `AgentPipelineManager` service orchestrating: Literature → Analysis → Synthesis.
* `PromptRegistry` table + admin UI for prompt editing.
* Gemini 2.5 Pro integration wrapper with function-calling support.
* Implement `web_search`, `execute_python`, `translate` tool adapters.

### Phase 3 – Research Workspace Front-end (5 days)
* `DraftWorkspace` page with Draft.js editor, JSON preview.
* Pipeline progress indicator (stepper UI).
* Autosave drafts to localStorage & Supabase.
* Connect to back-end agent endpoints.

### Phase 4 – Analytics & Collaboration Enhancement (3 days)
* Wire `AnalyticsDashboard` to live Supabase views.
* Convert `CollaborationPanel` mock actions → real API mutations.

### Phase 5 – Patent Intelligence Module (7 days)
* Prior-art search service (patent APIs).
* White-space analysis algorithm.
* Patent drafting agent + claim optimiser.
* Integrate with Innovation Pipeline UI.

### Phase 6 – Versioning, Export & Translation (2 days)
* Implement snapshot endpoint, diff view.
* PDF/Markdown export service.
* Translation agent hook.

### Phase 7 – QA & Deployment (2 days)
* Unit + integration tests (Jest + React Testing Library).
* E2E tests (Playwright).
* Netlify/Vercel deployment pipeline.

---

## 3. Milestones & Acceptance

| Milestone | Phases Covered | Acceptance Criteria |
|-----------|----------------|---------------------|
| **MVP 1** | 0-2 | User can submit a query and receive JSON artefacts stored in Supabase. |
| **MVP 2** | 0-4 | Full Research Workspace UI with live dashboards and collaboration. |
| **MVP 3** | 0-6 | Patent intelligence, export, versioning complete. |
| **Production 1.0** | 0-7 | All tests pass, CI/CD green, docs updated, security reviewed. |

---

## 4. Task-Tracking Conventions
* Each feature is broken into **tasks** stored under `docs/delivery/<PBI-ID>/` per user global rules.
* Status synced between task file and index.
* Commit messages: `<task_id> <description>`.

---

## 5. Next Immediate Actions
1. phase-0-setup task – initialise lint, CI, docs.
2. phase-1-db-schema task – create Supabase migration scripts.
3. phase-2-pipeline-engine task – scaffold agent orchestrator.

*(Add new tasks to backlog and update this plan as progress is made.)*
