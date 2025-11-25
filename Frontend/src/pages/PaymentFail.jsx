import { useParams } from "react-router";

export default function PaymentFail() {
  const { id } = useParams();

  return (
    <div className="flex flex-col justify-center items-center h-screen text-red-600">
      <h1 className="text-3xl font-bold">Payment Failed</h1>
      <p>Order ID: {id}</p>
      <p>Please try again or contact support.</p>
    </div>
  );
}
