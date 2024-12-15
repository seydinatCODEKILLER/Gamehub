/* eslint-disable react/prop-types */
import AuthStore from "../zustand/store";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated } = AuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
