import { IProduct } from '../../interfaces/IProduct.js';

export interface IProductService {
  createProduct(productData: IProduct): Promise<IProduct>;
  getProductByProductId(productId: string): Promise<IProduct | null>;
}
