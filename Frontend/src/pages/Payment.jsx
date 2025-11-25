import { useParams } from "react-router";
import { useEffect } from "react";
import { useOrderApi } from "../api/orderApi";



export default function Payment() {
  const { id } = useParams();
  const { initPayment, loading, error } = useOrderApi()


  useEffect(() => {
    const startPayment = async () => {
      try {
        const res = await initPayment(id);

        if (res.GatewayPageURL) {
          // Redirect to SSLCommerz gateway
          window.location.href = res.GatewayPageURL;
        } else {
          console.error("Payment initialization failed:", res);
        }
      } catch (err) {
        console.error("Payment init error:", err);
      }
    };

    startPayment();
  }, [id, initPayment]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Redirecting to payment…
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-xl text-red-600">
        <p>{error.error || error.detail || error}</p>
        <p>Please try again or contact support.</p>
      </div>
    );

  return null;
}
