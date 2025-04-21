import React, { useState, useEffect, PropsWithChildren } from "react";
import { AuthContext, AuthContextValue } from "./AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth, setAuth] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (import.meta.env.VITE_DEV == "true") {
        const storedToken = Cookies.get("token");
        if (storedToken) {
          setAuth(storedToken);
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        // do api req to fetch profile
        try {
          const res = await axios.get(
            import.meta.env.VITE_API + "/user/profile",
          );
          console.log(res);
          setIsAuthenticated(true);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    verifyUser();
  }, []);

  const login = async () => {
    const res = await axios.post(import.meta.env.VITE_API + "/login");
    if (import.meta.env.VITE_DEV) {
      Cookies.set("token", res.data.auth);
      setIsAuthenticated(true);
      setAuth(res.data.auth);
    }
  };

  const logout = async () => {
    if (import.meta.env.VITE_DEV) {
      Cookies.remove("token");
      localStorage.clear();
      setIsAuthenticated(false);
      setAuth("");
    }
  };

  const value: AuthContextValue = {
    isAuthenticated,
    loading,
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
