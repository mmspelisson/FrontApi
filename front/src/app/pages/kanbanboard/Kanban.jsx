import React, { useState, useEffect } from 'react'
import Header from '../../shared/components/header/Index'
import Sidebar from '../../shared/components/sidebar/Index'
import './Styles.css'
import Api from '../../shared/api'
import { HeaderSpacer } from '../registerUsers/Styles'
import BasicCard from '../../shared/components/card/Card'
// import CadastroDemanda from '../demand/CadastroDemanda'

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

  const fetchDemandCards = () => {
    Api.getCards()
      .then((cards) => {
        setDemandCards(cards || []);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchDemandCards();
  }, []);

  const handleCardClick = (card) => {
  }

  const handleRefresh = () => {
    fetchDemandCards();
  }

  const handleDemandAdded = (newDemand) => {
    setDemandCards(prevState => [...prevState, newDemand]);
  };

  return (
    <div>
      <Header />
      <HeaderSpacer />
      <div className="SubHeaderWrapper">
        <span>Controle de Demandas</span>
        <div className="refresh-button-container">
          <button onClick={handleRefresh} className="refresh-button">⟲</button>
        </div>
      </div>
      <div className="kanban-container">
        <UserFilter userEmail={userEmail} />
        <Sidebar />
        <div className="kanban-board">
          <div className="column">
            <h2>Solicitados</h2>
            <div className="sub-column">
              {demandCards.filter(card => card.column === 'Solicitados').map((card) => (
                <BasicCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  onClick={() => handleCardClick(card)} />
              ))}
            </div>
          </div>
          <div className="column">
            <h2>Backlog</h2>
            <div className="sub-column">
              {demandCards.filter(card => card.column === 'Backlog').map((card) => (
                <BasicCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  onClick={() => handleCardClick(card)} />
              ))}
            </div>
          </div>
          <div className="column">
            <h2>Desenvolvimento</h2>
            <div className="sub-column">
              {demandCards.filter(card => card.column === 'Desenvolvimento').map((card) => (
                <BasicCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  onClick={() => handleCardClick(card)} />
              ))}
            </div>
          </div>
          <div className="column">
            <h2>Testes</h2>
            <div className="sub-column">
              {demandCards.filter(card => card.column === 'Testes').map((card) => (
                <BasicCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  onClick={() => handleCardClick(card)} />
              ))}
            </div>
          </div>
          <div className="column">
            <h2>Produção</h2>
            <div className="sub-column">
              {demandCards.filter(card => card.column === 'Produção').map((card) => (
                <BasicCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  onClick={() => handleCardClick(card)} />
              ))}
            </div>
          </div>
          <div className="column">
            <h2>Arquivado</h2>
            <div className="sub-column">
              {demandCards.filter(card => card.column === 'Arquivado').map((card) => (
                <BasicCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  onClick={() => handleCardClick(card)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard
