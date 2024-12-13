import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ roles }) => {
  const { isLogueado, userLogueado } = useAuth();
  const location = useLocation();

  const token = localStorage.getItem('token');

  if (isLogueado && token && roles.includes(userLogueado.fk_rol)) {
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;
