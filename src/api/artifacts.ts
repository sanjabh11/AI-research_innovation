import { createClient } from '@supabase/supabase-js';
import express from 'express';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// GET /api/artifacts
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('artifacts').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST /api/artifacts
router.post('/', async (req, res) => {
  const { query_id, type, payload } = req.body;
  const { data, error } = await supabase.from('artifacts').insert([{ query_id, type, payload }]).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// GET /api/artifacts/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('artifacts').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
});

// DELETE /api/artifacts/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('artifacts').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

export default router;
