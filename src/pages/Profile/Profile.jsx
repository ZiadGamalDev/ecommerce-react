import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Sidebar from "../../components/Profile/Sidebar";
import Dashboard from "../../components/Profile/Dashboard";
import Orders from "../../components/Profile/Orders";
import Account from "../../components/Profile/Account";
import useProfileData from "../../hooks/useProfileData";
import ChatIcon from "../../components/ChatIcon/ChatIcon";

const Profile = () => {
  const { profile, loading, error, token } = useProfileData();
  const [selectedTab, setSelectedTab] = useState("dashboard");

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <ChatIcon />
      <Box sx={{ display: "flex", minHeight: "70vh" }}>
        {/* Sidebar */}
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* Right Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {selectedTab === "dashboard" && <Dashboard profile={profile} />}
          {selectedTab === "account" && (
            <Account profile={profile} token={token} />
          )}
          {selectedTab === "orders" && <Orders />}
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
