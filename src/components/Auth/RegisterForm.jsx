import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, Alert, CircularProgress } from "@mui/material";

const baseUrl = "https://e-commerce-api-tau-five.vercel.app/";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    repeat_password: "",
    phoneNumbers: "",
    age: "",
    addresses: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password too short").required("Password is required"),
    repeat_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    phoneNumbers: Yup.string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone number is required"),
    age: Yup.number().min(18, "You must be at least 18 years old").required("Age is required"),
    addresses: Yup.string().required("Address is required"),
  });

  const onSubmit = async (values) => {
    setError("");
    setLoading(true);
    try {
      const data = {...values, phoneNumbers: [values.phoneNumbers], addresses: [values.addresses]};
      const response = await fetch(`${baseUrl}auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      if (response.success) {
        navigate("/login");
      } else {
        if (response.err_message === 'validation error' && response.errors) {
          setError(response.errors[0]);
        } else {
          setError(response.error_message || "Registration failed!");
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 3, boxShadow: 2, borderRadius: 2, bgcolor: "white" }}>
      <Typography variant="h5" textAlign="center" mb={2}>Register</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {Object.keys(initialValues).map((field) => (
        <TextField
          key={field}
          fullWidth
          label={field.replace("_", " ").replace("phoneNumbers", "phone number").replace("addresses", "address").replace("repeat_password", "confirm password")}
          type={field.includes("password") ? "password" : field === "age" ? "number" : "text"}
          name={field}
          value={formik.values[field]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched[field] && Boolean(formik.errors[field])}
          helperText={formik.touched[field] && formik.errors[field]}
          margin="normal"
          required
        />
      ))}

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
      </Button>
    </Box>
  );
}
