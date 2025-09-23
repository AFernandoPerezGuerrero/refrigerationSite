import './App.css';
import Header from './components/Header.js';
import Body from './components/Body.js';
import ServiceCatalog from './components/ServiceCatalog.js'
import FadeInSection from './components/FadeInSection.js';
import Notification from './components/Notification.js';
import Contact from './components/Contact.js'
import { FaWhatsapp } from "react-icons/fa";
import Footer from './components/Footer.js';

import { useEffect } from 'react';



function App() {

useEffect(() => {
    // Damos un pequeño retraso (ej. 100ms) para dejar que el
    // navegador intente hacer su restauración de scroll primero.
    const timer = setTimeout(() => {
      
      // DESPUÉS de ese retraso, comprobamos dónde estamos:
      // Si el scroll sigue "casi arriba" (ej. menos de 50px),
      // entonces lo forzamos a 0.
      if (window.scrollY < 50) { 
        window.scrollTo(0, 0);
      }
      
      // Si el scroll está más abajo de 50px (ej. 800px),
      // no hacemos NADA, dejando que el usuario se quede donde estaba.

    }, 100); // 100ms de retraso (puedes ajustar este número si es necesario)

    return () => clearTimeout(timer); // Limpieza del timer
  }, []); // El array vacío [] asegura que solo se ejecute al cargar

  return (
    <div className="App">
      <header>
        <Header className="header"/>
      </header>

        <Notification />
  
    <div className='corner-whatsapp-button'><FaWhatsapp /></div>

  <main>

        <FadeInSection>
          <Body />
        </FadeInSection>

        <FadeInSection>
          <ServiceCatalog />
        </FadeInSection>

  </main>
        <FadeInSection>
          <Contact />
        </FadeInSection>

        <Footer />
    </div>
  );
}

export default App;
