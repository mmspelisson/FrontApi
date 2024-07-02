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
      <div className="UserEmailLabel"></div>
      <div className="UserEmailContainer">
        <input className="StyledInput" type="text" name="email" value={userEmail} readOnly />
      </div>
    </div>
  );
}
const KanbanBoard = () => {
  const [demandCards, setDemandCards] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [carregando, setCarregando] = useState(true)

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
      .then((kanbanizeCards) => {
        console.log(kanbanizeCards.data.data.data);
        setDemandCards(kanbanizeCards.data.data.data)
      })
      .catch((error) => console.error(error))
      .finally(() => setCarregando(false))
  }

  const handleCardClick = (card) => {
  }

  const handleRefresh = () => {
    fetchDemandCards();
  }

  return (
    <div>
      <Header />
      <HeaderSpacer />
      <div className="SubHeaderWrapper">
        <div className="subheader-content">
          <span>Controle de Demandas</span>
        </div>
        <div className="refresh-button-wrapper">
          <button onClick={handleRefresh} className="refresh-button">⟲</button>
        </div>
      </div>
      <div className="kanban-container">
        <UserFilter userEmail={userEmail} />
        <Sidebar />
        {
          carregando
            ? <p>carregando</p>
            : <div className="kanban-board">
                <KanbanColumn title="Solicitados" columnKey={17} demandCards={demandCards} onCardClick={handleCardClick} />
                <KanbanColumn title="Backlog" columnKey={31} demandCards={demandCards} onCardClick={handleCardClick} />
                <KanbanColumn title="Desenvolvimento" columnKey= {18} demandCards={demandCards} onCardClick={handleCardClick} />
                <KanbanColumn title="Testes" columnKey= {19} demandCards={demandCards} onCardClick={handleCardClick} />
                <KanbanColumn title="Produção" columnKey={20} demandCards={demandCards} onCardClick={handleCardClick} />
                <KanbanColumn title="Arquivado" columnKey={21} demandCards={demandCards} onCardClick={handleCardClick} />
              </div>
        }
      </div>
    </div >
  );
}

const KanbanColumn = ({ title, columnKey, demandCards, onCardClick }) => {
  const filteredCards = demandCards.filter(card => card.column_id === columnKey);
  
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="sub-column">
        {filteredCards.map((card) => (
          <BasicCard
            key={card.card_id}
            title={card.title}
            description={card.description}
            onClick={() => onCardClick(card)} />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
