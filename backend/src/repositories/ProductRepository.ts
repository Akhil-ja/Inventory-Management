import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  SaveOptions,
  ProjectionType,
} from 'mongoose';
import Product from '../models/Product.js';
import { IProduct } from '../interfaces/IProduct.js';
import { IProductRepository } from '../interfaces/IRepositoryInterface/IProductRepository.js';

class ProductRepository implements IProductRepository {
  private productModel: Model<IProduct>;

  constructor(productModel: Model<IProduct>) {
    this.productModel = productModel;
  }

  async findById(
    id: string,
    projection?: ProjectionType<IProduct> | null,
    options?: QueryOptions<IProduct>,
  ): Promise<IProduct | null> {
    return this.productModel.findById(id, projection, options);
  }

  async findByProductId(productId: string): Promise<IProduct | null> {
    return this.productModel.findOne({ productId });
  }

  async create(productData: IProduct): Promise<IProduct> {
    return this.productModel.create(productData);
  }

  async findOne(
    query: FilterQuery<IProduct>,
    projection?: ProjectionType<IProduct> | null,
    options?: QueryOptions<IProduct>,
  ): Promise<IProduct | null> {
    return this.productModel.findOne(query, projection, options);
  }

  async find(
    query: FilterQuery<IProduct>,
    projection?: ProjectionType<IProduct> | null,
    options?: QueryOptions<IProduct>,
  ): Promise<IProduct[]> {
    return this.productModel.find(query, projection, options);
  }

  async update(
    query: FilterQuery<IProduct>,
    updateData: UpdateQuery<IProduct>,
    options?: QueryOptions<IProduct>,
  ): Promise<IProduct | null> {
    return this.productModel.findOneAndUpdate(query, updateData, options);
  }

  async delete(query: FilterQuery<IProduct>): Promise<any> {
    return this.productModel.deleteOne(query);
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

export default ProductRepository;
