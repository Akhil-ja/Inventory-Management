import { Model } from 'mongoose';
import Invoice from '../models/Invoice.js';
import { IInvoice } from '../interfaces/IInvoice.js';

class InvoiceRepository {
  private invoiceModel: Model<IInvoice>;

  constructor(invoiceModel: Model<IInvoice>) {
    this.invoiceModel = invoiceModel;
  }

  async create(invoiceData: IInvoice): Promise<IInvoice> {
    return this.invoiceModel.create(invoiceData);
  }

  async findById(id: string): Promise<IInvoice | null> {
    return this.invoiceModel.findById(id);
  }

  async updateStatus(id: string, status: string): Promise<IInvoice | null> {
    return this.invoiceModel.findByIdAndUpdate(id, { status }, { new: true });
  }
}

export default new InvoiceRepository(Invoice);
