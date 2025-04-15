import { useState } from "react";
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
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9]*$/,
        "Username must only contain letters and numbers"
      )
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username cannot exceed 20 characters")
      .test("not-numeric-only", "Username cannot be numbers only", (value) =>
        isNaN(Number(value))
      )
      .required("Username is required"),

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
        "Password must be 8-30 characters and contain uppercase, lowercase, and a number"
      )
      .required("Password is required"),

    repeat_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),

    phoneNumbers: Yup.string()
      .matches(
        /^01[0125][0-9]{8}$/,
        "Phone number must be 11 digits and start with 010, 011, 012, or 015"
      )
      .required("Phone number is required"),

    age: Yup.number()
      .typeError("Age must be a number")
      .integer("Age must be a whole number")
      .min(18, "You must be at least 18 years old")
      .max(100, "Age cannot exceed 100 years")
      .required("Age is required"),

    addresses: Yup.string()
      .min(10, "Address must be at least 10 characters long")
      .max(200, "Address cannot exceed 200 characters")
      .test("not-numeric-only", "Address cannot be numbers only", (value) =>
        isNaN(Number(value))
      )
      .required("Address is required"),
  });

  const onSubmit = async (values) => {
    setError("");
    setLoading(true);
    try {
      const data = {
        ...values,
        phoneNumbers: [values.phoneNumbers],
        addresses: [values.addresses],
      };
      const response = await fetch(`${baseUrl}auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      if (response.success) {
        navigate("/login");
      } else {
        if (response.err_message === "validation error" && response.errors) {
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
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ p: 3, boxShadow: 2, borderRadius: 2, bgcolor: "white" }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Register
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {Object.keys(initialValues).map((field) => (
        <TextField
          key={field}
          fullWidth
          label={field
            .replace("_", " ")
            .replace("phoneNumbers", "phone number")
            .replace("addresses", "address")
            .replace("repeat_password", "confirm password")}
          type={
            field.includes("password")
              ? "password"
              : field === "age" || field === "phoneNumbers"
              ? "text"
              : "text"
          }
          name={field}
          value={formik.values[field]}
          onChange={(e) => {
            if (field === "phoneNumbers") {
              const onlyNums = e.target.value.replace(/\D/g, "").slice(0, 11);
              formik.setFieldValue(field, onlyNums);
            } else {
              formik.handleChange(e);
            }

            if (field === "age") {
              const onlyNums = e.target.value.replace(/\D/g, "").slice(0, 3);
              formik.setFieldValue(field, onlyNums);
            } else {
              formik.handleChange(e);
            }
          }}
          onBlur={formik.handleBlur}
          error={formik.touched[field] && Boolean(formik.errors[field])}
          helperText={formik.touched[field] && formik.errors[field]}
          margin="normal"
          required
        />
      ))}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </Box>
  );
}
