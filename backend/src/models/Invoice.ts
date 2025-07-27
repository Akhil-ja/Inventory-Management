import mongoose, { Schema } from 'mongoose';
import { IInvoice, IInvoiceProduct } from '../interfaces/IInvoice.js';

const invoiceProductSchema: Schema<IInvoiceProduct> = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const invoiceSchema: Schema<IInvoice> = new Schema(
  {
    customerInfo: {
      name: { type: String, required: true },
      address: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    products: [invoiceProductSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    invoiceDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled'],
      default: 'active',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IInvoice>('Invoice', invoiceSchema);
