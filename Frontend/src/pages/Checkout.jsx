import { useEffect, useState } from "react";
import { useApi } from "../hook/useApi";

export default function Checkout() {
  const { get, put, post, del, loading, error } = useApi();
  const [cart, setCart] = useState(null);
  const [creatingOrder, setCreatingOrder] = useState(false);

  // Load cart items
  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await get("cart/");
        setCart(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCart();
  }, []);

  const handleQtyChange = async (itemId, newQty) => {
    try {
      const updatedCart = await put(`cart/item/${itemId}/`, { quantity: newQty });
      setCart(updatedCart);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCart = await del(`cart/item/${itemId}/`);
      setCart(updatedCart);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearCart = async () => {
    try {
      await post("cart/clear/");
      setCart({ items: [], total_price: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaceOrder = async () => {
    setCreatingOrder(true);
    try {
      await post("order/create/", {
        // You can add payment info & shipping here
        payment_method: "cod",
      });
      alert("Order created successfully!");
      setCart({ items: [], total_price: 0 });
    } catch (err) {
      console.error(err);
      alert("Failed to create order.");
    } finally {
      setCreatingOrder(false);
    }
  };

  if (loading || !cart) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600 animate-pulse">
        Loading cart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Error loading cart: {JSON.stringify(error)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
          <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
          Checkout
        </h1>

        {cart.items.length === 0 ? (
          <div className="text-gray-500 text-lg text-center">Your cart is empty.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Cart Items / Left Column */}
            <div className="lg:col-span-7 space-y-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                      <img
                        src={item.product_image || "https://via.placeholder.com/150"}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{item.product_name}</span>
                      <span className="text-gray-500 text-sm line-clamp-2">{item.description}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQtyChange(item.id, Number(e.target.value))}
                      className="w-16 border rounded px-2 py-1 text-center"
                    />
                    <span className="font-semibold text-gray-900">${item.total_price}</span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={handleClearCart}
                className="text-red-500 hover:underline mt-2"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary / Right Column */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${cart.items.reduce((a, i) => a + i.total_price, 0)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>$15.00</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>
                      ${cart.items.reduce((a, i) => a + i.total_price, 0) * 0.08}
                    </span>
                  </div>

                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      $
                      {(
                        cart.items.reduce((a, i) => a + i.total_price, 0) +
                        15 +
                        cart.items.reduce((a, i) => a + i.total_price, 0) * 0.08
                      ).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={creatingOrder}
                    className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  >
                    {creatingOrder ? "Processing…" : "Place Order"}
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
