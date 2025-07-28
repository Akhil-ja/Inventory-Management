import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchInvoices,
  cancelInvoice,
} from "../slices/invoices/invoiceSlice";
import { fetchProducts } from "../slices/products/productSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Alert,
  Button,
} from "@mui/material";

function InvoiceList() {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.items);
  const invoiceStatus = useSelector((state) => state.invoices.status);
  const error = useSelector((state) => state.invoices.error);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    if (invoiceStatus === "idle") {
      dispatch(fetchInvoices());
    }
  }, [invoiceStatus, dispatch]);

  const handleCancelInvoice = async (invoiceId) => {
    if (window.confirm("Are you sure you want to cancel this invoice?")) {
      setMessage(null);
      setMessageType(null);
      try {
        const resultAction = await dispatch(cancelInvoice(invoiceId));
        unwrapResult(resultAction);
        setMessage("Invoice cancelled successfully!");
        setMessageType("success");
        dispatch(fetchProducts());
      } catch (err) {
        setMessage(
          `Failed to cancel invoice: ${
            err.message || err.error || JSON.stringify(err)
          }`
        );
        setMessageType("error");
      }
    }
  };

  if (invoiceStatus === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (invoiceStatus === "failed") {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Invoice List
      </Typography>
      {message && (
        <Alert
          severity={messageType === "error" ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="invoice table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Invoice Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {invoice.invoiceNumber}
                </TableCell>
                <TableCell>{invoice.customerInfo.name}</TableCell>
                <TableCell align="">
                  {invoice.totalAmount.toFixed(2)} Rs
                </TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>
                  {invoice.status !== "cancelled" && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleCancelInvoice(invoice._id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default InvoiceList;
