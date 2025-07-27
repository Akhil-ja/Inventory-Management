import { Request, Response } from 'express';
import { IStockMovementService } from '../interfaces/IServiceInterface/IStockMovementService.js';
import StockMovementService from '../services/StockMovementService.js';

class StockMovementController {
  private stockMovementService: IStockMovementService;

  constructor(stockMovementService: IStockMovementService) {
    this.stockMovementService = stockMovementService;
  }

  stockIn = async (req: Request, res: Response): Promise<void> => {
    const { productId, quantity, source, remarks } = req.body;
    const newStockMovement = await this.stockMovementService.stockIn(productId, quantity, source, remarks);
    res.status(201).json(newStockMovement);
  };

  stockOut = async (req: Request, res: Response): Promise<void> => {
    const { productId, quantity, reason, remarks } = req.body;
    const newStockMovement = await this.stockMovementService.stockOut(productId, quantity, reason, remarks);
    res.status(201).json(newStockMovement);
  };

  getStockMovements = async (req: Request, res: Response): Promise<void> => {
    const stockMovements = await this.stockMovementService.getStockMovements();
    res.status(200).json(stockMovements);
  };

  getStockMovementById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const stockMovement = await this.stockMovementService.getStockMovementById(id);
    if (!stockMovement) {
      res.status(404).json({ message: 'Stock movement not found.' });
      return;
    }
    res.status(200).json(stockMovement);
  };
}

export default new StockMovementController(StockMovementService);
