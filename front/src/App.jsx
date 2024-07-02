import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./app/shared/components/sidebar/Index.jsx";
import Login from "./app/pages/login/Index.jsx";
import Register from "./app/pages/registerUsers/Index.jsx";
import Demand from "./app/pages/demand/Index.jsx";
import MyGlobalStyles from "./app/styles/globalStyles.js";
import Sector from "./app/pages/sector/Index.jsx";
import KanbanBoard from "./app/pages/kanbanboard/Kanban.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./app/shared/components/protectedRoute/ProtectedRoute.jsx";

export function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <MyGlobalStyles />
        <ToastContainer />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/dashboard" element={<ProtectedRoute permissions={['/kanban', '/demand', '/sector', '/register']}><KanbanBoard /></ProtectedRoute>} />
              <Route path="/kanban" element={<ProtectedRoute permissions={['/kanban', '/demand']}><KanbanBoard /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<ProtectedRoute permissions={['/register']}><Register /></ProtectedRoute>} />
              <Route path="/demand" element={<ProtectedRoute permissions={['/kanban', '/demand']}><Demand /></ProtectedRoute>} />
              <Route path="/sector" element={<ProtectedRoute permissions={['/sector']}><Sector /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;