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
import NewsletterModal from './components/NewsletterModal';
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiMessageCircle } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import './i18n'; // ⬅️ NEW: Import the i18n configuration
import { useTranslation } from 'react-i18next'; // ⬅️ NEW: Import the hook




function App() {
  const { i18n, t } = useTranslation(); // ⬅️ NEW: Initialize i18n hook
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
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language); // ⬅️ NEW: Track active language
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
  const openNewsletterModal = () => setIsNewsletterModalOpen(true);
  const closeNewsletterModal = () => setIsNewsletterModalOpen(false);

  const handleLanguageChange = (lng) => {
      i18n.changeLanguage(lng);
      setCurrentLanguage(lng); // Triggers the useEffect below
  };

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  

  const contactMethodsData = [
  { id: 'call', title: t('method.call'), icon: <FiPhone />, info: t("contact.call_modal_button"), href: 'tel:+573018520511' },
    { id: 'whatsapp', title: t('method.whatsapp'), icon: <FiMessageCircle />, info: t("contact.whatsapp_modal_button"), href: 'https://wa.me/573018520511' },
    { id: 'email', title: t('method.email'), icon: <MdOutlineEmail />, info: t("contact.email_modal_button"), href: 'mailto:coolfixh.i@gmail.com' }
];

const aboutUsData = { 
  title: 'CoolFix', 
  icon: <FcAbout />, 
  info: t('about.info_text')
}


    

    useEffect(() => {
    const fetchServices = async () => {
      try {
        // Send language code as a query parameter
        const response = await fetch(`${API_BASE_URL}/api/services?lang=${currentLanguage}`); 
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };
    // Fetch runs on mount and whenever currentLanguage changes
    fetchServices();
    
    // NOTE: We do NOT use setInterval here, as the change is user-initiated.
    
  }, [API_BASE_URL, currentLanguage]);

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
        <Header onOpenMenu={openMenu} onLanguageChange={handleLanguageChange}/>
        <Ticker onOpenNewsletterModal={openNewsletterModal} />
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
      <Notification onOpenNewsletterModal={openNewsletterModal} />
      <ContactMethodModal method={selectedContactMethod} onClose={closeContactModal} />
      <AboutUsModal aboutus={selectedAboutUs} onClose={closeAboutUsModal} />
      <NewsletterModal isOpen={isNewsletterModalOpen} onClose={closeNewsletterModal} />
    </div>
  );
}

export default App;