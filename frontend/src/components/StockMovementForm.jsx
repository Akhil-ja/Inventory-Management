import React, { useState, useEffect } from "react";
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

  const [productIdError, setProductIdError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [sourceError, setSourceError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [remarksError, setRemarksError] = useState("");

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const validateForm = () => {
    let isValid = true;

    if (!productId) {
      setProductIdError("Please select a product.");
      isValid = false;
    } else {
      setProductIdError("");
    }

    const numQuantity = Number(quantity);
    if (isNaN(numQuantity) || numQuantity <= 0) {
      setQuantityError("Quantity must be a positive number.");
      isValid = false;
    } else {
      setQuantityError("");
    }

    if (type === "in") {
      if (!source.trim()) {
        setSourceError("Source cannot be empty.");
        isValid = false;
      } else {
        setSourceError("");
      }
    } else if (type === "out") {
      if (!reason.trim()) {
        setReasonError("Reason cannot be empty.");
        isValid = false;
      } else {
        setReasonError("");
      }
    }

    if (remarks && !remarks.trim()) {
      setRemarksError("Remarks cannot be spaces.");
      isValid = false;
    } else {
      setRemarksError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const stockMovementData = {
      productId,
      quantity: Number(quantity),
      remarks: remarks.trim(),
      ...(type === "in" && { source: source.trim() }),
      ...(type === "out" && { reason: reason.trim() }),
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
        <FormControl fullWidth margin="normal" error={!!productIdError}>
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
          {productIdError && (
            <Typography color="error" variant="caption">
              {productIdError}
            </Typography>
          )}
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
          error={!!quantityError}
          helperText={quantityError}
          inputProps={{ min: "1" }}
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
            error={!!sourceError}
            helperText={sourceError}
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
            error={!!reasonError}
            helperText={reasonError}
          />
        )}
        <TextField
          label="Remarks"
          variant="outlined"
          fullWidth
          margin="normal"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          error={!!remarksError}
          helperText={remarksError}
        />
        <Button
          type="submit"
          n
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
