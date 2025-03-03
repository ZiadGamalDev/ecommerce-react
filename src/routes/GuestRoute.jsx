import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const { token } = useContext(AuthContext);

  return token ? <Navigate to="/" /> : children;
}
