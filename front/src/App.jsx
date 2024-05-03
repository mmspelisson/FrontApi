import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "./app/shared/components/sidebar/Index.jsx"
import Login from "./app/pages/login/Index.jsx"
import Register from "./app/pages/registerUsers/Index.jsx"
import Demand from "./app/pages/demand/Index.jsx"
import MyGlobalStyles from "./app/styles/globalStyles.js"
import Sector from "./app/pages/sector/Index.jsx"
import KanbanBoard from "./app/pages/kanbanboard/Kanban.jsx"
import Header from "./app/shared/components/header/Index.jsx"
import TrelloCard from "./app/shared/components/card/Card.jsx"

export function App() {
    return (
        <>
            <BrowserRouter basename="/">
                <Sidebar />
                <Routes>
                    <Route path='/' element={<KanbanBoard />} /> {/* Controle de demandas */}
                    <Route path='/kanban' element={<KanbanBoard />} /> {/* Kanban Board */}
                    <Route path='/login' element={<Login />} /> {/* Login de usuarios */}
                    <Route path='/register' element={<Register />} /> {/* Registro de usuários */}
                    <Route path='/demand' element={<Demand />} /> {/* Cadastro de demandas */}
                    <Route path='/sector' element={<Sector />} /> {/* Cadastro de setor */}
                    <Route path='*' element={<h1>Not found</h1>} /> {/* Não funciona */}
                </Routes>
            </BrowserRouter>
            <MyGlobalStyles />
        </>
    )
}

export default App
