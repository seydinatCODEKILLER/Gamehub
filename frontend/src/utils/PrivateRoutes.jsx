/* eslint-disable react/prop-types */
import AuthStore from "../zustand/store";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated, hasProfilePicture } = AuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasProfilePicture) {
    return <Navigate to="/upload" replace />;
  }

  return children;
};

export default PrivateRoutes;
