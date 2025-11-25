import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../hook/useAuth";
import { Link, useNavigate } from "react-router";

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cart, loading, updateItem, removeItem, clearCart } = useCart();

  const [localQty, setLocalQty] = useState({}); // prevents flicker + invalid updates

  // If not logged in
  if (!user) {
    return (
      <div className="text-center mt-20">
        Please{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          login
        </Link>{" "}
        to view your cart.
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Empty cart
  if (!cart.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-600">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link to="/" className="mt-4 text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Calculate subtotal safely
  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item?.product?.price) || 0;
    const qty = Number(item?.quantity) || 1;
    return acc + price * qty;
  }, 0);

  const SHIPPING = 15;
  const TAX_RATE = 0.08;

  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {/* Cart Items */}
        <div className="space-y-6">
          {cart.map((item) => {
            const product = item.product || {};
            const price = Number(product.price) || 0;
            const quantity = localQty[item.id] ?? item.quantity;

            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4"
              >
                <img
                  src={
                    product.image ||
                    "https://img.freepik.com/free-vector/flat-design-no-photo-sign_23-2149279604.jpg"
                  }
                  alt={product.name || "Product"}
                  className="h-24 w-24 object-cover rounded-md"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-medium">
                    {product.name || "Unnamed Product"}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {product.description || "No description available."}
                  </p>
                  <p className="font-bold mt-1">₹{price.toFixed(2)}</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const val = Math.max(1, Number(e.target.value) || 1);
                      setLocalQty((prev) => ({ ...prev, [item.id]: val }));
                      updateItem(item.id, val);
                    }}
                    className="w-16 border rounded-md px-2 py-1 text-center"
                  />

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border max-w-md ml-auto">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <p>Subtotal</p>
              <p>₹{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Shipping</p>
              <p>₹{SHIPPING.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Tax</p>
              <p>₹{tax.toFixed(2)}</p>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-gray-900">
              <p>Total</p>
              <p>₹{total.toFixed(2)}</p>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
