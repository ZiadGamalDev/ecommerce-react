import React from "react";
import "./styles.css";
import { MailCheck } from "lucide-react";

const Notifications = ({ onClose, notifications }) => {
  const clientChatBaseUrl = "http://localhost:4200/";
  const chatId = localStorage.getItem("chatId");

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateTime = (date) => {
    const parsedDate = new Date(date);
    const dateOptions = { month: "numeric", day: "numeric", year: "2-digit" };
    const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };

    const formattedDate = parsedDate.toLocaleDateString("en-US", dateOptions);
    const formattedTime = parsedDate.toLocaleTimeString("en-US", timeOptions);

    return { date: formattedDate, time: formattedTime };
  };

  const truncateText = (text, maxLength = 30) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked!");
    const chatUrl = `${clientChatBaseUrl}?chatId=${chatId}`;
    window.open(chatUrl, "_blank");
  };

  return (
    <React.Fragment>
      <div className="max-w-[90vw] min-w-[300px] max-h-[500px] bg-white rounded-xl shadow-2xl z-300 w-fit">
        <div className="notifications-header p-4 border-b flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">
            Notifications
          </span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="notifications-list overflow-y-auto max-h-[400px] space-y-2">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => {
              const { date, time } = notification.createdAt
                ? formatDateTime(notification.createdAt)
                : { date: "", time: "" };

              return (
                <div key={notification.id} onClick={handleNotificationClick}>
                  <div className="flex flex-col bg-gray-50 hover:bg-gray-100 transition shadow-sm cursor-pointer px-3 py-2 rounded-md">
                    <div className="flex flex-col gap-2 justify-between">
                      <span className="text-[12px] text-gray-400">
                        New message from support
                      </span>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <MailCheck size={14} />
                        </div>

                        <div className="flex flex-col items-end">
                          <p className="text-xs text-gray-700 leading-snug">
                            {truncateText(notification.content, 30)}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-[10px] text-gray-400">
                              {date} | {time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )


            })
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notifications;
