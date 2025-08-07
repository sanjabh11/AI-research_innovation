import { createClient } from '@supabase/supabase-js';
import express from 'express';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// GET /api/patent/landscapes
router.get('/landscapes', async (_req, res) => {
  const { data, error } = await supabase.from('patent_landscapes').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST /api/patent/landscapes
router.post('/landscapes', async (req, res) => {
  const record = req.body; // project_id, domain, scope, summary
  const { data, error } = await supabase.from('patent_landscapes').insert([record]).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// GET /api/patent/landscapes/:id
router.get('/landscapes/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('patent_landscapes').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
});

// PUT /api/patent/landscapes/:id
router.put('/landscapes/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase.from('patent_landscapes').update(updates).eq('id', id).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// DELETE /api/patent/landscapes/:id
router.delete('/landscapes/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('patent_landscapes').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

export default router;
