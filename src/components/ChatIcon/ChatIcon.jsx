import { Tooltip } from "@mui/material";
import { Headset } from "lucide-react";
import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const customerSupportBaseUrl = import.meta.env.VITE_SOCKET_URL;
const clientChatBaseUrl = import.meta.env.VITE_CHAT_CLIENT_URL;
const NoAgentAvailable = "/NoAgentAvailable";

const ChatIcon = () => {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const [touched, setTouched] = useState({
    title: false,
    description: false,
  });

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
    const value = e.target.value;
    setTitle(value);

    if (touched.title) {
      setErrors((prev) => ({
        ...prev,
        title: validateTitle(value),
      }));
    }
  };

  const handleTitleBlur = () => {
    setTouched((prev) => ({ ...prev, title: true }));
    setErrors((prev) => ({
      ...prev,
      title: validateTitle(title),
    }));
  };

  const handleDescriptionBlur = () => {
    setTouched((prev) => ({ ...prev, description: true }));
    setErrors((prev) => ({
      ...prev,
      description: validateDescription(description),
    }));
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);

    if (touched.description) {
      setErrors((prev) => ({
        ...prev,
        description: validateDescription(value),
      }));
    }
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

    const titleError = validateTitle(title);
    const descriptionError = validateDescription(description);

    setErrors({ title: titleError, description: descriptionError });
    setTouched({ title: true, description: true });

    if (titleError || descriptionError) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${customerSupportBaseUrl}chats/customer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const chatId = data.id;

        localStorage.setItem("lastChatTitle", data.title || "");
        localStorage.setItem("lastChatDescription", data.description || "");
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

  const validateTitle = (value) => {
    if (!value || value.trim().length < 3) {
      return "Title must be at least 3 characters long";
    }
    return "";
  };

  const validateDescription = (value) => {
    if (!value || value.trim().length < 10) {
      return "Description must be at least 10 characters long";
    }
    return "";
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
                    onBlur={handleTitleBlur}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.title
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#f04706]"
                    }`}
                    placeholder="Enter chat title"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                  )}
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
                    onBlur={handleDescriptionBlur}
                    rows={4}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.description
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#f04706]"
                    }`}
                    placeholder="Enter chat description"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.description}
                    </p>
                  )}
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
