import React from 'react';
import cardStyles from './Styles';

const TrelloCard = ({ title, description, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick({ title, description });
    }
  };

  return (
    <div style={cardStyles.card} onClick={handleClick}>
      <div style={cardStyles.header}>
        <h3>{title}</h3>
      </div>
      <div style={cardStyles.content}>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TrelloCard;
