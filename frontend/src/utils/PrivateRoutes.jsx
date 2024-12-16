/* eslint-disable react/prop-types */
import AuthStore from "../zustand/store";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated } = AuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;
