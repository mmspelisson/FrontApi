// import React from "react"
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children, permissions }) => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const isAuthenticated = user !== null;

//   console.log("Usuário autenticado:", isAuthenticated);
//   console.log("Dados do usuário:", user);

//   if (!isAuthenticated) {
//     console.log("Usuário não autenticado, redirecionando para /login");
//     return <Navigate to="/login" />;
//   }

//   const adminPermissions = ['/kanban', '/login', '/register', '/demand', '/sector'];
//   const userPermissions = ['/kanban', '/login', '/demand'];

//   const hasPermission = () => {
//     const liberacoes = user.liberacoes?.toUpperCase(); 
//     console.log("Permissões do usuário:", liberacoes);
//     if (liberacoes === 'ADMINISTRADOR') {
//       return permissions.every(permission => adminPermissions.includes(permission));
//     } else if (liberacoes === 'USUARIO') {
//       return permissions.every(permission => userPermissions.includes(permission));
//     } else {
//       return false;
//     }
//   };

//   const hasUserPermission = hasPermission();
//   console.log("Usuário tem permissão:", hasUserPermission);

//   if (!hasUserPermission) {
//     console.log("Usuário não tem permissão para acessar esta rota, redirecionando para /login");
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// export default PrivateRoute
