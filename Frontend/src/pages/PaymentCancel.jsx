import { useParams } from "react-router";

export default function PaymentCancel() {
  const { id } = useParams();

  return (
    <div className="flex flex-col justify-center items-center h-screen text-yellow-600">
      <h1 className="text-3xl font-bold">Payment Cancelled</h1>
      <p>Order ID: {id}</p>
      <p>You have cancelled the payment.</p>
    </div>
  );
}
