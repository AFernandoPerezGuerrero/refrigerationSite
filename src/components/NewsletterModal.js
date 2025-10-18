import React, { useState } from 'react';
import '../styles/NewsletterModal.css';
import { FaArrowRight } from "react-icons/fa"; 
import { useTranslation } from 'react-i18next';

function NewsletterModal({ isOpen, onClose }) {
      const { t } = useTranslation(); // ⬅️ Initialize hook


  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback("Enviando...");

    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback(data.msg);
        setEmail(''); 
      } else {
        setFeedback(data.msg); 
      }
    } catch (error) {
      setFeedback("Error de red. Intenta de nuevo.");
      console.error("Newsletter signup error:", error);
    }
  };


  const handleClose = () => {
    setFeedback('');
    onClose();
  };
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={handleClose}>
          &times;
        </button>
        <h2>{t("newsletter.modal_title")}</h2>
        <p>{t("newsletter.modal_info")}</p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter-input"
            placeholder={t("newsletter.input_label")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-button" aria-label="Suscribirse">
            <FaArrowRight />
          </button>
        </form>
        
        {feedback && <p className="feedback-message">{feedback}</p>}

      </div>
    </div>
  );
}

export default NewsletterModal;