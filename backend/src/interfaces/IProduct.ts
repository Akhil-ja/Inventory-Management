import { Document, ObjectId } from 'mongoose';

export interface IProduct extends Document {
  _id: ObjectId;
  productId: string;
  name: string;
  category: string;
  unit: string;
  initialStock: number;
  currentStock: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateProduct {
  productId?: string;
  name: string;
  category: string;
  unit: string;
  initialStock: number;
  price: number;
}
