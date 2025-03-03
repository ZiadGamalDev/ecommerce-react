import { Container, Box } from "@mui/material";
import RegisterForm from "../../components/Auth/RegisterForm";

export default function Register() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 5 }}>
        <RegisterForm />
      </Box>
    </Container>
  );
}
