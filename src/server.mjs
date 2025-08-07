/**
 * ARIA Platform Backend Server
 *
 * API key usage:
 * - All required keys are loaded from .env (see .env.example for list and comments)
 * - SUPABASE_URL and SUPABASE_KEY are used for database/auth requests
 * - GEMINI_API_KEY is used for LLM-powered features
 * - Never commit real .env to source control; .env.example is safe for onboarding
 * - All keys are checked at runtime via src/utils/envCheck.ts
 * - Never use Supabase service_role key in frontend or public repos
 */
/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { checkRequiredEnvVars } from './utils/envCheck.js';
import queriesRouter from './api/queries.js';
import artifactsRouter from './api/artifacts.js';
import projectsRouter from './api/projects.js';
import collaboratorsRouter from './api/collaborators.js';
import pipelineRouter from './api/pipeline.js';
import modelsRouter from './api/models.js';
import analyticsRouter from './api/analytics.js';
import patentRouter from './api/patent.js';
dotenv.config();
checkRequiredEnvVars();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(helmet());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);
app.use(express.json());
app.use('/api/queries', queriesRouter);
app.use('/api/artifacts', artifactsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/collaborators', collaboratorsRouter);
app.use('/api/pipeline', pipelineRouter);
app.use('/api/models', modelsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/patent', patentRouter);
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
