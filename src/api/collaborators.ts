import { createClient } from '@supabase/supabase-js';
import express from 'express';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// GET /api/collaborators?project_id=...
router.get('/', async (req, res) => {
  const { project_id } = req.query;
  let query = supabase.from('collaborators').select('*');
  if (project_id) query = query.eq('project_id', project_id);
  const { data, error } = await query;
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST /api/collaborators
router.post('/', async (req, res) => {
  const { project_id, user_id, role } = req.body;
  const { data, error } = await supabase.from('collaborators').insert([{ project_id, user_id, role }]).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// PATCH /api/collaborators/:id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const { data, error } = await supabase.from('collaborators').update({ role }).eq('id', id).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// DELETE /api/collaborators/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('collaborators').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

export default router;
