import { Router } from 'express';
import StockMovementController from '../controllers/StockMovementController.js';

const router = Router();

router.post('/stock-in', StockMovementController.stockIn);
router.post('/stock-out', StockMovementController.stockOut);
router.get('/', StockMovementController.getStockMovements);
router.get('/:id', StockMovementController.getStockMovementById);

export default router;
