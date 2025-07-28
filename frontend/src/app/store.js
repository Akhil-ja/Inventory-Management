import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/products/productSlice';
import stockMovementsReducer from '../slices/stockMovements/stockMovementSlice';
import invoicesReducer from '../slices/invoices/invoiceSlice';
import notificationReducer from '../slices/notification/notificationSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    stockMovements: stockMovementsReducer,
    invoices: invoicesReducer,
    notification: notificationReducer,
  },
});
