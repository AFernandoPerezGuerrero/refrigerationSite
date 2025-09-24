import React from 'react'; // Es una buena práctica importar React
import "../styles/ServiceItem.css"; 
import DynamicIcon from './DynamicIcon'; 

// 1. Acepta 'service' (la caja) y 'onOpenModal' como props
function ServiceItem({ service, onOpenModal }) {
  
  // 2. "Abre la caja": extraemos los datos del objeto 'service'
  const { 
    name, 
    description, 
    image_url, 
    icon_library, 
    icon_name, 
    icon_color 
  } = service;

  return (
    <div className="service-card">
      
      {/* 3. Ahora usamos las variables correctas (image_url y name) */}
      <img 
        src={image_url} 
        alt={name} 
        className='service-card-image'
      />

      <div className='card-info'>
        <div className='item-title'>
          <DynamicIcon 
            library={icon_library} 
            name={icon_name} 
            color={icon_color}
            size={30}
            className="service-icon" 
          />
          {/* Usamos 'name' para el título, que es el nombre en la BD */}
          <h3>{name}</h3>
        </div>
        <p>{description}</p>
        
        {/* Este botón ya está configurado para abrir el modal */}
        <button 
          className="solicitar-servicio-button" 
          onClick={() => onOpenModal(service)}
        >
          Solicitar Servicio
        </button>
      </div>
    </div>
  );
}

export default ServiceItem;