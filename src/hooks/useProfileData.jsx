import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const baseUrl = "https://e-commerce-api-tau-five.vercel.app/";

const useProfileData = () => {
  const { token } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [ordersError, setOrdersError] = useState(null);

  const fetchProfile = async () => {
    if (!token) {
      setProfileError("No authentication token provided");
      setProfileLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}profile/`, {
        headers: { accesstoken: `accesstoken_${token}` },
      });
      setProfile(response.data.user);
    } catch (err) {
      setProfileError(
        err.response?.data?.message || err.message || "Failed to fetch profile"
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchOrders = async () => {
    if (!token) {
      setOrdersError("No authentication token provided");
      setOrdersLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}order/my-order`, {
        headers: { accesstoken: `accesstoken_${token}` },
      });
      console.log("Raw orders response:", response.data);
      if (response.data.success) {
        const allOrders = response.data.data || [];
        const paidOrders = allOrders.filter((order) => order.isPaid === true);
        setOrders(paidOrders);
      } else {
        throw new Error(response.data.message || "Failed to fetch orders");
      }
    } catch (err) {
      if (err.response?.data) {
        console.log("Server error response data:", err.response.data);
      }
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchOrders();
    } else {
      setProfileLoading(false);
      setOrdersLoading(false);
      setProfileError("Please log in to view profile");
      setOrdersError("Please log in to view orders");
    }
  }, [token]);

  return {
    profile,
    orders,
    profileLoading,
    ordersLoading,
    profileError,
    ordersError,
    token,
    fetchOrders,
  };
};

export default useProfileData;