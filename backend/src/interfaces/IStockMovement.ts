import { Document, ObjectId } from 'mongoose';

export interface IStockMovement extends Document {
  productId: ObjectId;
  quantity: number;
  type: string;
  reason: string;
  remarks: string;
  createdAt?: Date;
  updatedAt?: Date;
}
