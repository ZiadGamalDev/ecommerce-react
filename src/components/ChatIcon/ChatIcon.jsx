// import { Tooltip } from "@mui/material";
// import { Headset } from "lucide-react";
// import React, { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const customerSupportBaseUrl = "http://localhost:3000/";
// // const customerSupportBaseUrl = 'https://customer-support-rose.vercel.app/'
// const clientChatBaseUrl = "http://localhost:4200/";
// // const clientChatBaseUrl = 'https://client-chat-service.netlify.app/'

// const NoAgentAvailable = "/NoAgentAvailable";

// const ChatIcon = () => {
//   const { token, userId } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChatClick = async () => {
//     try {
//       console.log("Token:", token);

//       const response = await fetch(`${customerSupportBaseUrl}chats/customer`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("ChatIcon component mounted");

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Chat data:", data);

//         const chatUrl = `${clientChatBaseUrl}?chatId=${data.id}&userId=${userId}&token=${token}`;
//         // window.location.href = chatUrl;
//         window.open(chatUrl, "_blank");
//       } else {
//         const errorData = await response.json();
//         if (errorData.message === "No agents available") {
//           navigate(NoAgentAvailable);
//         } else {
//           console.error("Failed to initiate chat:", errorData);
//         }
//       }
//     } catch (error) {
//       console.error("Error initiating chat:", error);
//     }
//   };

//   return (
//     <React.Fragment>
//       <Tooltip
//         title="Customer Support"
//         placement="top"
//         className="cursor-pointer"
//       >
//         <div
//           onClick={() => {
//             console.log("clicked");
//             handleChatClick();
//           }}
//           style={{ zIndex: 9999 }}
//           className="p-3 bg-[#f04706] rounded fixed bottom-26 right-12 z-200 border border-[#fff] shadow-lg hover:bg-[#313c46] transition duration-300 cursor-pointer"
//         >
//           <Headset color={"#fff"} size={25} />
//         </div>
//       </Tooltip>
//     </React.Fragment>
//   );
// };

// export default ChatIcon;

import { Tooltip } from "@mui/material";
import { Headset } from "lucide-react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import socket from "../../utils/socket";
import { useNotificationContext } from "../../context/NotificationContext";

const customerSupportBaseUrl = "http://localhost:3000/";
const clientChatBaseUrl = "http://localhost:4200/";
const NoAgentAvailable = "/NoAgentAvailable";

const ChatIcon = () => {
  const { token, userId } = useContext(AuthContext);
  const { addNotification } = useNotificationContext();
  const navigate = useNavigate();
  const [chatId, setChatId] = useState(null);

  const listenForMessages = (chatId) => {
    console.log("Listening for messages on chatId from chatIcon :", chatId);
    socket.on("messageReceived", ({ message }) => {
      console.log("Message received from chatIcon :", message);
      if (message.chatId === chatId) {
        const newMessage = {
          id: message._id || message.id,
          chatId: message.chatId,
          senderId: message.senderId?._id || message.senderId || null,
          content: message.content,
          createdAt: message.createdAt ? new Date(message.createdAt) : new Date(),
        };
        console.log("New message added to notifications:", newMessage);
        addNotification(newMessage);
      }
    });
  };

  const handleChatClick = async () => {
    try {
      const response = await fetch(`${customerSupportBaseUrl}chats/customer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const chatId = data.id;
        setChatId(chatId);

        if (!socket.connected) {
          socket.connect();
        }

        socket.once("connect", () => {
          console.log("Socket connected. Joining chat from chatIcon...");
          socket.emit("joinChat", {
            chatId,
            userType: "customer",
          });
          listenForMessages(chatId);
        });

        const chatUrl = `${clientChatBaseUrl}?chatId=${chatId}&userId=${userId}&token=${token}`;
        window.open(chatUrl, "_blank");
      } else {
        const errorData = await response.json();
        if (errorData.message === "No agents available") {
          navigate(NoAgentAvailable);
        }
      }
    } catch (error) {
      console.error("Error initiating chat:", error);
    }
  };

  return (
    <Tooltip title="Customer Support" placement="top">
      <div
        onClick={handleChatClick}
        className="p-3 bg-[#f04706] rounded fixed bottom-26 right-12 border border-[#fff] shadow-lg hover:bg-[#313c46] transition duration-300 cursor-pointer z-100"
      >
        <Headset color={"#fff"} size={25} />
      </div>
    </Tooltip>
  );
};

export default ChatIcon;
