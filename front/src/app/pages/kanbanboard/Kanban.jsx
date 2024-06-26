import React, { useState, useEffect } from 'react';
import Header from '../../shared/components/header/Index';
import Sidebar from '../../shared/components/sidebar/Index';
import './Styles.css';
import Api from '../../shared/api';
import { HeaderSpacer } from '../registerUsers/Styles';
import BasicCard from '../../shared/components/card/Card';

const UserFilter = ({ userEmail }) => {
  return (
    <div className="user-filter">
      <div className="UserEmailLabel">Solicitante:</div>
      <div className="UserEmailContainer">
        <input className="StyledInput" type="text" name="email" value={userEmail} readOnly />
      </div>
    </div>
  );
}

const KanbanBoard = () => {
  const [demandCards, setDemandCards] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserEmail(user.email);
    }
  }, []);

  useEffect(() => {
    fetchDemandCards();
  }, []);

  const fetchDemandCards = () => {
    Api.getCards()
      .then((cards) => {
        console.log({cards})
        setDemandCards(cards || []);
      })
      .catch((error) => console.error(error));
  }

  const handleCardClick = (card) => {
  }

  const handleRefresh = () => {
    fetchDemandCards();
  }

  const handleDemandAdded = (newDemand) => {
    newDemand.coluna = 'Solicitados';  // Definindo a coluna como "Solicitados" para a nova demanda
    setDemandCards(prevCards => [...prevCards, newDemand]);
    console.log('Nova demanda adicionada:', newDemand);
  }

  return (
    <div>
      <Header />
      <HeaderSpacer />
      <div className="SubHeaderWrapper">
        <div className="subheader-content">
          <span>Controle de Demandas</span>
        </div>
        <div className="refresh-button-container">
          <button onClick={handleRefresh} className="refresh-button">⟲</button>
        </div>
      </div>
      <div className="kanban-container">
        <UserFilter userEmail={userEmail} />
        <Sidebar />
        <div className="kanban-board">
          <KanbanColumn title="Solicitados" columnKey="Solicitados" demandCards={demandCards} onCardClick={handleCardClick} />
          <KanbanColumn title="Backlog" columnKey="Backlog" demandCards={demandCards} onCardClick={handleCardClick} />
          <KanbanColumn title="Desenvolvimento" columnKey="Desenvolvimento" demandCards={demandCards} onCardClick={handleCardClick} />
          <KanbanColumn title="Testes" columnKey="Testes" demandCards={demandCards} onCardClick={handleCardClick} />
          <KanbanColumn title="Produção" columnKey="Produção" demandCards={demandCards} onCardClick={handleCardClick} />
          <KanbanColumn title="Arquivado" columnKey="Arquivado" demandCards={demandCards} onCardClick={handleCardClick} />
        </div>
      </div>
      {/* <CadastroDemanda onDemandAdded={handleDemandAdded} /> */}
    </div >
  );
}

const KanbanColumn = ({ title, columnKey, demandCards, onCardClick }) => {
  const filteredCards = demandCards.filter(card => card.coluna === columnKey);

  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="sub-column">
        {filteredCards.map((card) => (
          <BasicCard
            key={card.id}
            title={card.tipo}
            description={card.descricao}
            onClick={() => onCardClick(card)} />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
