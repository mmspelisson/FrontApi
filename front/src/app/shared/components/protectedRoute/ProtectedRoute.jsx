import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ModalAcessoNegado from '../modal/ModalAcessoNegado';

const ProtectedRoute = ({ children, permissions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = user !== null;
  const userRole = user?.liberacoes?.toUpperCase();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const checkPermissions = () => {
      if (!isAuthenticated) {
        return false;
      }

      const adminPermissions = ['/kanban', '/login', '/register', '/demand', '/sector'];
      const userPermissions = ['/kanban', '/login', '/demand'];

      if (userRole === 'ADMINISTRADOR') {
        return permissions.every(permission => adminPermissions.includes(permission));
      } else if (userRole === 'USUARIO') {
        return permissions.every(permission => userPermissions.includes(permission));
      } else {
        return false;
      }
    };

    if (!checkPermissions()) {
      setIsModalOpen(true);
    }
  }, [isAuthenticated, userRole, permissions]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isModalOpen) {
    return (
      <>
        <ModalAcessoNegado isOpen={isModalOpen} onClose={handleCloseModal} />
        <Navigate to="/demand" replace />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
