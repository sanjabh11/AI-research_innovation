import { createClient } from '@supabase/supabase-js';
import express from 'express';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// GET /api/queries
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('queries').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST /api/queries
router.post('/', async (req, res) => {
  const { user_id, query_text } = req.body;
  const { data, error } = await supabase.from('queries').insert([{ user_id, query_text }]).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// GET /api/queries/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('queries').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
});

// DELETE /api/queries/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('queries').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

export default router;
