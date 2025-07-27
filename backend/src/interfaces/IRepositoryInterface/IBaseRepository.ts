import {
  Document,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  SaveOptions,
  ProjectionType,
} from 'mongoose';

export interface IBaseRepository<T extends Document> {
  create(item: T | any, options?: SaveOptions): Promise<T>;
  findById(
    id: string,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions<T>,
  ): Promise<T | null>;
  findOne(
    query: FilterQuery<T>,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions<T>,
  ): Promise<T | null>;
  find(
    query: FilterQuery<T>,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions<T>,
  ): Promise<T[]>;
  update(
    query: FilterQuery<T>,
    updateData: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null>;
  delete(query: FilterQuery<T>): Promise<any>;
}
