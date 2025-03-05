import { Typography } from "@mui/material";

const Dashboard = ({ profile }) => {
  return <Typography variant="h5">Hello, {profile.username}</Typography>;
};

export default Dashboard;
