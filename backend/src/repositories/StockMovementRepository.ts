import { Model } from 'mongoose';
import StockMovement from '../models/StockMovement.js';
import { IStockMovement } from '../interfaces/IStockMovement.js';

class StockMovementRepository {
  private stockMovementModel: Model<IStockMovement>;

  constructor(stockMovementModel: Model<IStockMovement>) {
    this.stockMovementModel = stockMovementModel;
  }

  async create(stockMovementData: IStockMovement): Promise<IStockMovement> {
    return this.stockMovementModel.create(stockMovementData);
  }
}

export default new StockMovementRepository(StockMovement);
