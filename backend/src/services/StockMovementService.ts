import StockMovementRepository from '../repositories/StockMovementRepository.js';
import StockMovement from '../models/StockMovement.js';
import ProductRepository from '../repositories/ProductRepository.js';
import Product from '../models/Product.js';
import {
  IStockMovement,
  ICreateStockMovement,
} from '../interfaces/IStockMovement.js';
import { IStockMovementService } from '../interfaces/IServiceInterface/IStockMovementService.js';

class StockMovementService implements IStockMovementService {
  private stockMovementRepository: StockMovementRepository;
  private productRepository: ProductRepository;

  constructor(
    stockMovementRepository: StockMovementRepository,
    productRepository: ProductRepository,
  ) {
    this.stockMovementRepository = stockMovementRepository;
    this.productRepository = productRepository;
  }

  async createStockMovement(
    stockMovementData: ICreateStockMovement,
  ): Promise<IStockMovement> {
    return this.stockMovementRepository.create(stockMovementData);
  }

  async getStockMovements(): Promise<IStockMovement[]> {
    return this.stockMovementRepository.find({});
  }

  async getStockMovementById(
    stockMovementId: string,
  ): Promise<IStockMovement | null> {
    return this.stockMovementRepository.findById(stockMovementId);
  }

  async stockIn(
    productId: string,
    quantity: number,
    source: string,
    remarks?: string,
  ): Promise<IStockMovement> {
    const product = await this.productRepository.findByProductId(productId);
    if (!product) {
      throw new Error('Product not found.');
    }

    await this.productRepository.updateStock(productId, quantity);

    const stockMovementData: ICreateStockMovement = {
      productId: product._id,
      quantity,
      type: 'in',
      source,
      remarks,
    };
    return this.stockMovementRepository.create(stockMovementData);
  }

  async stockOut(
    productId: string,
    quantity: number,
    reason: string,
    remarks?: string,
  ): Promise<IStockMovement> {
    const product = await this.productRepository.findByProductId(productId);
    if (!product) {
      throw new Error('Product not found.');
    }

    if (product.currentStock < quantity) {
      throw new Error('Insufficient stock.');
    }

    await this.productRepository.updateStock(productId, -quantity);

    const stockMovementData: ICreateStockMovement = {
      productId: product._id,
      quantity,
      type: 'out',
      reason,
      remarks,
    };
    return this.stockMovementRepository.create(stockMovementData);
  }
}

export default new StockMovementService(
  new StockMovementRepository(StockMovement),
  new ProductRepository(Product),
);
