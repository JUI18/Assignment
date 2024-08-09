// routes/authRoutes.js
import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

export default router;
