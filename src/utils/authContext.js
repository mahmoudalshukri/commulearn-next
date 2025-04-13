"use client";
import { createContext, useContext, useState, useEffect } from "react";
import API from "./api"; // Import your Axios instance
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/me") // Assuming you have a route to get user data
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((err) => {
          console.error("Auth error:", err);
          setUser(null);
          localStorage.removeItem("token"); // Clear invalid token
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/sign-in"); // Redirect to login page
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
