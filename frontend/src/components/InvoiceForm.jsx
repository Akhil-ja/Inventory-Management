import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice } from "../slices/invoices/invoiceSlice";
import { fetchProducts } from "../slices/products/productSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function InvoiceForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const product = products.find((p) => p.productId === productId);
    if (product && !selectedProducts.some((p) => p.productId === productId)) {
      setSelectedProducts([
        ...selectedProducts,
        {
          productId: product.productId,
          name: product.name,
          price: product.price,
        },
      ]);
      setQuantityMap({ ...quantityMap, [productId]: 1 });
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantityMap({ ...quantityMap, [productId]: Number(quantity) });
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(
      selectedProducts.filter((p) => p.productId !== productId)
    );
    const newQuantityMap = { ...quantityMap };
    delete newQuantityMap[productId];
    setQuantityMap(newQuantityMap);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setMessageType(null);

    let totalAmount = 0;
    const invoiceProducts = selectedProducts.map((p) => {
      const quantity = quantityMap[p.productId];
      const productPrice = p.price;
      totalAmount += quantity * productPrice;
      return {
        productId: p.productId,
        name: p.name,
        quantity: quantity,
        price: productPrice,
      };
    });

    try {
      const resultAction = await dispatch(
        createInvoice({
          customerInfo: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
          },
          products: invoiceProducts,
          totalAmount: totalAmount,
        })
      );
      unwrapResult(resultAction);
      setMessage("Invoice created successfully!");
      setMessageType("success");
      dispatch(fetchProducts());

      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setSelectedProducts([]);
      setQuantityMap({});
    } catch (err) {
      setMessage(
        `Failed to create invoice: ${
          err.message || err.error || JSON.stringify(err)
        }`
      );
      setMessageType("error");
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        maxWidth: 600,
        mx: "auto",
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Create New Invoice
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Customer Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <TextField
          label="Customer Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />
        <TextField
          label="Customer Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          type="tel"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
        />

        <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 2 }}>
          Products for Invoice
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="add-product-label">Add Product</InputLabel>
          <Select
            labelId="add-product-label"
            value=""
            label="Add Product"
            onChange={handleProductChange}
          >
            <MenuItem value="">Select a product</MenuItem>
            {products.map((product) => (
              <MenuItem key={product._id} value={product.productId}>
                {product.name} (Stock: {product.currentStock})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedProducts.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" component="h4" gutterBottom>
              Selected Products:
            </Typography>
            <List>
              {selectedProducts.map((product) => (
                <ListItem
                  key={product.productId}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveProduct(product.productId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ flexGrow: 1 }}>
                      {product.name} - Price:{product.price} Rs
                    </Typography>
                    <TextField
                      type="number"
                      value={quantityMap[product.productId] || 1}
                      onChange={(e) =>
                        handleQuantityChange(product.productId, e.target.value)
                      }
                      inputProps={{ min: "1" }}
                      sx={{ width: 80, ml: 2 }}
                      size="small"
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Create Invoice
        </Button>
      </form>
      {message && (
        <Alert
          severity={messageType === "error" ? "error" : "success"}
          sx={{ mt: 2 }}
        >
          {message}
        </Alert>
      )}
    </Box>
  );
}

export default InvoiceForm;
