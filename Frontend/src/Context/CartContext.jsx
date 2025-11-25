import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useAuth } from "../hook/useAuth";
import axiosInstance from "../api/axiosInstance";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    if (!user) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.get("cart/");

      // backend returns: [{ id, product, product_detail, quantity }]
      const items = res.data.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        product: {
          id: item.product,
          ...item.product_detail,
          image:
            item.product_detail.images?.[0]?.image ||
            item.product_detail.image ||
            "",
        },
      }));

      setCart(items);
    } catch (err) {
      console.error(err);
      setError(err.response?.data || err.message);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) throw new Error("Login required");
    try {
      await axiosInstance.post("cart/", { product: productId, quantity });
      await fetchCart();
    } catch (err) {
      console.error(err);
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  const updateItem = async (id, quantity) => {
    try {
      await axiosInstance.put(`cart/item/${id}/`, { quantity });
      await fetchCart();
    } catch (err) {
      console.error(err);
      setError(err.response?.data || err.message);
    }
  };

  const removeItem = async (id) => {
    try {
      await axiosInstance.delete(`cart/item/${id}/`);
      await fetchCart();
    } catch (err) {
      console.error(err);
      setError(err.response?.data || err.message);
    }
  };

  const clearCart = async () => {
    try {
      await axiosInstance.delete("cart/clear/");
      await fetchCart();
    } catch (err) {
      console.error(err);
      setError(err.response?.data || err.message);
    }
  };

  const value = useMemo(
    () => ({
      cart,
      loading,
      error,
      addToCart,
      updateItem,
      removeItem,
      clearCart,
    }),
    [cart, loading, error]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
