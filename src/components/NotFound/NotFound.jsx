import React from "react";
import { ChevronRight, House } from "lucide-react";
import { Link } from "react-router-dom";
import ChatIcon from "../ChatIcon/ChatIcon";

const NotFound = () => {
  return (
    <div className="w-full mx-auto pb-4 flex flex-col">
      <ChatIcon />

      <div className="bg-[#f5f5f9] py-3 px-6 mb-6">
        <div className="container flex justify-between items-center">
          <span className="text-xl text-gray-700 font-bold">
            Oops! That page can not be found.
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

      <div className="flex flex-col justify-center items-center my-3">
        <span
          className="text-9xl text-[#f04706] font-semibold"
          style={{ fontFamily: "'Rubik', sans-serif" }}
        >
          404!
        </span>
        <span
          className="text-[30px] text-[#000] my-4 font-bold"
          style={{ fontFamily: "'Rubik', sans-serif" }}
        >
          Oops! This Page is Not Found.
        </span>
        <p className="p-0 m-0 text-[#777] text-[16px]">
          Sorry for the inconvenience. Go to our homepage or check
        </p>
        <p className="p-0 m-0 text-[#777] text-[16px]">
          out our latest solution for your finance and insurance needs.
        </p>

        <Link
          to={"/"}
          className="search px-[20px] py-[10px] mt-5 text-[16px] bg-[#2b4861] text-light text-decoration-none rounded"
        >
          <span>Back To Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
