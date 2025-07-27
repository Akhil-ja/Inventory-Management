import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const router = Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);

export default router;
