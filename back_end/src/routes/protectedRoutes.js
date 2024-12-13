import express from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT';

const router = express.Router();

router.get('/protected-route', authenticateJWT, (req, res) => {
  res.send('Esta es una ruta protegida');
});

export default router;
