import HttpError from '../utils/HttpError.js';
import HttpStatus from '../utils/HttpStatus.js';
import ProductRepository from '../repositories/ProductRepository.js';
import Product from '../models/Product.js';
import { IProduct, ICreateProduct } from '../interfaces/IProduct.js';
import { IProductService } from '../interfaces/IServiceInterface/IProductService.js';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

class ProductService implements IProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async createProduct(productData: ICreateProduct): Promise<IProduct> {
    if (!productData.productId) {
      const datePart = format(new Date(), 'yyyyMMdd');
      const randomPart = uuidv4().substring(0, 6).toUpperCase();
      productData.productId = `P-${datePart}-${randomPart}`;
    }

    const existingProduct = await this.productRepository.findByProductId(
      productData.productId,
    );
    if (existingProduct) {
      throw new HttpError('Product with this productId already exists.', HttpStatus.CONFLICT);
    }

    const productToCreate = {
      ...productData,
      currentStock: productData.initialStock,
    };

    return this.productRepository.create(productToCreate as IProduct);
  }

  async getProducts(): Promise<IProduct[]> {
    return this.productRepository.find({});
  }

  async getProductByProductId(productId: string): Promise<IProduct | null> {
    return this.productRepository.findByProductId(productId);
  }
}

export default new ProductService(new ProductRepository(Product));
