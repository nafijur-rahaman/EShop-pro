import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext"; // <-- import CartProvider
import AppRoutes from "./routes/routes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> {/* <-- wrap CartProvider here */}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
