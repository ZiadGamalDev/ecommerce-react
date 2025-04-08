import { ChevronRight, House } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NotAgentAvailable = () => {
  return (
    <div className="w-full mx-auto pb-4 flex flex-col">
      <div className="bg-[#f5f5f9] py-3 px-6 mb-6">
        <div className="container flex justify-between items-center">
          <span className="text-xl text-gray-700 font-bold">
            Oops! No Support Agent is Available.
          </span>
          <div className="flex items-center">
            <Link to="/">
              <House size={18} color="#4B5563" />
            </Link>
            <ChevronRight />
            <span className="text-gray-600">404</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center my-3 py-12">
        <h1 className="text-7xl font-bold text-[#f04706] mb-4">No Agent!</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! No Support Agent is Available.
        </h2>
        <p className="text-gray-600 max-w-xl mb-6">
          Sorry for the inconvenience. All our support agents are currently
          busy. You can try again later or go back to the homepage.
        </p>
        <Link
          to={"/"}
          className="search px-[20px] py-[10px]  text-[16px] bg-[#2b4861] text-light text-decoration-none rounded"
        >
          <span>Back To Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotAgentAvailable;
