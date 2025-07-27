import { Request, Response } from 'express';
import { IInvoiceService } from '../interfaces/IServiceInterface/IInvoiceService.js';
import InvoiceService from '../services/InvoiceService.js';

class InvoiceController {
  private invoiceService: IInvoiceService;

  constructor(invoiceService: IInvoiceService) {
    this.invoiceService = invoiceService;
  }

  createInvoice = async (req: Request, res: Response): Promise<void> => {
    const invoiceData = req.body;
    const newInvoice = await this.invoiceService.createInvoice(invoiceData);
    res.status(201).json(newInvoice);
  };

  getInvoices = async (req: Request, res: Response): Promise<void> => {
    const invoices = await this.invoiceService.getInvoices();
    res.status(200).json(invoices);
  };

  getInvoiceById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const invoice = await this.invoiceService.getInvoiceById(id);
    if (!invoice) {
      res.status(404).json({ message: 'Invoice not found.' });
      return;
    }
    res.status(200).json(invoice);
  };

  cancelInvoice = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const cancelledInvoice = await this.invoiceService.cancelInvoice(id);
    if (!cancelledInvoice) {
      res.status(404).json({ message: 'Invoice not found.' });
      return;
    }
    res.status(200).json(cancelledInvoice);
  }
}

export default new InvoiceController(InvoiceService);
