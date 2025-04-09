import { Alert } from "@mui/material";
import useProfileData from "../../hooks/useProfileData";

const Orders = () => {
  const { orders, ordersLoading, ordersError, fetchOrders } = useProfileData();

  if (ordersLoading) return <div>Loading orders...</div>;

  return (
    <div>
      <h1>Paid Orders</h1>
      {ordersError ? (
        <Alert severity="error">
          {ordersError} <button onClick={fetchOrders}>Retry</button>
        </Alert>
      ) : orders.length === 0 ? (
        <Alert severity="info">No order has been made yet. Browse products.</Alert>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Status: {order.orderStatus}</p>
              <p>Total Price: {order.totalPrice}</p>
              <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={fetchOrders}>Refresh Orders</button>
    </div>
  );
};

export default Orders;