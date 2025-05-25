import { useState } from "react";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const baseUrl = import.meta.env.VITE_API_URL;

const Account = ({ profile, token }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: profile?.username,
    email: profile?.email,
    phoneNumbers: profile?.phoneNumbers?.[0],
    addresses: profile?.addresses?.[0],
    age: profile?.age,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumbers: Yup.string().matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number"),
    addresses: Yup.string(),
    age: Yup.number().min(1, "Age must be greater than 0"),
  });

  const onSubmit = async (values) => {
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const data = { 
        ...values, 
        phoneNumbers: [values.phoneNumbers], 
        addresses: [values.addresses] 
      };

      const response = await fetch(`${baseUrl}profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accesstoken: `accesstoken_${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update profile");
      }

      const result = response.headers.get("content-length") !== "0" ? await response.json() : null;
      setMessage(result?.message || "Profile updated successfully!");
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>Account Details</Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={formik.handleSubmit}>
        {Object.keys(formik.initialValues).map((field) => (
          <TextField
            key={field}
            fullWidth
            label={field.replace("_", " ")}
            type={field === "age" ? "number" : "text"}
            name={field}
            value={formik.values[field]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[field] && Boolean(formik.errors[field])}
            helperText={formik.touched[field] && formik.errors[field]}
            margin="normal"
          />
        ))}

        <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
        </Button>
      </form>
    </Box>
  );
};

export default Account;
