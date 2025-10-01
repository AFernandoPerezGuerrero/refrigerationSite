import React, { useState, useEffect } from 'react';
import '../styles/Notification.css';

function Notification() {
  const [status, setStatus] = useState('hidden');

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setStatus('visible');
    }, 5000);

    return () => clearTimeout(showTimer);
  }, []); 


  useEffect(() => {
   
    if (status === 'visible') {
      const autoCloseTimer = setTimeout(() => {
        handleClose();
      }, 7000);

      return () => clearTimeout(autoCloseTimer);
    }
  }, [status]); 

 
  const handleClose = () => {
    setStatus('fading'); 
    

    setTimeout(() => {
      setStatus('hidden'); 
    }, 500); 
  };

  const notificationClasses = [
    'notification-popup',
    status === 'visible' ? 'slide-in' : '',
    status === 'fading' ? 'fade-out' : ''
  ].join(' ');
  if (status === 'hidden') {
    return null;
  }

return (
    <div className={notificationClasses}>
      <div className="timer-bar"></div>
          <button className="close-button" onClick={handleClose}>
        &times;
      </button>

      <div className="notification-content">
        <div className="notification-text">
          <strong>¡Oferta Especial!</strong>
          <p>Tu texto de promoción va aquí.</p>
        </div>
        
        <button className="action-button">Ver Más</button>
      </div>
    </div>
  );
}

export default Notification;