import { useState, useEffect } from "react";
import { useSocket } from "../context/NotificationContext";
export const useNotifications = (userId) => {
  const { socket, isConnected } = useSocket();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!socket || !isConnected || !userId) return;

    socket.emit("authenticate", { userId });

    socket.on(
      "userNotifications",
      ({ notifications, pagination, unreadCount }) => {
        setNotifications(notifications);
        setUnreadCount(unreadCount);
        setLoading(false);
      }
    );

    // Listen for single notifications
    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    // Listen for errors
    socket.on("error", (error) => {
      console.error("Socket error:", error);
      setError(error.message);
    });

    // Fetch initial notifications
    socket.emit("fetchNotifications");

    return () => {
      socket.off("userNotifications");
      socket.off("notification");
      socket.off("error");
    };
  }, [socket, isConnected, userId]);

  const markAsRead = async (notificationId) => {
    if (!socket || !isConnected) return;
    socket.emit("markNotificationRead", { notificationId });
  };

  const markAllAsRead = async () => {
    if (!socket || !isConnected) return;
    socket.emit("markAllNotificationsRead");
  };

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
  };
};
