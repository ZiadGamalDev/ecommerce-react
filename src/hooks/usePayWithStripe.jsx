import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const usePayWithStripe = () => {
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [checkOutURL, setCheckOutURL] = useState(null);

  const headers = { accesstoken: `accesstoken_${token}` };

  const baseUrl = `${import.meta.env.VITE_API_URL}/order/pay`;

  const payWithStripe = async (orderId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${baseUrl}/${orderId}`,
        {},
        { headers }
      );
      if (response.data.error_message) {
        setError(response.data.error_message);
        throw new Error(response.data.error_message);
      }

      setCheckOutURL(response.data.checkoutSession.url);
    } catch (err) {
      const errorMessage = err.response?.data?.error_message || err.message;
      console.error("Payment failed:", errorMessage);
      setError(errorMessage);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error Redirecting to checkout",
        text: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    checkOutURL,
    payWithStripe,
  };
};
export default usePayWithStripe;
