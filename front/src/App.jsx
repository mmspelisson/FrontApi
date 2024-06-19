import React from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Sidebar from "./app/shared/components/sidebar/Index.jsx"
import Login from "./app/pages/login/Index.jsx"
import Register from "./app/pages/registerUsers/Index.jsx"
import Demand from "./app/pages/demand/Index.jsx"
import MyGlobalStyles from "./app/styles/globalStyles.js"
import Sector from "./app/pages/sector/Index.jsx"
import KanbanBoard from "./app/pages/kanbanboard/Kanban.jsx"
import PrivateRoute from "./app/shared/components/privateRoute/privateRoute.jsx"
import {  ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
              <Route path="/dashboard" element={<PrivateRoute permissions={['/kanban', '/demand', '/sector', '/register']}><KanbanBoard /></PrivateRoute>} />
              <Route path="/kanban" element={<PrivateRoute permissions={['/kanban', '/demand']}><KanbanBoard /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<PrivateRoute permissions={['/register']}><Register /></PrivateRoute>} />
              <Route path="/demand" element={<PrivateRoute permissions={['/kanban', '/demand']}><Demand /></PrivateRoute>} />
              <Route path="/sector" element={<PrivateRoute permissions={['/sector']}><Sector /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App
