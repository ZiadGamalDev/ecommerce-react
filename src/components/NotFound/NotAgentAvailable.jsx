import React from "react";
import { Link } from "react-router-dom";

const NotAgentAvailable = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-7xl font-bold text-[#f04706] mb-4">No Agent!</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Oops! No Support Agent is Available.
      </h2>
      <p className="text-gray-600 max-w-xl mb-6">
        Sorry for the inconvenience. All our support agents are currently busy.
        You can try again later or go back to the homepage.
      </p>
      <Link
        to="/"
        className="bg-[#1e3a8a] text-white px-6 py-2 rounded shadow hover:bg-[#2748b3] transition"
      >
        Back To Home
      </Link>
    </div>
  );
};

export default NotAgentAvailable;
