import { Typography } from "@mui/material";
import useProfileData from "../../hooks/useProfileData";

const Dashboard = () => {
  const { profile, profileLoading, profileError } = useProfileData();

  if (profileLoading) return <Typography>Loading profile...</Typography>;
  if (profileError) return <Typography>Error: {profileError}</Typography>;

  return (
    <Typography variant="h5">
      Hello, {profile ? profile.username : "Guest"}
    </Typography>
  );
};

export default Dashboard;