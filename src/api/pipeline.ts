import express from 'express';
import { AgentPipelineManager } from '../agent/AgentPipelineManager';

const router = express.Router();

// POST /api/pipeline
router.post('/', async (req, res) => {
  const { steps } = req.body; // Array of {name, input, promptName}
  try {
    const manager = new AgentPipelineManager(steps);
    const result = await manager.runPipeline();
    res.json({ steps: result });
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
});

export default router;
