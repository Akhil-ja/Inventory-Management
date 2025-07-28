import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../slices/products/productSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchProducts } from "../slices/products/productSlice";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { showNotification } from "../slices/notification/notificationSlice";

function AddProductForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("kg");
  const [initialStock, setInitialStock] = useState("");
  const [price, setPrice] = useState("");

  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [initialStockError, setInitialStockError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const validateForm = () => {
    let isValid = true;

    const trimmedName = name.trim();
    const trimmedCategory = category.trim();

    if (!trimmedName) {
      setNameError("Product name cannot be empty.");
      isValid = false;
    } else if (/\d/.test(trimmedName)) {
      setNameError("Product name cannot contain numbers.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!trimmedCategory) {
      setCategoryError("Category cannot be empty.");
      isValid = false;
    } else if (/\d/.test(trimmedCategory)) {
      setCategoryError("Category cannot contain numbers.");
      isValid = false;
    } else {
      setCategoryError("");
    }

    const stockNum = Number(initialStock);
    if (isNaN(stockNum) || stockNum < 0) {
      setInitialStockError("Initial stock must be a non-negative number.");
      isValid = false;
    } else {
      setInitialStockError("");
    }

    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum < 0) {
      setPriceError("Price must be a non-negative number.");
      isValid = false;
    } else {
      setPriceError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const resultAction = await dispatch(
        addProduct({
          name: name.trim(),
          category: category.trim(),
          unit,
          initialStock: Number(initialStock),
          price: Number(price),
        })
      );
      unwrapResult(resultAction);
      dispatch(
        showNotification({
          message: "Product added successfully!",
          type: "success",
        })
      );
      dispatch(fetchProducts());
      setName("");
      setCategory("");
      setUnit("kg");
      setInitialStock("");
      setPrice("");
    } catch (err) {
      dispatch(
        showNotification({
          message: `Failed to add product: ${
            err.message || err.error || JSON.stringify(err)
          }`,
          type: "error",
        })
      );
    } finally {
      setLoading(false);
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
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          error={!!categoryError}
          helperText={categoryError}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="unit-label">Unit</InputLabel>
          <Select
            labelId="unit-label"
            value={unit}
            label="Unit"
            onChange={(e) => setUnit(e.target.value)}
            required
          >
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="pcs">pcs</MenuItem>
            <MenuItem value="ltr">ltr</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Initial Stock"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={initialStock}
          onChange={(e) => setInitialStock(e.target.value)}
          required
          error={!!initialStockError}
          helperText={initialStockError}
          inputProps={{ min: "0" }}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          error={!!priceError}
          helperText={priceError}
          inputProps={{ min: "0" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Add Product"}
        </Button>
      </form>
    </Box>
  );
}

export default AddProductForm;
