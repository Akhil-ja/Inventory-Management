import ProductRepository from '../repositories/ProductRepository.js';
import Product from '../models/Product.js';
import { IProduct } from '../interfaces/IProduct.js';
import { IProductService } from '../interfaces/IServiceInterface/IProductService.js';

class ProductService implements IProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async createProduct(productData: IProduct): Promise<IProduct> {
    const existingProduct = await this.productRepository.findByProductId(
      productData.productId,
    );
    if (existingProduct) {
      throw new Error('Product with this productId already exists.');
    }

    productData.currentStock = productData.initialStock;

    return this.productRepository.create(productData);
  }

  async getProducts(): Promise<IProduct[]> {
    return this.productRepository.find({});
  }

  async getProductByProductId(productId: string): Promise<IProduct | null> {
    return this.productRepository.findByProductId(productId);
  }
}

export default new ProductService(new ProductRepository(Product));
