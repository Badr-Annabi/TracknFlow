/**
 * Ticket Routes
 * RESTful routes for ticket CRUD operations
 * All routes require authentication
 */

import express from 'express';
import { create, list, update, remove, listFiltered } from '../controllers/ticketController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

// Specific routes first to avoid conflicts
router.get('/filtered', listFiltered);
router.post('/', create);
router.get('/', list);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;