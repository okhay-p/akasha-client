import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children?: React.ReactNode; // Optional children
}

function ProtectedRoute({ children }: Props) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    // Render a loading indicator while the authentication state is being checked
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

export default ProtectedRoute;
