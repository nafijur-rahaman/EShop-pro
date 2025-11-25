import { useState, useEffect } from "react";
import { useApi } from "../hook/useApi";
import { useAuth } from "../hook/useAuth";
import { useNavigate, Link } from "react-router";

export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { get, put, del, post, loading, error } = useApi();

  const [cart, setCart] = useState([]);

  // Load cart from backend
  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await get("cart/");
        setCart(data.items || []);
      } catch (err) {
        console.error(err);
      }
    }
    if (user) fetchCart();
  }, [user]);

  if (!user)
    return (
      <div className="text-center mt-20">
        Please{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          login
        </Link>{" "}
        to view your cart.
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600 animate-pulse">
        Loading cart...
      </div>
    );

  if (!cart.length)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-600">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link to="/" className="mt-4 text-indigo-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Handlers
  const handleQtyChange = async (itemId, qty) => {
    try {
      const updatedCart = await put(`cart/item/${itemId}/`, { quantity: qty });
      setCart(updatedCart.items);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const updatedCart = await del(`cart/item/${itemId}/`);
      setCart(updatedCart.items);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearCart = async () => {
    try {
      await post("cart/clear/");
      setCart([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Shopping Cart</h1>

        {/* Cart Items */}
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={item.product.image || "https://via.placeholder.com/100"}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{item.product.name}</span>
                  <span className="text-gray-500 text-sm line-clamp-2">
                    {item.product.description || "No description"}
                  </span>
                  <span className="font-bold mt-1 text-gray-900">₹{item.product.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQtyChange(item.id, Number(e.target.value))}
                  className="w-16 border rounded-md px-2 py-1 text-center"
                />
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 max-w-md ml-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={handleClearCart}
              className="w-full mt-2 bg-red-600 text-white py-2 rounded-xl shadow-sm hover:shadow transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
