import { Request, Response } from 'express';
import { IProductService } from '../interfaces/IServiceInterface/IProductService.js';
import ProductService from '../services/ProductService.js';

class ProductController {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  createProduct = async (req: Request, res: Response): Promise<void> => {
    const productData = req.body;
    const newProduct = await this.productService.createProduct(productData);
    res.status(201).json(newProduct);
  };

  getProducts = async (req: Request, res: Response): Promise<void> => {
    const products = await this.productService.getProducts();
    res.status(200).json(products);
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await this.productService.getProductByProductId(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.status(200).json(product);
  };
}

export default new ProductController(ProductService);
