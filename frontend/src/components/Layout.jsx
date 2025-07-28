import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Container, Paper } from "@mui/material";

function Layout() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
