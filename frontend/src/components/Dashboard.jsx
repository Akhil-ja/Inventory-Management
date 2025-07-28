import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../slices/products/productSlice';
import { fetchInvoices } from '../slices/invoices/invoiceSlice';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';

function Dashboard() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const productError = useSelector((state) => state.products.error);

  const invoices = useSelector((state) => state.invoices.items);
  const invoiceStatus = useSelector((state) => state.invoices.status);
  const invoiceError = useSelector((state) => state.invoices.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
    if (invoiceStatus === 'idle') {
      dispatch(fetchInvoices());
    }
  }, [productStatus, invoiceStatus, dispatch]);

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.currentStock, 0);
  const activeInvoices = invoices.filter(invoice => invoice.status === 'active').length;
  const cancelledInvoices = invoices.filter(invoice => invoice.status === 'cancelled').length;

  if (productStatus === 'loading' || invoiceStatus === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (productStatus === 'failed' || invoiceStatus === 'failed') {
    return (
      <Typography color="error">
        Error loading data: {productError || invoiceError}
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Total Products
              </Typography>
              <Typography variant="h3" color="primary">
                {totalProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Total Stock Quantity
              </Typography>
              <Typography variant="h3" color="primary">
                {totalStock}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Active Invoices
              </Typography>
              <Typography variant="h3" color="primary">
                {activeInvoices}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Cancelled Invoices
              </Typography>
              <Typography variant="h3" color="primary">
                {cancelledInvoices}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
