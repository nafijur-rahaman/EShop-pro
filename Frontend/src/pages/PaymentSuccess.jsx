import { useParams } from "react-router";

import { useEffect, useState } from "react";
import { useOrderApi } from "../api/orderApi";

export default function PaymentSuccess() {
  const { id } = useParams();
  const { getOrderDetails, loading, error } = useOrderApi();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderDetails(id);
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading)
    return <div className="flex justify-center items-center h-screen">Loading order...</div>;

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-600">
        <p>Failed to load order details.</p>
        <p>{error.detail || error}</p>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center h-screen text-green-600">
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
      {order && (
        <>
          <p>Order ID: {order.id}</p>
          <p>Amount Paid: {order.total_amount} BDT</p>
        </>
      )}
      <p>Thank you for your purchase!</p>
    </div>
  );
}
