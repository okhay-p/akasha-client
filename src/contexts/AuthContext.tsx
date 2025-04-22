import { useContext, createContext } from "react";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  status: number;
  created_at: string;
  google_sub_id: string;
  fullname?: string;
  picture_url?: string;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  auth: string;
  loading: boolean;
  userData: UserProfile | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
