import express from 'express';
const router = express.Router();

router.get('/create', (req, res) => {
  res.send('User');
});

export default router;
