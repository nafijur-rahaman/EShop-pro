import { useCart } from "../Context/CartContext";
import { useOrderApi } from "../api/orderApi";
import { useNavigate } from "react-router";

export default function Checkout() {
  const { cart } = useCart();
  const { createOrder } = useOrderApi();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({});
      navigate(`/payment/${res.order_id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="bg-white shadow p-6 rounded-lg">
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>Shipping: ₹{shipping.toFixed(2)}</p>
        <p>Tax: ₹{tax.toFixed(2)}</p>
        <hr className="my-3" />
        <p className="font-bold">Total: ₹{total.toFixed(2)}</p>

        <button
          onClick={handlePlaceOrder}
          className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
