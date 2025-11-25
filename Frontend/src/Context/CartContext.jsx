import React, { createContext, useEffect, useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("cart/");
      setCart(res.data);
    } catch (err) {
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCart();
    else {
      setCart([]);
      setLoading(false);
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    const res = await axiosInstance.post("cart/", { product: productId, quantity });
    await fetchCart();
    return res.data;
  };

  const updateItem = async (id, quantity) => {
    await axiosInstance.put(`cart/item/${id}/`, { quantity });
    await fetchCart();
  };

  const clearCart = async () => {
    await axiosInstance.delete("cart/clear/");
    await fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
