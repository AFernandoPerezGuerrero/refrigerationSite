import React from 'react';
import '../styles/SocialsModal.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; // ⬅️ NEW IMPORT


function SocialsModal({ isOpen, onClose }) {

  const { t } = useTranslation(); // ⬅️ Initialize hook

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1 }}>
        <defs>
          <linearGradient id="instagram-gradient-modal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
      </svg>

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        
        <h2>{t("contact.our_socials")}</h2>
        
        <div className="social-columns-container">

          <div className="social-column">
            <h3>{t("contact.facebook")}</h3>
            <a 
              href="https://facebook.com/61581477775409"
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-link facebook-icon"
            >
              <FaFacebook size="5rem" />
            </a>
          </div>
          
          <div className="social-column">
            <h3>{t("contact.instagram")}</h3>
            <a 
              href="https://instagram.com/coolfix_h.i" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-link instagram-gradient-icon"
            >
              <FaInstagram size="5rem" />
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialsModal;