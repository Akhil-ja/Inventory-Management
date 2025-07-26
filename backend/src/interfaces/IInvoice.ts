import { Document } from 'mongoose';

export interface IInvoiceProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface IInvoice extends Document {
  customerInfo: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  products: IInvoiceProduct[];
  totalAmount: number;
  invoiceDate: Date;
  status: 'created' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}
