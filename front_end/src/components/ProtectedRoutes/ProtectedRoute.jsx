import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ roles }) => {
  const { isLogueado, userLogueado } = useAuth();
  const location = useLocation();

  if (isLogueado && roles.includes(userLogueado.rol.nombre)) {
    return <Outlet />;
  }

  return <Navigate to="/" state={{ from: location }} />;
};

export default ProtectedRoute;
