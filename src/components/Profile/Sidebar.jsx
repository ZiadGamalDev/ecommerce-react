import { Box, Button, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({ setSelectedTab }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const { logout } = useContext(AuthContext);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setActiveTab(tab);
  };

  const tabs = ["dashboard", "account", "orders"];

  return (
    <Box
      sx={{
        width: 250,
        minHeight: "70vh",
        borderRight: "1px solid #ddd",
        p: 2,
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant="text"
            onClick={() => handleTabClick(tab)}
            sx={{
              color: activeTab === tab ? "primary.main" : "text.primary",
              bgcolor: activeTab === tab ? "rgba(25, 118, 210, 0.1)" : "transparent",
              fontWeight: activeTab === tab ? "bold" : "normal",
              borderBottom: activeTab === tab ? "2px solid #1976d2" : "none",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Sidebar;
