import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import ProductList from "../components/ProductList";
import AddProductForm from "../components/AddProductForm";
import StockMovementForm from "../components/StockMovementForm";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";
import Dashboard from "../components/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="add-product" element={<AddProductForm />} />
        <Route path="stock-in" element={<StockMovementForm type="in" />} />
        <Route path="stock-out" element={<StockMovementForm type="out" />} />
        <Route path="create-invoice" element={<InvoiceForm />} />
        <Route path="invoices" element={<InvoiceList />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
