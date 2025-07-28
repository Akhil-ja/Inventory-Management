# Inventory Management System

This project is a comprehensive Inventory Management System with integrated Invoice functionality. It allows for efficient tracking of product stock, managing stock movements (in/out), and creating/cancelling sales invoices, with automatic stock level adjustments.

## Features

*   **Product Management:**
    *   Add new products with details like `productId`, `name`, `category`, `unit`, `initialStock`, and `price`.
    *   View a list of all products with their current stock levels.
*   **Stock Operations:**
    *   **Stock-In:** Increase product stock (e.g., for purchases) via `POST /api/stock/stock-in`.
    *   **Stock-Out:** Decrease product stock (e.g., for manual adjustments) via `POST /api/stock/stock-out`.
*   **Invoice Creation (Sales):**
    *   Create new sales invoices via `POST /api/invoices`.
    *   Automatically decreases stock for sold products.
    *   Includes validation for "insufficient stock" before invoice creation.
*   **Invoice Cancellation:**
    *   Cancel existing invoices via `DELETE /api/invoices/:id`.
    *   Automatically replenishes stock for products on the cancelled invoice.
*   **Robust Form Validation:** Client-side validation implemented for all forms to ensure data integrity (e.g., trimming inputs, validating numbers, phone numbers, and preventing numbers in name fields).
*   **Improved Backend Error Handling:** Backend provides more precise HTTP status codes for business logic errors, enhancing API communication.

## Technologies Used

### Backend (Node.js with Express & TypeScript)

*   **Framework:** Express.js
*   **Database:** MongoDB (via Mongoose ODM)
*   **Language:** TypeScript
*   **Other Libraries:** `cors`, `date-fns`, `dotenv`, `morgan`, `uuid`

### Frontend (React with Redux Toolkit)

*   **Framework:** React
*   **State Management:** Redux Toolkit
*   **UI Library:** Material-UI (`@mui/material`, `@mui/icons-material`)
*   **HTTP Client:** Axios
*   **Routing:** React Router DOM
*   **Build Tool:** Vite

## Setup and Installation

Follow these steps to set up and run the project locally.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm (comes with Node.js) or Yarn
*   MongoDB instance (local or cloud-hosted, e.g., MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/Akhil-ja/Inventory-Management.git
cd Inventory-Management
```

### 2. Backend Setup

Navigate to the `backend` directory, install dependencies, and configure environment variables.

```bash
cd backend
npm install # or yarn install
```

**Create a `.env` file** in the `backend` directory with the following content:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:5173 # Or your deployed frontend URL (e.g., https://your-frontend-app.vercel.app)
```
*Replace `your_mongodb_connection_string` with your actual MongoDB connection string.*
*If you are deploying, ensure `FRONTEND_URL` matches your deployed frontend URL.*

**Run the Backend:**

```bash
npm run dev # For development with hot-reloading
# or
npm run build # To build for production
npm start     # To start the built production server
```
The backend server will typically run on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal, navigate to the `frontend` directory, install dependencies, and configure environment variables.

```bash
cd ../frontend # Go back to root and then into frontend
npm install # or yarn install
```

**Create a `.env` file** in the `frontend` directory with the following content:

```
VITE_BACKEND_URL=http://localhost:5000 # Must match your backend URL
```

**Run the Frontend:**

```bash
npm run dev
```
The frontend application will typically open in your browser at `http://localhost:5173` (or another available port).
