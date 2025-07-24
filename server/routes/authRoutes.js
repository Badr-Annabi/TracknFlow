/**
 * Authentication Routes
 * Handles user registration, login, and profile retrieval
 */

import express from 'express';
import { getMe, login, register } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);

export default router;
