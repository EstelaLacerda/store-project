import { Router } from 'express';
const router = Router();
import { create, list, remove } from '../controllers/requestController.js';

router.post('/', create);
router.get('/', list);
router.delete('/:id', remove);

export default router;
