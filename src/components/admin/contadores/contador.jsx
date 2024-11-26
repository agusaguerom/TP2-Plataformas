import React from 'react';
import './contador.css';

const contador = ({ titulo, valor }) => {
  return (
    <div className="info-card">
      <div className="card-content">
        <h2 className="card_titulos">{titulo}</h2>
        <h3>{valor}</h3>
      </div>
    </div>
  );
};

export default contador;