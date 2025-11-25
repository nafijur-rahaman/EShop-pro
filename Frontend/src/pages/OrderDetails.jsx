import { useEffect, useState } from "react";
import { useOrderApi } from "../api/orderApi";
import { useParams, Link } from "react-router";

export default function OrderDetails() {
  const { id } = useParams();
  const { getOrderDetails } = useOrderApi();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Badge Colors by Payment Status
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    cancelled: "bg-gray-200 text-gray-600",
  };

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const data = await getOrderDetails(id);
        setOrder(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading order details...
      </div>
    );

  if (!order)
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600 text-lg">Order not found</p>
      </div>
    );

  const subtotal = order.items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  const shipping = 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Link to="/orders" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Orders
      </Link>

      <h1 className="text-3xl font-bold mb-6">Order #{order.id}</h1>

      {/* ORDER SUMMARY CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md border mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-800 font-semibold">
              Placed On:{" "}
              <span className="font-normal text-gray-600">
                {new Date(order.created_at).toLocaleString()}
              </span>
            </p>

            <p className="mt-1 text-gray-800 font-semibold">
              Payment Status:{" "}
              <span
                className={`px-3 py-1 rounded-lg text-sm ${statusColors[order.payment_status]}`}
              >
                {order.payment_status.toUpperCase()}
              </span>
            </p>

            {order.transaction_id && (
              <p className="mt-1 text-gray-600">
                Transaction ID: <span className="font-medium">{order.transaction_id}</span>
              </p>
            )}
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">Total: ₹{total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* ITEMS LIST */}
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-xl font-bold mb-4">Order Items</h2>

        <div className="space-y-6">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <img
                src={
                  item.product_detail.images?.[0]?.image ||
                  item.product_detail.image ||
                  "https://via.placeholder.com/100"
                }
                alt={item.product_detail.name}
                className="h-24 w-24 object-cover rounded-md border"
              />

              <div className="flex-1">
                <p className="text-lg font-medium">{item.product_detail.name}</p>
                <p className="text-gray-500 text-sm">{item.product_detail.description}</p>

                <p className="mt-2">
                  <span className="font-semibold">Price:</span> ₹{Number(item.price).toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span> {item.quantity}
                </p>
              </div>

              <p className="text-lg font-bold text-gray-700">
                ₹{(Number(item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TOTAL SUMMARY */}
      <div className="bg-white p-6 mt-6 rounded-xl shadow-md border max-w-md ml-auto">
        <h2 className="text-xl font-bold mb-4">Price Summary</h2>

        <div className="space-y-2">
          <div className="flex justify-between text-gray-700">
            <p>Subtotal</p>
            <p>₹{subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between text-gray-700">
            <p>Shipping</p>
            <p>₹{shipping.toFixed(2)}</p>
          </div>

          <div className="flex justify-between text-gray-700">
            <p>Tax</p>
            <p>₹{tax.toFixed(2)}</p>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-gray-900 font-bold text-lg">
            <p>Total</p>
            <p>₹{total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
