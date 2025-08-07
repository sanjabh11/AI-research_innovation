# ARIA Platform – Autonomous Research & Innovation Engine

## Overview
ARIA is a next-generation platform for automating scientific research, patent intelligence, and innovation workflows. It combines multi-agent LLM orchestration, real-time data retrieval, and patent pipeline management to accelerate discovery and IP creation.

## Implementation Status (as of August 2025)
- All major features implemented per PRD/user stories
- No mock data remains; all data is live via Supabase
- Guest/anonymous login enabled by default
- Premium, mobile-first UI/UX (glassmorphism, smooth transitions)
- Security: helmet, rate-limit, CORS, .env in .gitignore; RLS enabled
- All backend routers and DB tables live; tested
- Documentation and onboarding up to date

## Features
- Multi-agent research synthesis (literature, data, narrative)
- Patent landscape analysis and invention generation
- Collaboration tools and analytics dashboards
- Versioning, export, and translation of research outputs

## Tech Stack
- **Frontend**: React, ShadCN, Tailwind, Draft.js
- **Backend**: Node.js/Express (API), Supabase (DB/Auth)
- **AI**: Gemini 2.5 Pro (function-calling, prompt registry)
- **CI/CD**: GitHub Actions, Husky, ESLint, Prettier

## Getting Started
1. Clone the repo
2. Copy `.env.example` to `.env` and fill in your keys (see below)
3. Install dependencies: `npm install`
4. Run the app: `npm run dev`

### Required Environment Variables
See `.env.example` for all required keys:
- `SUPABASE_URL`, `SUPABASE_KEY`: Supabase project info
- `GEMINI_API_KEY`: Google Gemini LLM
- Add any analytics or integration keys as needed

### Security Checklist
- `.env` and build output are gitignored
- API keys **never** hardcoded
- Helmet, rate-limit, and CORS enabled in backend
- Supabase RLS (Row Level Security) active
- Guest login is read-only

### API & Table Overview
- **Supabase Tables:** `patent_landscapes`, `analytics_models`, `predictions`, `risk_metrics`, etc.
- **API Routers:** `/api/patent`, `/api/analytics`, `/api/models`, `/api/pipeline` (CRUD)
- **Auth:** Supabase email/OTP + guest/anonymous fallback

## Development Conventions
- All tasks tracked via `plan.md` and `/docs/delivery/`
- Linting and formatting enforced pre-commit
- PRs must reference task IDs and update status in task files

## License
© 2025 ARIA Platform. All rights reserved.

---

## Pending / Future Work
- Add more analytics visualizations (roadmap)
- Integrate additional LLM providers (optional)
- Add user roles/permissions (beyond guest)
- Expand API key management and admin dashboard
- Ongoing: security audits, accessibility improvements, performance tuning

## Contact & Support
For issues, feature requests, or onboarding help, please open a GitHub issue or contact the maintainers.
