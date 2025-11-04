import { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router"; // ✅ FIXED — must be react-router-dom
import { AuthContext } from "../Context/AuthContext";

const BASE_URL = "http://localhost:8000/api";

export const useApi = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Use useMemo so axios instance isn't recreated every render
  const api = useMemo(() => {
    return axios.create({ baseURL: BASE_URL });
  }, []);

  // ✅ Setup interceptors inside useEffect (and clean them up)
  useEffect(() => {
    // Request interceptor
    const reqInterceptor = api.interceptors.request.use(
      (config) => {
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (err) => Promise.reject(err)
    );

    // Response interceptor
    const resInterceptor = api.interceptors.response.use(
      (res) => res,
      (err) => {
        const status = err.response?.status;

        if (status === 401) {
          console.warn("Unauthorized: Redirecting to login...");
          navigate("/login", { replace: true });
        } else if (status === 403) {
          console.warn("Forbidden: Redirecting to unauthorized page...");
          navigate("/unauthorized", { replace: true });
        }

        return Promise.reject(err);
      }
    );

    // ✅ Clean up interceptors on unmount or token change
    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [api, token, navigate]);

  // ✅ Unified request handler
  const request = async (endpoint, method = "GET", body = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api({ method, url: endpoint, data: body });
      return response.data;
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data || "Request failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Return a clean API interface
  return {
    loading,
    error,
    get: (endpoint) => request(endpoint, "GET"),
    post: (endpoint, body) => request(endpoint, "POST", body),
    put: (endpoint, body) => request(endpoint, "PUT", body),
    patch: (endpoint, body) => request(endpoint, "PATCH", body),
    del: (endpoint) => request(endpoint, "DELETE"),
  };
};
