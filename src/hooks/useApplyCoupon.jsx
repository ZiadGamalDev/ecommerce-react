import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const useCoupon = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [couponValid, setCouponValid] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const headers = { accesstoken: `accesstoken_${token}` };
  const baseUrl = `${import.meta.env.VITE_API_URL}coupon/apply`;

  const validateCoupon = async (code) => {
    if (!code.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        baseUrl,
        { couponCode: code },
        { headers }
      );

      if (response.data.success) {
        setCouponValid(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Valid Coupon",
          text: response.data.message || "Coupon is valid",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        throw new Error(response.data.message || "Invalid coupon");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      console.error("Coupon validation failed:", errorMessage);
      setError(errorMessage);
      setCouponValid(false);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Invalid Coupon",
        text: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetCoupon = () => {
    setCouponValid(false);
    setCouponCode("");
    setError(null);
  };

  return {
    loading,
    error,
    couponValid,
    couponCode,
    setCouponCode,
    validateCoupon,
    resetCoupon,
  };
};

export default useCoupon;
