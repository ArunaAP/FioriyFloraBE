import {
  createFlower,
  getFlowers,
  getFlowerById,
  updateFlower,
  deleteFlower
} from '../controllers/flowerController.js';

import { Router } from 'express';

const router = Router();

router.post('/', createFlower);
router.get('/', getFlowers);
router.get('/:flowerId', getFlowerById);
router.put('/:flowerId', updateFlower);
router.delete('/:flowerId', deleteFlower);

export default router;
