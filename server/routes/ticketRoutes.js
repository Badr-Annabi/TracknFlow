import express from 'express';
import { create, list, update, remove, listFiltered } from '../controllers/ticketController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);
router.post('/create', create);
router.get('/list', list);
router.patch('/update/:id', update);
router.delete('/remove/:id', remove);
router.get('/filtered', listFiltered);

export default router;