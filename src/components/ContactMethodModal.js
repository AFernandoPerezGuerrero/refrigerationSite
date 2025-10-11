import React from 'react';
import '../styles/ContactMethodModal.css';

function ContactMethodModal({ method, onClose }) {
  if (!method) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        
        <h2>{method.title}</h2>
        <p>Puedes contactarnos directamente a través de este medio:</p>

        <a 
          href={method.href}
          className="contact-modal-button"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <span className='modal-icon'>{method.icon}</span>
          {method.info}
        </a>
      </div>
    </div>
  );
}

export default ContactMethodModal;