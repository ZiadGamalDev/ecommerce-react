import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const useCartData = () => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headers = { accesstoken: `accesstoken_${token}` };
  const baseUrl = "https://e-commerce-api-tau-five.vercel.app/";

  // Fetch cart data
  const getCart = useCallback(async () => {
    if (!headers) return;
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}cart`, { headers });
      setCart(response.data.cart);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [headers]);

  // Add or update item quantity in cart
  const addToCart = async (productId, quantity) => {
    if (!headers) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Login Before Add to cart",
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${baseUrl}cart`, { productId, quantity }, { headers });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The product has been successfully added to your cart",
        showConfirmButton: false,
        timer: 2000
      });

      getCart();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete item from cart completely
  const deleteFromCart = async (productId) => {
    if (!headers) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Login Before Add to cart",
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}cart/${productId}`, { headers });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The product has been successfully deleted",
        showConfirmButton: false,
        timer: 2000
      });

      // Fetch updated cart
      getCart();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return { cart, loading, error, getCart, addToCart, deleteFromCart };
};

export default useCartData;
