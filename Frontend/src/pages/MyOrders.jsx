import { useOrderApi } from "../api/orderApi";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function MyOrders() {
  const { getMyOrders } = useOrderApi();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map(order => (
          <Link
            to={`/orders/${order.id}`}
            key={order.id}
            className="block bg-white p-4 shadow rounded-lg border hover:bg-gray-50"
          >
            <div className="flex justify-between">
              <p>Order #{order.id}</p>
              <p className="font-semibold">
                {order.payment_status.toUpperCase()}
              </p>
            </div>
            <p className="text-gray-500 text-sm">{order.created_at}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
