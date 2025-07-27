import { IBaseRepository } from './IBaseRepository.js';
import { IStockMovement } from '../../interfaces/IStockMovement.js';
import { Document } from 'mongoose';

export interface IStockMovementRepository
  extends IBaseRepository<IStockMovement & Document> {}
