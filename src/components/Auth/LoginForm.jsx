import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const baseUrl = "https://e-commerce-api-tau-five.vercel.app/";

export default function LoginForm() {
  const { saveUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .matches(
        /^[\w-.]+@([\w-]+\.)+(com|net)$/,
        "Email must be a .com or .net address"
      )
      .test("not-numeric-only", "Email cannot be numbers only", (value) =>
        isNaN(Number(value?.split("@")[0]))
      )
      .required("Email is required"),

    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/,
        "Password must be 8-30 characters, include uppercase, lowercase, and a number"
      )
      .required("Password is required"),
  });

  const onSubmit = async (values) => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((res) => res.json());

      if (response.success) {
        saveUser({
          token: response.data.token,
          role: response.data.role,
          userId: response.data.userId,
        });
        navigate("/");
      } else {
        setError(response.error_message || "Invalid login credentials!");
      }
    } catch (err) {
      setError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ p: 3, boxShadow: 2, borderRadius: 2, bgcolor: "white" }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => navigate("/register")}
      >
        Register
      </Button>
    </Box>
  );
}
