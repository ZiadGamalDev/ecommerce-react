import { Container, Box } from "@mui/material";
import LoginForm from "../../components/Auth/LoginForm";

export default function Login() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 5 }}>
        <LoginForm />
      </Box>
    </Container>
  );
}
