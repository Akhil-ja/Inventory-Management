import { IStockMovement } from '../../interfaces/IStockMovement.js';

export interface IStockMovementService {
  createStockMovement(
    stockMovementData: IStockMovement,
  ): Promise<IStockMovement>;
  stockIn(
    productId: string,
    quantity: number,
    source: string,
    remarks?: string,
  ): Promise<IStockMovement>;
  stockOut(
    productId: string,
    quantity: number,
    reason: string,
    remarks?: string,
  ): Promise<IStockMovement>;
}
