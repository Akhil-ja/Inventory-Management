import {
  Document,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  SaveOptions,
} from 'mongoose';

export interface IBaseRepository<T extends Document> {
  create(item: T | any, options?: SaveOptions): Promise<T>;
  findById(id: string, options?: QueryOptions): Promise<T | null>;
  findOne(query: FilterQuery<T>, options?: QueryOptions): Promise<T | null>;
  find(query: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
  update(
    query: FilterQuery<T>,
    updateData: UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<T | null>;
  delete(query: FilterQuery<T>): Promise<any>;
}
