import React from 'react';
import '../modal/Styles'

const CardModal = ({ card, onClose }) => {
  return (
    <div className="card-modal">
      <div className="card-modal-content">
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default CardModal;
