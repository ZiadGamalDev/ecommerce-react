import { Tooltip } from "@mui/material";
import { Headset } from "lucide-react";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const customerSupportBaseUrl = "http://localhost:3000/";
// const customerSupportBaseUrl = 'https://customer-support-rose.vercel.app/'
const clientChatBaseUrl = "http://localhost:4200/";
// const clientChatBaseUrl = 'https://client-chat-service.netlify.app/'

const NoAgentAvailable = "/NoAgentAvailable"; // تعديل المسار

const ChatIcon = () => {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChatClick = async () => {
    try {
      console.log("Token:", token);

      const response = await fetch(`${customerSupportBaseUrl}chats/customer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("ChatIcon component mounted");

      if (response.ok) {
        const data = await response.json();
        console.log("Chat data:", data);

        const chatUrl = `${clientChatBaseUrl}?chatId=${data.id}&userId=${userId}&token=${token}`;
        // window.location.href = chatUrl;
        window.open(chatUrl, "_blank");
      } else {
        const errorData = await response.json();
        if (errorData.message === "No agents available") {
          navigate(NoAgentAvailable);
        } else {
          console.error("Failed to initiate chat:", errorData);
        }
      }
    } catch (error) {
      console.error("Error initiating chat:", error);
    }
  };

  return (
    <React.Fragment>
      <Tooltip
        title="Customer Support"
        placement="top"
        className="cursor-pointer"
      >
        <div
          onClick={() => {
            console.log("clicked");
            handleChatClick();
          }}
          style={{ zIndex: 9999 }}
          className="p-3 bg-[#f04706] rounded fixed bottom-26 right-12 z-200 border border-[#fff] shadow-lg hover:bg-[#313c46] transition duration-300 cursor-pointer"
        >
          <Headset color={"#fff"} size={25} />
        </div>
      </Tooltip>
    </React.Fragment>
  );
};

export default ChatIcon;
