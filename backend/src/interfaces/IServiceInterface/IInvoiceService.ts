import { IInvoice } from '../../interfaces/IInvoice.js';

export interface IInvoiceService {
  createInvoice(invoiceData: IInvoice): Promise<IInvoice>;
  getInvoices(): Promise<IInvoice[]>;
  getInvoiceById(invoiceId: string): Promise<IInvoice | null>;
  cancelInvoice(invoiceId: string): Promise<IInvoice | null>;
}
