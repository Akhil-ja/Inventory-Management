import { Router } from 'express';
import InvoiceController from '../controllers/InvoiceController.js';

const router = Router();

router.post('/', InvoiceController.createInvoice);
router.get('/', InvoiceController.getInvoices);
router.get('/:id', InvoiceController.getInvoiceById);
router.delete('/:id', InvoiceController.cancelInvoice);

export default router;
