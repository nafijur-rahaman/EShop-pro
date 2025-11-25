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
import AboutUs from "../pages/AboutUs";
import Payment from "../pages/Payment";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFail from "../pages/PaymentFail";
import PaymentCancel from "../pages/PaymentCancel";
import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";



export default function AppRoutes() {
  return (
    <Routes>
      {/* Main App Layout */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategoryProducts />} />
        <Route path="/about" element={<AboutUs />} />
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
        <Route path="/payment/:id" element={<Payment/>} />
        <Route path="/payment/success/:id" element={<PaymentSuccess />} />
        <Route path="/payment/fail/:id" element={<PaymentFail />} />
        <Route path="/payment/cancel/:id" element={<PaymentCancel />} />

        <Route path="/orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />

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
