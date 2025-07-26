import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../interfaces/IProduct.js';

const productSchema: Schema<IProduct> = new Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    unit: {
      type: String,
      enum: ['kg', 'pcs', 'ltr'],
      required: true,
      trim: true,
    },
    initialStock: {
      type: Number,
      required: true,
      min: 0,
    },
    currentStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IProduct>('Product', productSchema);
