import React from 'react';
import '../styles/ContactMethodModal.css';
import { useTranslation } from 'react-i18next'; // ⬅️ NEW IMPORT


function ContactMethodModal({ method, onClose }) {
  const { t } = useTranslation(); // ⬅️ Initialize hook

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
        <p>{t("contact.modal_text")}</p>

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