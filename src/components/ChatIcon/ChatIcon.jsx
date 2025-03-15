import { Tooltip } from "@mui/material";
import { Headset } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ChatIcon = () => {
  return (
    <React.Fragment>
      <Tooltip
        title="Customer Support"
        placement="top"
        className="cursor-pointer"
      >
        <Link to={"/customerSupport"}>
          <div className="p-3 bg-[#f04706] rounded fixed bottom-26 right-12 z-200 border border-[#fff] shadow-lg hover:bg-[#313c46] transition duration-300">
            <Headset color={"#fff"} size={25} />
          </div>
        </Link>
      </Tooltip>
    </React.Fragment>
  );
};

export default ChatIcon;
