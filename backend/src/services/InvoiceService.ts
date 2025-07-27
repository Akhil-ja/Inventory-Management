import InvoiceRepository from '../repositories/InvoiceRepository.js';
import Invoice from '../models/Invoice.js';
import ProductRepository from '../repositories/ProductRepository.js';
import Product from '../models/Product.js';
import StockMovementRepository from '../repositories/StockMovementRepository.js';
import StockMovement from '../models/StockMovement.js';
import { IInvoice, IInvoiceProduct } from '../interfaces/IInvoice.js';
import { IInvoiceService } from '../interfaces/IServiceInterface/IInvoiceService.js';
import {
  IStockMovement,
  ICreateStockMovement,
} from '../interfaces/IStockMovement.js';

class InvoiceService implements IInvoiceService {
  private invoiceRepository: InvoiceRepository;
  private productRepository: ProductRepository;
  private stockMovementRepository: StockMovementRepository;

  constructor(
    invoiceRepository: InvoiceRepository,
    productRepository: ProductRepository,
    stockMovementRepository: StockMovementRepository,
  ) {
    this.invoiceRepository = invoiceRepository;
    this.productRepository = productRepository;
    this.stockMovementRepository = stockMovementRepository;
  }

  async createInvoice(invoiceData: IInvoice): Promise<IInvoice> {
    for (const item of invoiceData.products) {
      const product = await this.productRepository.findByProductId(
        item.productId,
      );

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }

      if (product.currentStock < item.quantity) {
        throw new Error(
          `Insufficient stock for product ${product.name}. Available: ${product.currentStock}, Requested: ${item.quantity}`,
        );
      }

      await this.productRepository.updateStock(item.productId, -item.quantity);

      const stockMovementData: ICreateStockMovement = {
        productId: product._id,
        quantity: item.quantity,
        type: 'out',
        reason: 'Sale',
        remarks: `Invoice ${invoiceData._id}`,
      };
      await this.stockMovementRepository.create(stockMovementData);
    }

    return this.invoiceRepository.create(invoiceData);
  }

  async cancelInvoice(invoiceId: string): Promise<IInvoice | null> {
    const invoice = await this.invoiceRepository.findById(invoiceId);

    if (!invoice) {
      throw new Error('Invoice not found.');
    }

    if (invoice.status === 'cancelled') {
      return invoice;
    }

    for (const item of invoice.products) {
      const product = await this.productRepository.findByProductId(
        item.productId,
      );

      if (!product) {
        console.warn(
          `Product with ID ${item.productId} not found during invoice cancellation.`,
        );
        continue;
      }

      await this.productRepository.updateStock(item.productId, item.quantity);

      const stockMovementData: ICreateStockMovement = {
        productId: product._id,
        quantity: item.quantity,
        type: 'in',
        source: 'Invoice Cancellation',
        remarks: `Invoice ${invoice._id} cancelled`,
      };
      await this.stockMovementRepository.create(stockMovementData);
    }

    return this.invoiceRepository.updateStatus(invoiceId, 'cancelled');
  }
}

export default new InvoiceService(
  new InvoiceRepository(Invoice),
  new ProductRepository(Product),
  new StockMovementRepository(StockMovement),
);
