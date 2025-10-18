import React from 'react';
import '../styles/ServiceModal.css'; 
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; // ⬅️ NEW IMPORT


function ServiceModal({ service, onClose }) {

  const { t } = useTranslation(); // ⬅️ Initialize hook

  if (!service) {
    return null;
  }
  

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img 
            src={service.image_url} 
            alt={service.name} 
            className="service-modal-image" 
          />
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
       
        <h2>{service.name}</h2> 
        
        <p>{service.description}</p>
        
        <a 
          href="https://wa.me/3018520511"
          className="modal-whatsapp-button"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
          {t("contact.title")}
        </a>

      </div>
    </div>
  );
}

export default ServiceModal;