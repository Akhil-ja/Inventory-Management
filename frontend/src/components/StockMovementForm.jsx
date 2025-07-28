import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createStockIn,
  createStockOut,
} from "../slices/stockMovements/stockMovementSlice";
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
} from "@mui/material";
import { showNotification } from "../slices/notification/notificationSlice";

function StockMovementForm({ type }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [source, setSource] = useState("");
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stockMovementData = {
      productId,
      quantity: Number(quantity),
      remarks,
      ...(type === "in" && { source }),
      ...(type === "out" && { reason }),
    };
    try {
      let resultAction;
      if (type === "in") {
        resultAction = await dispatch(createStockIn(stockMovementData));
      } else if (type === "out") {
        resultAction = await dispatch(createStockOut(stockMovementData));
      }
      unwrapResult(resultAction);
      dispatch(
        showNotification({
          message: `Stock ${type === "in" ? "in" : "out"} successful!`,
          type: "success",
        })
      );
      dispatch(fetchProducts());
      setProductId("");
      setQuantity("");
      setSource("");
      setReason("");
      setRemarks("");
    } catch (err) {
      dispatch(
        showNotification({
          message: `Failed to perform stock ${type === "in" ? "in" : "out"}: ${
            err.message || err.error || JSON.stringify(err)
          }`,
          type: "error",
        })
      );
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        maxWidth: 500,
        mx: "auto",
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        {type === "in" ? "Stock In" : "Stock Out"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="product-select-label">Product</InputLabel>
          <Select
            labelId="product-select-label"
            value={productId}
            label="Product"
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <MenuItem value="">Select a product</MenuItem>
            {products.map((product) => (
              <MenuItem key={product._id} value={product.productId}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        {type === "in" && (
          <TextField
            label="Source"
            variant="outlined"
            fullWidth
            margin="normal"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
        )}
        {type === "out" && (
          <TextField
            label="Reason"
            variant="outlined"
            fullWidth
            margin="normal"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        )}
        <TextField
          label="Remarks"
          variant="outlined"
          fullWidth
          margin="normal"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {type === "in" ? "Stock In" : "Stock Out"}
        </Button>
      </form>
    </Box>
  );
}

export default StockMovementForm;
