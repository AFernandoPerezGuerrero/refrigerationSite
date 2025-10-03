import React from 'react';
import '../styles/Ticker.css';

function Ticker({ onOpenNewsletterModal }) {
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        <button className="ticker-item-button" onClick={onOpenNewsletterModal}>
          Únete a nuestro newsletter para hacer seguimiento a tus equipos.
        </button>
        <a href='#office-hours'><div className="ticker-item">DISPONIBLES EN TODO MEDELLIN</div></a>
        <a href='#service-catalog'><div className="ticker-item">Servicios, mantenimiento y calidad 100% garantizada</div></a>
        
        <button className="ticker-item-button" onClick={onOpenNewsletterModal}>
          Únete a nuestro newsletter para hacer seguimiento a tus equipos.
        </button>
        <a href='#office-hours'><div className="ticker-item">Disponibles en todo MEDELLIN</div></a>
        <a href='#service-catalog'><div className="ticker-item">Servicios, mantenimiento y calidad 100% garantizada</div></a>
      </div>
    </div>
  );
}

export default Ticker;