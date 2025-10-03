import React, { useState } from 'react';
import '../styles/NewsletterModal.css';
import { FaArrowRight } from "react-icons/fa"; 

function NewsletterModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback("Enviando...");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/newsletter/subscribe`, {
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
        <h2>Suscríbete a Nuestro Newsletter</h2>
        <p>Recibe notificaciones sobre el estado de tus equipos y nuestras últimas ofertas.</p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="Tu correo electrónico"
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