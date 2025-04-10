import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    console.log("Adding notification:", notification);
    const exists = notifications.some((n) => n.id === notification.id);
    if (!exists) {
      setNotifications((prev) => [...prev, notification]);
      console.log("Notification added successfully:", notification);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
