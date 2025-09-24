import React from 'react';
import '../styles/ServiceModal.css'; 
import { FaWhatsapp } from 'react-icons/fa';

function ServiceModal({ service, onClose }) {
  // Si no hay un servicio seleccionado, no se muestra nada.
  if (!service) {
    return null;
  }

  // onClose cierra el modal.
  // e.stopPropagation() evita que al hacer clic DENTRO del modal se cierre.
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        
        {/* Usamos el título del servicio que viene de la base de datos */}
        <h2>{service.name}</h2> 
        
        {/* Este es el contenido que llenaremos mañana */}
        <p>{service.description}</p>
        
        <a 
          href="https://wa.me/3018520511" // <-- Reemplaza con tu link de WhatsApp
          className="modal-whatsapp-button"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
          Contáctanos
        </a>

      </div>
    </div>
  );
}

export default ServiceModal;