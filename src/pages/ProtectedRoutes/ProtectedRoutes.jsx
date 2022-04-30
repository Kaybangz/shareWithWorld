import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userAuthContext } from "../../components/context/userAuthContext";

const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(userAuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;
