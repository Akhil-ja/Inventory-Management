import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  SaveOptions,
  ProjectionType,
} from 'mongoose';
import StockMovement from '../models/StockMovement.js';
import {
  IStockMovement,
  ICreateStockMovement,
} from '../interfaces/IStockMovement.js';
import { IStockMovementRepository } from '../interfaces/IRepositoryInterface/IStockMovementRepository.js';

class StockMovementRepository implements IStockMovementRepository {
  private stockMovementModel: Model<IStockMovement>;

  constructor(stockMovementModel: Model<IStockMovement>) {
    this.stockMovementModel = stockMovementModel;
  }

  async create(
    stockMovementData: ICreateStockMovement,
  ): Promise<IStockMovement> {
    return this.stockMovementModel.create(stockMovementData);
  }

  async findById(
    id: string,
    projection?: ProjectionType<IStockMovement> | null,
    options?: QueryOptions<IStockMovement>,
  ): Promise<IStockMovement | null> {
    return this.stockMovementModel.findById(id, projection, options);
  }

  async findOne(
    query: FilterQuery<IStockMovement>,
    projection?: ProjectionType<IStockMovement> | null,
    options?: QueryOptions<IStockMovement>,
  ): Promise<IStockMovement | null> {
    return this.stockMovementModel.findOne(query, projection, options);
  }

  async find(
    query: FilterQuery<IStockMovement>,
    projection?: ProjectionType<IStockMovement> | null,
    options?: QueryOptions<IStockMovement>,
  ): Promise<IStockMovement[]> {
    return this.stockMovementModel.find(query, projection, options);
  }

  async update(
    query: FilterQuery<IStockMovement>,
    updateData: UpdateQuery<IStockMovement>,
    options?: QueryOptions<IStockMovement>,
  ): Promise<IStockMovement | null> {
    return this.stockMovementModel.findOneAndUpdate(query, updateData, options);
  }

  async delete(query: FilterQuery<IStockMovement>): Promise<any> {
    return this.stockMovementModel.deleteOne(query);
  }
}

export default StockMovementRepository;
