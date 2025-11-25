import { useApi } from "../hook/useApi";

export const useOrderApi = () => {
  const api = useApi();

  const createOrder = (data) => api.post("order/create/", data);
  const getMyOrders = () => api.get("orders/");
  const getOrderDetails = (id) => api.get(`orders/${id}/`);
  const initPayment = (orderId) =>
    api.post("payments/init/", { order_id: orderId });

  return { createOrder, getMyOrders, getOrderDetails, initPayment };
};
