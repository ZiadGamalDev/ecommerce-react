import React from "react";
import { useNotifications } from "../../hooks/useSocket";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import "./styles.css";

const Notifications = () => {
  const { userId } = useContext(AuthContext); // Get this from your auth context
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
  } = useNotifications(userId);

  if (loading)
    return (
      <div className="w-[300px] h-[300px] text-center">
        Loading notifications...
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <React.Fragment>
      <div className="w-[300px] max-h-[400px] bg-white rounded-lg shadow-lg">
        <div className="notifications-header p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Notifications{" "}
            {unreadCount > 0 && (
              <span className="bg-[#f04706] text-white text-xs px-2 py-1 rounded-full ml-2">
                {unreadCount}
              </span>
            )}
          </h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-3 py-1.5 text-sm bg-[#f04706] hover:bg-[#d63e00] text-white rounded-lg transition-colors duration-200 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Mark all read
            </button>
          )}
        </div>

        <div className="notifications-list overflow-y-auto max-h-[350px] p-2">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`notification-item p-3 mb-2 rounded-lg transition-all ${
                  !notification.read
                    ? "bg-orange-50 border-l-4 border-[#f04706]"
                    : "bg-gray-50"
                }`}
              >
                <div className="notification-content">
                  <h4 className="font-medium text-gray-800">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.content}
                  </p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="mt-2 text-sm text-[#f04706] hover:text-[#d63e00] transition-colors"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notifications;
