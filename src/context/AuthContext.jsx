import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const baseUrl = "https://e-commerce-api-tau-five.vercel.app/";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

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
          console.error("Error decoding token:", error);
          setRole("user");
        }
      }
    }
  }, []);

  const saveUser = async (user) => {
    setToken(user.token);
    setRole(user.role);
    localStorage.setItem("token", user.token);
    localStorage.setItem("role", user.role);
  };

  const removeUser = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  const logout = async () => {
    removeUser();
  };

  return (
    <AuthContext.Provider value={{ token, role, saveUser, removeUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };