import React from 'react';
import '../styles/AboutUsModal.css';

function AboutUsModal({ aboutus, onClose }) {
  if (!aboutus) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        
        <div className="aboutus-modal-icon">{aboutus.icon}</div>
        <h2>{aboutus.title}</h2>
    
        <h3>{aboutus.info}</h3>
      </div>
    </div>
  );
}

export default AboutUsModal;