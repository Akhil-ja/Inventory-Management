import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Inventory Management
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/products">Products</Button>
        <Button color="inherit" component={Link} to="/add-product">Add Product</Button>
        <Button color="inherit" component={Link} to="/stock-in">Stock In</Button>
        <Button color="inherit" component={Link} to="/stock-out">Stock Out</Button>
        <Button color="inherit" component={Link} to="/create-invoice">Create Invoice</Button>
        <Button color="inherit" component={Link} to="/invoices">Invoices</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
