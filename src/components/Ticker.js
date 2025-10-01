import React from 'react';
import '../styles/Ticker.css';

function Ticker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        <a href=''><div className="ticker-item">Únete a nuestro newsletter para hacer seguimiento a tus equipos.</div></a>
        <a href='#office-hours'><div className="ticker-item">DISPONIBLES EN TODO MEDELLIN.</div></a>
        <a href='#service-catalog'><div className="ticker-item">Servicios, mantenimiento y calidad 100% garantizada.</div></a>
        
        <a href=''><div className="ticker-item">Únete a nuestro newsletter para hacer seguimiento a tus equipos.</div></a>
        <a href='#office-hours'><div className="ticker-item">Disponibles en todo MEDELLIN.</div></a>
        <a href='#service-catalog'><div className="ticker-item">Servicios, mantenimiento y calidad 100% garantizada.</div></a>
      </div>
    </div>
  );
}

export default Ticker;