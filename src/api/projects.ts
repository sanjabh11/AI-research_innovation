import { createClient } from '@supabase/supabase-js';
import express from 'express';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// GET /api/projects
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST /api/projects
router.post('/', async (req, res) => {
  const { owner_id, name, description } = req.body;
  const { data, error } = await supabase.from('projects').insert([{ owner_id, name, description }]).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

export default router;
