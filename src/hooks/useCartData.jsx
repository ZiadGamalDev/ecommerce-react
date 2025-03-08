import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const useCartData = () => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headers = { accesstoken: `accesstoken_${token}` };
  const baseUrl = "http://localhost:3000/";

  // Fetch cart data
  const getCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}cart`, {
        headers,
        withCredentials: true,
      });
      setCart(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart (Handles quantity updates automatically)
  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        `${baseUrl}cart`,
        { productId, quantity },
        { headers, withCredentials: true }
      );
      setCart((prevCart) => [...prevCart, response.data.cart]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete item from cart completely
  const deleteFromCart = async (productId) => {
    try {
      await axios.delete(`${baseUrl}cart/${productId}`, {
        headers,
        withCredentials: true,
      });
      getCart();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return { cart, loading, error, getCart, addToCart, deleteFromCart };
};

export default useCartData;
