import mongoose, { Schema } from 'mongoose';
import { IStockMovement } from '../interfaces/IStockMovement.js';

const stockMovementSchema: Schema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true },
    type: { type: String, enum: ['in', 'out'], required: true },
    reason: { type: String },
    remarks: { type: String },
    source: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IStockMovement>('StockMovement', stockMovementSchema);
