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
} from "@mui/material";
import { showNotification } from "../slices/notification/notificationSlice";

function AddProductForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("kg");
  const [initialStock, setInitialStock] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        addProduct({
          name,
          category,
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
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
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
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Product
        </Button>
      </form>
    </Box>
  );
}

export default AddProductForm;
