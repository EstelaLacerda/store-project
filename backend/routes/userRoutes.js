import { Router } from 'express';
const router = Router();
import { register, list, get, update, remove } from '../controllers/userController.js';

router.post('/', register);
router.get('/', list);
router.get('/:id', get);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
