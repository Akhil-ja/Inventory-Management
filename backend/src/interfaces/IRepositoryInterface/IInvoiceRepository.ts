import { IBaseRepository } from './IBaseRepository.js';
import { IInvoice } from '../../interfaces/IInvoice.js';
import { Document } from 'mongoose';

export interface IInvoiceRepository extends IBaseRepository<IInvoice & Document> {
  updateStatus(id: string, status: string): Promise<IInvoice | null>;
}
