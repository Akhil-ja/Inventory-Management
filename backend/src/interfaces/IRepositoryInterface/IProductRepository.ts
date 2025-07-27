import { IBaseRepository } from './IBaseRepository.js';
import { IProduct } from '../../interfaces/IProduct.js';
import { Document } from 'mongoose';

export interface IProductRepository extends IBaseRepository<IProduct & Document> {
  findByProductId(productId: string): Promise<IProduct | null>;
  updateStock(productId: string, quantity: number): Promise<IProduct | null>;
}
