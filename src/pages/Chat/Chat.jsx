// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import { motion } from "framer-motion";
// import { Send, AlertCircle, Loader2, UserCircle } from "lucide-react";

// const socket = io("http://localhost:5000");

// export default function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [agent, setAgent] = useState(null);
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     socket.emit("checkAgents");

//     socket.on("agentsAvailable", (availableAgents) => {
//       if (availableAgents.length > 0) {
//         setAgent(availableAgents[0]);
//       } else {
//         setAgent(null);
//       }
//     });

//     socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));

//     socket.on("userTyping", () => {
//       setIsTyping(true);
//       setTimeout(() => setIsTyping(false), 1200);
//     });

//     return () => socket.disconnect();
//   }, []);

//   if (agent === null) {
//     return (
//       // <div className="flex items-center justify-center min-h-screen bg-white">
//       //   <div className="w-full max-w-sm bg-white shadow-md border rounded-lg p-6 text-center">
//       //     <AlertCircle size={32} className="text-red-500 mx-auto mb-3" />
//       //     <h2 className="text-lg font-semibold text-gray-800">
//       //       No Agents Available
//       //     </h2>
//       //     <p className="text-gray-600 text-sm mt-2">
//       //       Sorry, no support agents are available at the moment. Please try
//       //       again later.
//       //     </p>
//       //   </div>
//       // </div>
//       <div className="flex items-center justify-center min-h-screen bg-white">
//         <div className="flex items-center gap-2 text-gray-700">
//           <Loader2 className="animate-spin" size={24} />
//           <span>Checking for available agents...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center pb-15 pt-10 bg-white">
//       <div className="w-full max-w-2xl shadow-md border rounded bg-white">
//         <div className="p-4 border-b bg-blue-600 text-white rounded-t-lg flex items-center gap-3">
//           {agent?.avatar ? (
//             <img
//               src={agent.avatar}
//               alt="Agent"
//               className="w-10 h-10 rounded-full border"
//             />
//           ) : (
//             <UserCircle size={40} />
//           )}
//           <h2 className="text-lg font-semibold">{agent?.name || "Support Agent"}</h2>
//         </div>

//         {/* Messages */}
//         <div className="h-80 overflow-y-auto p-4 space-y-2 bg-gray-50">
//           {messages.map((msg, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className={`p-3 rounded-lg max-w-xs ${
//                 msg.sender === "customer"
//                   ? "bg-blue-500 text-white self-end ml-auto"
//                   : "bg-gray-300 text-gray-900"
//               }`}
//             >
//               {msg.text}
//             </motion.div>
//           ))}

//           {isTyping && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ repeat: Infinity, duration: 1 }}
//               className="flex space-x-1 text-gray-600"
//             >
//               <Loader2 className="animate-spin" size={16} />
//               <span>Typing...</span>
//             </motion.div>
//           )}
//         </div>

//         {/* Input Field */}
//         <div className="flex items-center border-t p-3">
//           <input
//             className="flex-1 p-2 border rounded-l-lg focus:outline-none bg-white"
//             placeholder="Type a message..."
//             value={message}
//             onChange={(e) => {
//               setMessage(e.target.value);
//               socket.emit("typing");
//             }}
//           />
//           <button
//             onClick={sendMessage}
//             className="p-2 bg-blue-600 text-white hover:bg-blue-700 transition"
//           >
//             <Send size={25} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   function sendMessage() {
//     if (message.trim()) {
//       socket.emit("sendMessage", { text: message, sender: "customer" });
//       setMessages((prev) => [...prev, { text: message, sender: "customer" }]);
//       setMessage("");
//     }
//   }
// }

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, UserCircle, House, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function MockChat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [agent, setAgent] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 🔥 محاكاة توفر الأيجنت
  const toggleAgent = () => {
    if (agent) {
      setAgent(null);
    } else {
      setAgent({ name: "Ahmed Mostafa", avatar: "", id: 1 });
    }
  };

  useEffect(() => {
    if (
      messages.length &&
      messages[messages.length - 1].sender === "customer"
    ) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Thanks for reaching out! How can I help?", sender: "agent" },
        ]);
        setIsTyping(false);
      }, 1500);
    }
  }, [messages]);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  if (!agent) {
    return (
      // <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      //   <div className="w-full max-w-2xl bg-white shadow-md border rounded-lg p-6 text-center">
      //     <AlertCircle size={32} className="text-red-500 mx-auto mb-3" />
      //     <h2 className="text-lg font-semibold text-gray-800">
      //       No Agents Available
      //     </h2>
      //     <p className="text-gray-600 text-sm mt-2">Please try again later.</p>
      //     <button
      //       onClick={toggleAgent}
      //       className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
      //     >
      //       Toggle Agent Availability
      //     </button>
      //   </div>
      // </div>

      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex items-center gap-2 text-gray-700">
          <Loader2 className="animate-spin" size={24} color={"#f04706"} />
          <span>Checking for available agents...</span>
          <button
            onClick={toggleAgent}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Toggle Agent Availability
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#f5f5f9] py-3 px-6">
        <div className="container flex justify-between items-center">
          <span className="text-xl text-gray-700 font-medium">
            Customer Support
          </span>
          <div className="flex items-center">
            <Link to="/">
              <House size={18} color="#4B5563" />
            </Link>
            <ChevronRight color="#4B5563" size={20} />
            <span className="text-gray-600">Chat</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-10 bg-white">
        <div className="w-full max-w-2xl shadow-md border rounded-lg bg-white">
          {/* Header */}
          <div className="p-4 border-b bg-[#f04706] text-white rounded-t-lg flex items-center gap-3">
            {agent.avatar ? (
              <img
                src={agent.avatar}
                alt="Agent"
                className="w-10 h-10 rounded-full border"
              />
            ) : (
              <UserCircle size={40} />
            )}
            <h2 className="text-lg font-semibold">{agent.name}</h2>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-2 bg-gray-50">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === "customer"
                    ? "bg-[#ea6e3c] text-white self-end ml-auto"
                    : "bg-gray-300 text-gray-900"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="flex space-x-1 text-gray-600"
              >
                <span>Typing...</span>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center border-t p-3">
            <input
              className="flex-1 p-2 border rounded-l-lg focus:outline-none bg-white"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-[#f04706] text-white rounded-r-lg hover:bg-[#f04806c8] transition duration-200"
            >
              <Send size={25} />
            </button>
          </div>
        </div>

        {/* Button to Toggle Agent */}
        <button
          onClick={toggleAgent}
          className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          Toggle Agent Availability
        </button>
      </div>
    </div>
  );

  function sendMessage() {
    if (message.trim()) {
      setMessages((prev) => [...prev, { text: message, sender: "customer" }]);
      setMessage("");
    }
  }
}
