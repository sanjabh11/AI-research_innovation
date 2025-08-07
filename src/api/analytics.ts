import { createClient } from '@supabase/supabase-js';
import express from 'express';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// GET /api/analytics/predictions
router.get('/predictions', async (_req, res) => {
  const { data, error } = await supabase.from('predictions').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST /api/analytics/predictions
router.post('/predictions', async (req, res) => {
  const record = req.body; // Expect model_id, input_params, output, confidence, user_id
  const { data, error } = await supabase.from('predictions').insert([record]).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// GET /api/analytics/risk
router.get('/risk', async (_req, res) => {
  const { data, error } = await supabase.from('risk_metrics').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST /api/analytics/risk
router.post('/risk', async (req, res) => {
  const record = req.body; // project_id, metric, generated_by
  const { data, error } = await supabase.from('risk_metrics').insert([record]).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

export default router;
