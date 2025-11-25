// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Optionally show a loading spinner while checking auth
    return <p className="text-center mt-10 text-neutral-500">Loading...</p>;
  }

  if (!user) {
    // Not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
