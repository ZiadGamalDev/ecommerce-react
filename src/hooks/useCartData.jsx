import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const useCartData = () => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headers = useMemo(() => {
    if (!token) return null;
    return { accesstoken: `accesstoken_${token}` };
  }, [token]);

  const baseUrl = `${import.meta.env.VITE_API_URL}`;

  const getCart = useCallback(async () => {
    if (!headers) {
      setCart([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}cart`, { headers });

      if (response.data && response.data.cart) {
        setCart(response.data.cart);
      } else {
        setCart([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, [headers, baseUrl]);

  const addToCart = async (productId, quantity) => {
    if (!headers) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Login Before Add to cart",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}cart`, { productId, quantity }, { headers });
      
      if (response.data && response.data.cart) {
        setCart(response.data.cart);
        await getCart();
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The product has been successfully added to your cart",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      const errorMessage1 = err.response?.data?.message;
      const errorMessage2 = err.response?.data?.error_message;
      const finalErrorMessage = errorMessage1 || errorMessage2 || "An error occurred";

      if (errorMessage1 === "Out of Stock") {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "The product is Out of Stock",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: errorMessage2,
          showConfirmButton: false,
          timer: 5000,
        });
      }

      setError(finalErrorMessage);
    } finally {
      setLoading(false);
    }
  };

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
      const response = await axios.delete(`${baseUrl}cart/${productId}`, { headers });
      
      if (response.data && response.data.cart) {
        setCart(response.data.cart);
        await getCart();
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The product has been successfully deleted",
        showConfirmButton: false,
        timer: 2000
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to delete item: " + errorMessage,
        showConfirmButton: false,
        timer: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getCart();
    } else {
      setCart([]);
    }
  }, [token, getCart]);

  return { cart, loading, error, getCart, addToCart, deleteFromCart };
};

export default useCartData;
