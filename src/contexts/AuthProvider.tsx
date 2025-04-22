import React, { useState, useEffect, PropsWithChildren } from "react";
import { AuthContext, AuthContextValue } from "./AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

export const AuthProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth, setAuth] = useState("");
  const [loading, setLoading] = useState(true);

  const isDev = import.meta.env.VITE_DEV == "true";

  useEffect(() => {
    const verifyUser = async () => {
      if (isDev) {
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        const storedToken = Cookies.get("token");
        if (storedToken) {
          setAuth(storedToken);
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        try {
          const res = await axios.get(
            import.meta.env.VITE_API + "/user/profile",
            {
              withCredentials: true,
            },
          );
          console.log(res);
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      }
    };

    verifyUser();
  }, [isDev]);

  const login = async () => {
    const res = await axios.post(import.meta.env.VITE_API + "/login");
    Cookies.set("token", res.data.auth);
    setIsAuthenticated(true);
    setAuth(res.data.auth);
  };

  const logout = async () => {
    if (isDev) {
      Cookies.remove("token");
      localStorage.clear();
      setIsAuthenticated(false);
      setAuth("");
    } else {
      await axios.get(import.meta.env.VITE_API + "/logout");
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

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-500">
        <div>
          <p>Checking Important Information</p>
          <div className="text-lg animate-spin grid place-items-center">
            <LoaderCircle />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div className="loader">Loading</div> : children}
    </AuthContext.Provider>
  );
};
