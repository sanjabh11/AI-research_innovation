// Temporary stub for pipeline router to unblock server startup
import express from 'express';
const router = express.Router();
// TODO: Implement actual pipeline endpoints
router.get('/', (req, res) => res.json({ message: 'Pipeline API not implemented yet.' }));
export default router;
