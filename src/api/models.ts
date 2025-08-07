import { createClient } from '@supabase/supabase-js';
import express from 'express';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// GET /api/models
router.get('/', async (_req, res) => {
  const { data, error } = await supabase.from('analytics_models').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST /api/models
router.post('/', async (req, res) => {
  const { name, description, model_type, version, metadata, created_by } = req.body;
  const { data, error } = await supabase.from('analytics_models').insert([
    { name, description, model_type, version, metadata, created_by }
  ]).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// GET /api/models/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('analytics_models').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
});

// PUT /api/models/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase.from('analytics_models').update(updates).eq('id', id).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// DELETE /api/models/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('analytics_models').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

export default router;
