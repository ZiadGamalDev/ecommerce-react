import { Container, Box } from "@mui/material";
import LoginForm from "../../components/Auth/LoginForm";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 5 }}>
        <LoginForm />
      </Box>
    </Container>
  );
}
