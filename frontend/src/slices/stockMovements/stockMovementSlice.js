import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL + "/api/stock";

export const createStockIn = createAsyncThunk(
  "stockMovements/createStockIn",
  async (stockMovementData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/stock-in`,
        stockMovementData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createStockOut = createAsyncThunk(
  "stockMovements/createStockOut",
  async (stockMovementData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/stock-out`,
        stockMovementData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const stockMovementSlice = createSlice({
  name: "stockMovements",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStockIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStockIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createStockIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createStockOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStockOut.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createStockOut.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default stockMovementSlice.reducer;
