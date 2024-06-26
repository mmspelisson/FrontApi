import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, permissions }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = user !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const isAdmin = user.liberacoes?.toUpperCase() === 'ADMINISTRADOR';
  const allowedRoutes = ['/kanban', '/demand', '/register', ];

  const hasPermission = () => {
    if (isAdmin) {
      return true; // Administrador pode acessar todas as rotas
    } else {
      return permissions.some(permission => allowedRoutes.includes(permission));
    }
  };

  const hasUserPermission = hasPermission();

  if (!hasUserPermission) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
