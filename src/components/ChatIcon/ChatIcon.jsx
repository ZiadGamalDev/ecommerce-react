import { Tooltip } from "@mui/material";
import { Headset } from "lucide-react";
import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const customerSupportBaseUrl = "http://localhost:3000/";
// const clientChatBaseUrl = "http://localhost:64925/";
const clientChatBaseUrl = "https://gudgets-chat.vercel.app/";
const NoAgentAvailable = "/NoAgentAvailable";

const ChatIcon = () => {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const titleInputRef = useRef(null);

  const handleChatClick = () => {
    console.log("clicked");
    const savedTitle = localStorage.getItem("lastChatTitle") || "";
    const savedDescription = localStorage.getItem("lastChatDescription") || "";
    setTitle(savedTitle);
    setDescription(savedDescription);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    localStorage.setItem("lastChatTitle", newTitle);
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    localStorage.setItem("lastChatDescription", newDescription);
  };

  useEffect(() => {
    if (open && titleInputRef.current) {
      titleInputRef.current.focus();
    }

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${customerSupportBaseUrl}chats/customer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title || undefined,
          description: description || undefined,
        }),
      });
      console.log("Submitting chat with title and description");

      if (response.ok) {
        const data = await response.json();
        console.log("Chat data:", data);

        localStorage.setItem("lastChatTitle", data.title || "");
        localStorage.setItem("lastChatDescription", data.description || "");

        const chatId = data.id;
        localStorage.setItem("chatId", chatId);

        const chatUrl = `${clientChatBaseUrl}?chatId=${data.id}&userId=${userId}&token=${token}`;
        window.open(chatUrl, "_blank");

        handleClose();
      } else {
        const errorData = await response.json();
        if (errorData.message === "No agents available") {
          navigate(NoAgentAvailable);
          handleClose();
        } else {
          console.error("Failed to initiate chat:", errorData);
        }
      }
    } catch (error) {
      console.error("Error initiating chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      {token && (
        <Tooltip
          title="Customer Support"
          placement="top"
          className="cursor-pointer"
        >
          <div
            onClick={handleChatClick}
            className="p-3 bg-[#f04706] rounded fixed bottom-26 right-12 z-50 border border-[#fff] shadow-lg hover:bg-[#313c46] transition duration-300 cursor-pointer"
          >
            <Headset color={"#fff"} size={25} />
          </div>
        </Tooltip>
      )}

      {/* Custom Modal with Tailwind CSS */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Start a New Chat
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    ref={titleInputRef}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f04706] transition-all duration-200"
                    placeholder="Enter chat title"
                    aria-label="Chat title"
                  />
                </div>
                {/* Description Input */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f04706] transition-all duration-200"
                    placeholder="Enter chat description"
                    aria-label="Chat description"
                  />
                </div>
                {/* Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f04706] text-white rounded hover:bg-[#f04806ce] transition duration-200 disabled:bg-gray-400"
                    disabled={isLoading}
                  >
                    {isLoading ? "Starting Chat..." : "Start Chat"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default ChatIcon;
