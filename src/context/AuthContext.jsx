import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();
const baseUrl = "https://e-commerce-api-tau-five.vercel.app/";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedID = localStorage.getItem("userId");

    if (storedToken) {
      setToken(storedToken);
      if (storedRole) {
        setRole(storedRole);
      } else {
        try {
          const decodedToken = jwtDecode(storedToken);
          const userRole = decodedToken.role || "user";
          setRole(userRole);
          localStorage.setItem("role", userRole);
        } catch (error) {
          setRole("user");
        }
      }
      if (storedID) {
        setUserId(storedID);
      }
    }
  }, []);

  const saveUser = async (user) => {
    setToken(user.token);
    setRole(user.role);
    setUserId(user.userId);
    localStorage.setItem("token", user.token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("userId", user.userId);
  };

  const removeUser = () => {
    setToken(null);
    setRole(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  };

  const logout = async () => {
    removeUser();
  };

  return (
    <AuthContext.Provider value={{ token, role, userId, saveUser, removeUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };