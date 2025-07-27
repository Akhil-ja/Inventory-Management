import { Document, ObjectId } from 'mongoose';

export interface ICreateStockMovement {
  productId: ObjectId;
  quantity: number;
  type: 'in' | 'out';
  reason?: string;
  remarks?: string;
  source?: string;
}

export interface IStockMovement extends Document, ICreateStockMovement {
  createdAt?: Date;
  updatedAt?: Date;
}
