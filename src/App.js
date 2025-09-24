import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.js';
import Body from './components/Body.js';
import ServiceCatalog from './components/ServiceCatalog.js'
import ServiceModal from './components/ServiceModal.js'; // <-- 1. Importa el Modal
import FadeInSection from './components/FadeInSection.js';
import Contact from './components/Contact.js'
import { FaWhatsapp } from "react-icons/fa";
import Footer from './components/Footer.js';

function App() {
  // --- 2. El estado del Modal y del Formulario viven aquí ---
  const [selectedService, setSelectedService] = useState(null);
  const [formStatus, setFormStatus] = useState("");
  
  // --- 3. Las funciones del Modal viven aquí ---
  const openModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };
  
  // (Tu useEffect para el scroll y la notificación se quedan igual)
  useEffect(() => { /* ... tu código del scroll ... */ }, []);
  useEffect(() => { /* ... tu código del timer de la notificación ... */ }, [formStatus]);

  return (
    <div className="App">
      <header>
        <Header className="header"/>
      </header>
        
      <a href="https://wa.me/TUNUMERO" className="corner-whatsapp-button" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
      </a>

      <main>
        <FadeInSection>
          <Body />
        </FadeInSection>

        <FadeInSection>
          {/* 4. Pasa la función para abrir el modal como prop */}
          <ServiceCatalog onOpenModal={openModal} />
        </FadeInSection>
      </main>

      <FadeInSection>
        <Contact setFormStatus={setFormStatus} />
      </FadeInSection>
      
      <footer>
        <Footer />
      </footer>

      {/* --- 5. El Modal ahora se renderiza aquí, en el nivel principal --- */}
      <ServiceModal 
        service={selectedService}
        onClose={closeModal}
      />

      {/* La notificación del formulario también vive aquí */}
      {formStatus && (
        <div className={`form-notification ${formStatus.includes('Error') ? 'error' : 'success'}`}>
          {formStatus}
        </div>
      )}
    </div>
  );
}

export default App;