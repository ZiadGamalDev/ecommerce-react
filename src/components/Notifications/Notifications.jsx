import React from "react";
import { useNotificationContext } from "../../context/NotificationContext";
import "./styles.css";

const Notifications = ({ onClose }) => {
  const { notifications } = useNotificationContext();

  console.log("Rendering Notifications component with notifications:", notifications);

  return (
    <div className="w-[300px] max-h-[400px] bg-white rounded-lg shadow-lg z-300">
      <div className="notifications-header p-4 border-b flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-800">Notifications</span>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 transition"
        >
          ✕
        </button>
      </div>

      <div className="notifications-list overflow-y-auto max-h-[350px] p-2">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No notifications</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="notification-item p-3 mb-2 rounded-lg bg-gray-50"
            >
              <span className="font-medium text-gray-800">New Message</span>
              <span className="text-sm text-gray-600 mt-1">
                {notification.content}
              </span>
              <div className="text-xs text-gray-400 mt-1">
                <span>From: {notification.senderId}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
