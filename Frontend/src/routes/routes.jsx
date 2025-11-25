import { Routes, Route, Navigate } from "react-router";

import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home";
import CategoryProducts from "../pages/CategoryProducts";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import SearchResultsPage from "../pages/SearchResultsPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Main App Layout */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategoryProducts />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        {/* Checkout protected so only logged-in users can access */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route path="/search" element={<SearchResultsPage />} />

        {/* Profile page is protected */}
        <Route
          path="/profile-page"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin Route (can be further protected for admin-only access) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Catch-all for unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
