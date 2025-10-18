import React from 'react';
import "../styles/ServiceItem.css"; 
import DynamicIcon from './DynamicIcon'; 
import { useTranslation } from 'react-i18next'; // ⬅️ NEW IMPORT


function ServiceItem({ service, onOpenModal }) {
  const { t } = useTranslation(); // ⬅️ Initialize hook

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
      
      <img 
        src={image_url} 
        alt={t('catalog.img_alt', { serviceName: name })} 
        className='service-card-image'
        onClick={() => onOpenModal(service)}
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
          <h3>{name}</h3>
        </div>
        <p>{description}</p>
        
        <button 
          className="solicitar-servicio-button" 
          onClick={() => onOpenModal(service)}
        >
          {t("item.button")}
        </button>
      </div>
    </div>
  );
}

export default ServiceItem;