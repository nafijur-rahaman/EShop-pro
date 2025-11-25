import { useState } from "react";
import axiosInstance from "../api/axiosInstance"; // your central Axios instance

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async ({ method, url, data = null, params = null }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance({
        method,
        url,
        data,
        params,
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    get: (url, params) => request({ method: "GET", url, params }),
    post: (url, data) => request({ method: "POST", url, data }),
    put: (url, data) => request({ method: "PUT", url, data }),
    patch: (url, data) => request({ method: "PATCH", url, data }),
    del: (url) => request({ method: "DELETE", url }),
  };
};
