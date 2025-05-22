import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useConvertFromCartToOrder = () => {
  const { token } = useContext(AuthContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const headers = { accesstoken: `accesstoken_${token}` };
  const baseUrl = `${import.meta.env.VITE_API_URL}order/fromcartToOrder`;

  const convertCartToOrder = async (orderInfo) => {
    if (!token) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Login before proceeding to checkout",
        showConfirmButton: false,
        timer: 2000,
      });
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(baseUrl, orderInfo, { headers });
      console.log("Order response:", response.data.data);

      if (response.data.error_message) {
        throw new Error(response.data.error_message);
      }

      const createdOrder = response.data.data;

      setOrderDetails(response.data.data);
      setOrderId(createdOrder._id);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Order created successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      return createdOrder;
    } catch (err) {
      const errorMessage = err.response?.data?.error_message || err.message;
      console.error("Order creation failed:", errorMessage);

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });

      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    orderDetails,
    loading,
    error,
    convertCartToOrder,
  };
};

export default useConvertFromCartToOrder;
