import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getOrderById
} from '../controllers/orderController.js';

import { Router } from 'express';

const router = Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:orderId', getOrderById);
router.put('/:orderId/status', updateOrderStatus);

export default router;
