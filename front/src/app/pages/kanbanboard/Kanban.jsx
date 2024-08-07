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
      <div className="UserEmailLabel">Solicitante: </div>
      <div className="UserEmailContainer">
        <input className="StyledInput" type="text" name="email" value={userEmail} readOnly />
      </div>
    </div>
  );
}

const KanbanBoard = () => {
  const [demandCards, setDemandCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCards(demandCards);
    } else {
      const filtered = demandCards.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  }, [searchTerm, demandCards]);

  const fetchDemandCards = () => {
    Api.getCards()
      .then((kanbanizeCards) => {
        setDemandCards(kanbanizeCards.data.data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setCarregando(false));
  }

  const handleCardClick = (card) => {
    // Implemente a lógica conforme necessário
  }

  const handleRefresh = () => {
    fetchDemandCards();
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar solicitante..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        {
          carregando
            ? <p>Carregando...</p>
            : <div className="kanban-board">
                <KanbanColumn title="Solicitados" columnKey={17} demandCards={filteredCards} onCardClick={handleCardClick} />
                <KanbanColumn title="Backlog" columnKey={31} demandCards={filteredCards} onCardClick={handleCardClick} />
                <KanbanColumn title="Desenvolvimento" columnKey={18} demandCards={filteredCards} onCardClick={handleCardClick} />
                <KanbanColumn title="Testes" columnKey={19} demandCards={filteredCards} onCardClick={handleCardClick} />
                <KanbanColumn title="Produção" columnKey={20} demandCards={filteredCards} onCardClick={handleCardClick} />
                <KanbanColumn title="Arquivado" columnKey={21} demandCards={filteredCards} onCardClick={handleCardClick} />
              </div>
        }
      </div>
    </div>
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
            onClick={() => onCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
