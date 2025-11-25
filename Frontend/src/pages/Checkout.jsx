import React, { useEffect, useState } from "react";
import { useApi } from "../hook/useApi";

const Checkout = () => {
  const { get, loading, error } = useApi();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const productId = queryParams.get("product");
        const qty = parseInt(queryParams.get("quantity")) || 1;
        setQuantity(qty);

        if (!productId) return;

        const data = await get(`products/${productId}/`); // API endpoint
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (error || !product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-600">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p>{error ? JSON.stringify(error) : "No product found with that ID."}</p>
        <a href="/" className="mt-4 text-blue-600 hover:underline">Go Back Home</a>
      </div>
    );
  }

  // Safe calculations
  const price = Number(product.price) || 0;
  const shipping = 15.0;
  const tax = price * 0.08 * quantity; // tax per unit
  const total = price * quantity + shipping + tax;

  // Use first image from product.images array
  const productImage = product.images?.[0]?.image || "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
          
          {/* LEFT COLUMN: Form Fields */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Info */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" placeholder="you@example.com" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiration Date (MM/YY)</label>
                    <input type="text" placeholder="MM/YY" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVC</label>
                    <input type="text" placeholder="123" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </section>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg transition duration-200">
              Confirm Order (${total.toFixed(2)})
            </button>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

              <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src={productImage} alt={product.name} className="h-full w-full object-cover object-center" />
                </div>

                <div className="flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{product.name}</h3>
                      <p className="ml-4">${price.toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {quantity}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-base text-gray-600">
                  <p>Subtotal</p>
                  <p>${(price * quantity).toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base text-gray-600">
                  <p>Shipping</p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base text-gray-600">
                  <p>Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900">Total</p>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">${total.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Including taxes</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
