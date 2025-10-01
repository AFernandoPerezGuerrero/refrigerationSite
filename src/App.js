import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import Header from './components/Header.js';
import Body from './components/Body.js';
import ServiceCatalog from './components/ServiceCatalog.js'
import ServiceModal from './components/ServiceModal.js';
import SocialsModal from './components/SocialsModal.js'; 
import FadeInSection from './components/FadeInSection.js';
import Contact from './components/Contact.js'
import Footer from './components/Footer.js';
import Notification from './components/Notification.js';
import Ticker from './components/Ticker.js';
import Menu from './components/Menu.js';
import ContactMethodModal from './components/ContactMethodModal';
import AboutUsModal from './components/AboutUsModal.js';
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiMessageCircle } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FcAbout } from "react-icons/fc";



const contactMethodsData = [
  { id: 'call', title: 'Llamar', icon: <FiPhone />, info: '+57 301 852 0511', href: 'tel:+573018520511' },
  { id: 'whatsapp', title: 'WhatsApp', icon: <FiMessageCircle />, info: '+57 301 852 0511', href: 'https://wa.me/573018520511' },
  { id: 'email', title: 'Email', icon: <MdOutlineEmail />, info: 'coolfixh.i@gmail.com', href: 'mailto:coolfixh.i@gmail.com' }
];

const aboutUsData = { 
  title: 'CoolFix', 
  icon: <FcAbout />, 
  info: 'Contamos con más de X años de experiencia dedicada a brindar soluciones para...'}

function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [socialsModalIsOpen, setSocialsModalIsOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const [services, setServices] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedContactMethod, setSelectedContactMethod] = useState(null);
  const [selectedAboutUs, setSelectedAboutUs] = useState(null);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const openServiceModal = (service) => setSelectedService(service);
  const closeServiceModal = () => setSelectedService(null);
  const openContactModal = (method) => setSelectedContactMethod(method);
  const closeContactModal = () => setSelectedContactMethod(null);
  const openSocialsModal = () => setSocialsModalIsOpen(true);
  const closeSocialsModal = () => setSocialsModalIsOpen(false);
  const openAboutUsModal = (aboutus) => setSelectedAboutUs(aboutus);
  const closeAboutUsModal = () => setSelectedAboutUs(null);
  


    useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };
    fetchServices();
  }, []);

    useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 70) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const openModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };
   
useEffect(() => {
    if (!formStatus) return;

    const handleCloseNotification = () => {
      setIsFadingOut(true); 

      setTimeout(() => {
        setFormStatus("");
        setIsFadingOut(false); 
      }, 500); 
    };

    const timer = setTimeout(handleCloseNotification, 5000);
    return () => clearTimeout(timer);
  }, [formStatus]);

  

  return (
    <div className="App">
      <Menu 
      isOpen={isMenuOpen} 
      onClose={closeMenu} 
      services={services}
      onOpenServiceModal={openServiceModal}
      contactMethods={contactMethodsData}
      onOpenContactModal={openContactModal}
      onOpenSocialsModal={openSocialsModal}
      aboutUs={aboutUsData} 
      onOpenAboutUsModal={openAboutUsModal}/>

      <header className={!showHeader ? 'hidden' : ''}>
        <Header onOpenMenu={openMenu}/>
        <Ticker />
      </header>
        
      <a href="https://wa.me/TUNUMERO" className="corner-whatsapp-button" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
      </a>

      <main>
        <FadeInSection>
          <Body />
        </FadeInSection>

        <FadeInSection>
          <ServiceCatalog services={services} onOpenModal={openModal} />
        </FadeInSection>
      </main>

      <FadeInSection>
        <Contact  
          setFormStatus={setFormStatus} 
          onOpenSocialsModal={openSocialsModal}
          contactMethods={contactMethodsData}
          onOpenContactModal={openContactModal} />
      </FadeInSection>
      
      <footer>
        <Footer />
      </footer>

      <ServiceModal 
        service={selectedService}
        onClose={closeModal}
        services={services} 
        onOpenModal={openModal}
      />
      <SocialsModal 
      isOpen={socialsModalIsOpen} 
      onClose={closeSocialsModal} 
      />



      {formStatus && (
        <div 
          className={`form-notification ${formStatus.includes('Error') ? 'error' : 'success'} ${isFadingOut ? 'fade-out' : ''}`}>
        {formStatus}
        </div>
      )}
      <Notification />
      <ContactMethodModal method={selectedContactMethod} onClose={closeContactModal} />
      <AboutUsModal aboutus={selectedAboutUs} onClose={closeAboutUsModal} />

    </div>
  );
}

export default App;