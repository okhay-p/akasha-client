import React, { useState, useEffect, PropsWithChildren } from "react";
import { AuthContext, AuthContextValue } from "./AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth, setAuth] = useState("");

  useEffect(() => {
    if (import.meta.env.DEV) {
      const storedToken = Cookies.get("token");
      if (storedToken) {
        setAuth(storedToken);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = async () => {
    const res = await axios.post(import.meta.env.VITE_API + "/login");
    if (import.meta.env.DEV) {
      Cookies.set("token", res.data.auth);
      setIsAuthenticated(true);
      setAuth(res.data.auth);
    }
  };

  const logout = async () => {
    if (import.meta.env.DEV) {
      Cookies.remove("token");
      setIsAuthenticated(false);
      setAuth("");
    }
  };

  const value: AuthContextValue = {
    isAuthenticated,
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
