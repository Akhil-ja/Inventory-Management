import { IStockMovement } from '../../interfaces/IStockMovement.js';

export interface IStockMovementService {
  createStockMovement(
    stockMovementData: IStockMovement,
  ): Promise<IStockMovement>;
}
