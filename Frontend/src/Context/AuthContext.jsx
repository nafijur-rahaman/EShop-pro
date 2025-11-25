import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on app start
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axiosInstance
        .get("profile/")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("authToken");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (username, password) => {
    setLoading(true);
    const res = await axiosInstance.post("login/", { username, password });
    localStorage.setItem("authToken", res.data.token);
    const profileRes = await axiosInstance.get("profile/");
    setUser(profileRes.data);
    setLoading(false);
  };

  // Register function
  const register = async (username, email, password) => {
    setLoading(true);
    const res = await axiosInstance.post("register/", { username, email, password });
    localStorage.setItem("authToken", res.data.token);
    const profileRes = await axiosInstance.get("profile/");
    setUser(profileRes.data);
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
