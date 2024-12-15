/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import AuthStore from "@/zustand/store";

const PublicRoutes = ({ children }) => {
  const { isAuthenticated, hasProfilePicture } = AuthStore();

  if (isAuthenticated) {
    return hasProfilePicture ? (
      <Navigate to="/" replace />
    ) : (
      <Navigate to="/upload" replace />
    );
  }

  return children;
};

export default PublicRoutes;
