import { Model } from 'mongoose';
import Product from '../models/Product.js';
import { IProduct } from '../interfaces/IProduct.js';

class ProductRepository {
  private productModel: Model<IProduct>;

  constructor(productModel: Model<IProduct>) {
    this.productModel = productModel;
  }

  async findById(id: string): Promise<IProduct | null> {
    return this.productModel.findById(id);
  }

  async findByProductId(productId: string): Promise<IProduct | null> {
    return this.productModel.findOne({ productId });
  }

  async create(productData: IProduct): Promise<IProduct> {
    return this.productModel.create(productData);
  }

  async updateStock(
    productId: string,
    quantity: number,
  ): Promise<IProduct | null> {
    return this.productModel.findOneAndUpdate(
      { productId },
      { $inc: { currentStock: quantity } },
      { new: true },
    );
  }
}

export default new ProductRepository(Product);
