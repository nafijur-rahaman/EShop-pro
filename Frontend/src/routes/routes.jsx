import { Routes, Route, Navigate } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";

import Home from "../pages/Home";
import CategoryProducts from "../pages/CategoryProducts";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultsPage from "../pages/SearchResultsPage"; // <-- add this import

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategoryProducts />} />       {/* categories page */}
        <Route path="/category/:id" element={<CategoryProducts />} />   {/* products in category */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/search" element={<SearchResultsPage />} />       {/* search results page */}
      </Route>

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
