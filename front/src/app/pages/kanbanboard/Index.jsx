import React from 'react'
import Header from '../../shared/components/header/Index.jsx'
import Sidebar from '../../shared/components/sidebar/Index.jsx'
import Kanban from './Kanban.jsx'

function KanbanBoard() {
    return (
        <div>
            <Header />
            <Sidebar />
            <Kanban />
        </div>
    )
}

export default KanbanBoard
