import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { isLogueado, userLogueado } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isLogueado && roles.includes(userLogueado.role) ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
