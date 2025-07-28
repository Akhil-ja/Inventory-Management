import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/invoices";

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const createInvoice = createAsyncThunk(
  "invoices/createInvoice",
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, invoiceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelInvoice = createAsyncThunk(
  "invoices/cancelInvoice",
  async (invoiceId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${invoiceId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(cancelInvoice.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (invoice) => invoice._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default invoiceSlice.reducer;
