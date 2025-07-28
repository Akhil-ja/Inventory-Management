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

  const [customerNameError, setCustomerNameError] = useState("");
  const [customerEmailError, setCustomerEmailError] = useState("");
  const [customerPhoneError, setCustomerPhoneError] = useState("");
  const [productsError, setProductsError] = useState("");

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
      setProductsError("");
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    const numQuantity = Number(quantity);
    // eslint-disable-next-line no-empty
    if (isNaN(numQuantity) || numQuantity <= 0) {
    } else {
      setQuantityMap({ ...quantityMap, [productId]: numQuantity });
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(
      selectedProducts.filter((p) => p.productId !== productId)
    );
    const newQuantityMap = { ...quantityMap };
    delete newQuantityMap[productId];
    setQuantityMap(newQuantityMap);
  };

  const validateForm = () => {
    let isValid = true;

    const trimmedCustomerName = customerName.trim();
    const trimmedCustomerEmail = customerEmail.trim();
    const trimmedCustomerPhone = customerPhone.trim();

    if (!trimmedCustomerName) {
      setCustomerNameError("Customer name cannot be empty.");
      isValid = false;
    } else if (/\d/.test(trimmedCustomerName)) {
      setCustomerNameError("Customer name cannot contain numbers.");
      isValid = false;
    } else {
      setCustomerNameError("");
    }

    if (!trimmedCustomerEmail) {
      setCustomerEmailError("Customer email cannot be empty.");
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(trimmedCustomerEmail)) {
      setCustomerEmailError("Invalid email format.");
      isValid = false;
    } else {
      setCustomerEmailError("");
    }

    if (trimmedCustomerPhone && !/^\d{10}$/.test(trimmedCustomerPhone)) {
      setCustomerPhoneError("Phone number must be 10 digits.");
      isValid = false;
    } else {
      setCustomerPhoneError("");
    }

    if (selectedProducts.length === 0) {
      setProductsError("Please add at least one product to the invoice.");
      isValid = false;
    } else {
      let allQuantitiesValid = true;
      selectedProducts.forEach((p) => {
        const quantity = quantityMap[p.productId];
        if (isNaN(quantity) || quantity <= 0) {
          allQuantitiesValid = false;
        }
      });
      if (!allQuantitiesValid) {
        setProductsError("All product quantities must be positive numbers.");
        isValid = false;
      } else {
        setProductsError("");
      }
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setMessageType(null);

    if (!validateForm()) {
      return;
    }

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
            name: customerName.trim(),
            email: customerEmail.trim(),
            phone: customerPhone.trim(),
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
          error={!!customerNameError}
          helperText={customerNameError}
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
          error={!!customerEmailError}
          helperText={customerEmailError}
        />
        <TextField
          label="Customer Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          type="tel"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          error={!!customerPhoneError}
          helperText={customerPhoneError}
        />

        <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 2 }}>
          Products for Invoice
        </Typography>
        <FormControl fullWidth margin="normal" error={!!productsError}>
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
          {productsError && (
            <Typography color="error" variant="caption">
              {productsError}
            </Typography>
          )}
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
                      value={quantityMap[product.productId] || ""}
                      onChange={(e) =>
                        handleQuantityChange(product.productId, e.target.value)
                      }
                      inputProps={{ min: "1" }}
                      sx={{ width: 80, ml: 2 }}
                      size="small"
                      error={
                        isNaN(quantityMap[product.productId]) ||
                        quantityMap[product.productId] <= 0
                      }
                      helperText={
                        isNaN(quantityMap[product.productId]) ||
                        quantityMap[product.productId] <= 0
                          ? "Positive quantity required"
                          : ""
                      }
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
