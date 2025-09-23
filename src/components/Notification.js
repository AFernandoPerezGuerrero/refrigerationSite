import React, { useState, useEffect } from 'react';
import '../styles/Notification.css';

function Notification() {
  // Usaremos un solo estado para manejar todo: 'hidden', 'visible', 'fading'
  const [status, setStatus] = useState('hidden');

  // Temporizador para aparecer (5 segundos)
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setStatus('visible'); // Cambia a 'visible'
    }, 5000);

    return () => clearTimeout(showTimer);
  }, []); // Se ejecuta solo una vez

  // Temporizador para auto-cerrarse (7 segundos)
  useEffect(() => {
    // Si el estado es 'visible', activa el timer para cerrarlo
    if (status === 'visible') {
      const autoCloseTimer = setTimeout(() => {
        handleClose();
      }, 7000);

      return () => clearTimeout(autoCloseTimer);
    }
  }, [status]); // Se activa cada vez que 'status' cambia

  // Función de cierre
  const handleClose = () => {
    setStatus('fading'); // Cambia a 'fading'
    
    // Espera a que termine la animación de 0.5s antes de ocultarlo
    setTimeout(() => {
      setStatus('hidden'); // Cambia a 'hidden'
    }, 500); // Debe coincidir con la animación CSS
  };

  // Construye las clases basado en el estado
  // Esto hace IMPOSIBLE que 'slide-in' y 'fade-out' estén juntos
  const notificationClasses = [
    'notification-popup',
    status === 'visible' ? 'slide-in' : '',
    status === 'fading' ? 'fade-out' : ''
  ].join(' ');

  // Si está oculto, no renderiza nada
  if (status === 'hidden') {
    return null;
  }

return (
    <div className={notificationClasses}>
      {/* La barra de tiempo sigue igual */}
      <div className="timer-bar"></div>
      
      {/* 1. Botón "X" movido aquí arriba, fuera del contenido */}
      <button className="close-button" onClick={handleClose}>
        &times;
      </button>

      {/* 2. El 'div' de contenido ahora envuelve el texto y el botón "Ver Más" */}
      <div className="notification-content">
        <div className="notification-text">
          <strong>¡Oferta Especial!</strong>
          <p>Tu texto de promoción va aquí.</p>
        </div>
        
        {/* 3. El 'action-button' está suelto (eliminamos 'notification-actions') */}
        <button className="action-button">Ver Más</button>
      </div>
    </div>
  );
}

export default Notification;