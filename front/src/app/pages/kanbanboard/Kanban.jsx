import Header from '../../shared/components/header/Index';
import Sidebar from '../../shared/components/sidebar/Index';
import TrelloCard from '../../shared/components/card/Card';
import './Styles.css';
import CardModal from '../../shared/components/modal/Modal';
import React, { useEffect, useState } from 'react';
import Api from '../../shared/api';

const UserFilter = ({ userType }) => {
    return (
        <div className="user-filter">
            Usuário: <span className="user-type">{userType}</span>
        </div>
    )
}

const KanbanBoard = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const handleCloseModal = () => {
        setSelectedCard(null);
    }

    useEffect(()=>{
        Api.getCards()
        .then((boardCards)=>{
            console.log({boardCards})
        })
        .catch((error)=>console.error(error))
    },[])

    return (
        <div>
            <Header />
            <div className="kanban-container">
                <div className="SubHeaderWrapper">Controle de Demandas</div>
                <UserFilter userType="Administrador" />
                <Sidebar />
                <div className="kanban-board">

                    <div className="column">
                        <h2>Solicitados</h2>
                        <div className="sub-column">
                            <TrelloCard title="Card 1" description="Descrição do Card 1" />
                            <TrelloCard title="Card 2" description="Descrição do Card 2" />
                        </div>
                    </div>
                    <div className="column">
                        <h2>Backlog</h2>
                        <div className="sub-column">
                            <TrelloCard title="Card 1" description="Descrição do Card 1" />

                        </div>
                    </div>
                    <div className="column">
                        <h2>Desenvolvimento</h2>
                        <div className="sub-column">
                            <TrelloCard title="Card 1" description="Descrição do Card 1" />
                        </div>
                    </div>
                    <div className="column">
                        <h2>Testes</h2>
                        <div className="sub-column">
                            <TrelloCard title="Card 1" description="Descrição do Card 1" />
                        </div>
                    </div>
                    <div className="column">
                        <h2>Produção</h2>
                        <div className="sub-column">
                            <TrelloCard title="Card 1" description="Descrição do Card 1" />
                            <TrelloCard title="Card 2" description="Descrição do Card 2" />
                        </div>
                    </div>
                    <div className="column">
                        <h2>Arquivado</h2>
                        <div className="sub-column">
                            <TrelloCard title="Card 1" description="Descrição do Card 1" />
                        </div>
                    </div>
                </div>
            </div>
            {selectedCard && <CardModal card={selectedCard} onClose={handleCloseModal} />}
        </div>
    )
}

export default KanbanBoard
