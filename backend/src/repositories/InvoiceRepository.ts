import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  SaveOptions,
  ProjectionType,
} from 'mongoose';
import Invoice from '../models/Invoice.js';
import { IInvoice } from '../interfaces/IInvoice.js';
import { IInvoiceRepository } from '../interfaces/IRepositoryInterface/IInvoiceRepository.js';

class InvoiceRepository implements IInvoiceRepository {
  private invoiceModel: Model<IInvoice>;

  constructor(invoiceModel: Model<IInvoice>) {
    this.invoiceModel = invoiceModel;
  }

  async create(invoiceData: IInvoice): Promise<IInvoice> {
    return this.invoiceModel.create(invoiceData);
  }

  async findById(
    id: string,
    projection?: ProjectionType<IInvoice> | null,
    options?: QueryOptions<IInvoice>,
  ): Promise<IInvoice | null> {
    return this.invoiceModel.findById(id, projection, options);
  }

  async updateStatus(id: string, status: string): Promise<IInvoice | null> {
    return this.invoiceModel.findByIdAndUpdate(id, { status }, { new: true });
  }

  async findOne(
    query: FilterQuery<IInvoice>,
    projection?: ProjectionType<IInvoice> | null,
    options?: QueryOptions<IInvoice>,
  ): Promise<IInvoice | null> {
    return this.invoiceModel.findOne(query, projection, options);
  }

  async find(
    query: FilterQuery<IInvoice>,
    projection?: ProjectionType<IInvoice> | null,
    options?: QueryOptions<IInvoice>,
  ): Promise<IInvoice[]> {
    return this.invoiceModel.find(query, projection, options);
  }

  async update(
    query: FilterQuery<IInvoice>,
    updateData: UpdateQuery<IInvoice>,
    options?: QueryOptions<IInvoice>,
  ): Promise<IInvoice | null> {
    return this.invoiceModel.findOneAndUpdate(query, updateData, options);
  }

  async delete(query: FilterQuery<IInvoice>): Promise<any> {
    return this.invoiceModel.deleteOne(query);
  }
}

export default InvoiceRepository;
