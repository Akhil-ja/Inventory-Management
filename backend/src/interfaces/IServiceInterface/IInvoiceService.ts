import { IInvoice } from '../../interfaces/IInvoice.js';

export interface IInvoiceService {
  createInvoice(invoiceData: IInvoice): Promise<IInvoice>;
  cancelInvoice(invoiceId: string): Promise<IInvoice | null>;
}
