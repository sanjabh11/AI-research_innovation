import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import queriesRouter from './api/queries';
import artifactsRouter from './api/artifacts';
import projectsRouter from './api/projects';
import collaboratorsRouter from './api/collaborators';
import pipelineRouter from './api/pipeline';
import modelsRouter from './api/models';
import analyticsRouter from './api/analytics';
import patentRouter from './api/patent';

// Load environment variables from .env if present
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Mount routers
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
