import { Router } from 'express';
import productRoutes from './productRoutes.js';
import invoiceRoutes from './invoiceRoutes.js';
import stockMovementRoutes from './stockMovementRoutes.js';

const router = Router();

router.use('/products', productRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/stock', stockMovementRoutes);

export default router;
