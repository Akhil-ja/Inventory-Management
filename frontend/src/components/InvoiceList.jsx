import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoices, cancelInvoice } from "../slices/invoices/invoiceSlice";
import { fetchProducts } from "../slices/products/productSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { showNotification } from "../slices/notification/notificationSlice";
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
  const [cancellingInvoiceId, setCancellingInvoiceId] = useState(null);

  const dispatch = useDispatch();
  const {
    items: invoices,
    status,
    error,
  } = useSelector((state) => state.invoices);
  const productStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInvoices());
    }
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, productStatus, dispatch]);

  const handleCancelInvoice = async (invoiceId) => {
    setCancellingInvoiceId(invoiceId); // Set loading for this invoice
    try {
      const resultAction = await dispatch(cancelInvoice(invoiceId));
      unwrapResult(resultAction);
      dispatch(
        showNotification({
          message: "Invoice cancelled successfully!",
          type: "success",
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          message: `Failed to cancel invoice: ${
            err.message || err.error || JSON.stringify(err)
          }`,
          type: "error",
        })
      );
    } finally {
      setCancellingInvoiceId(null); // Reset loading
    }
  };

  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Invoice List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="invoice table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Invoice Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
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
                      variant="contained"
                      color="secondary"
                      onClick={() => handleCancelInvoice(invoice._id)}
                      disabled={
                        invoice.status === "cancelled" ||
                        cancellingInvoiceId === invoice._id
                      }
                      startIcon={
                        cancellingInvoiceId === invoice._id ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : null
                      }
                    >
                      {cancellingInvoiceId === invoice._id
                        ? "Cancelling..."
                        : "Cancel"}
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
