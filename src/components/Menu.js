import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import '../styles/Menu.css';
import DynamicIcon from './DynamicIcon';
import { useTranslation } from 'react-i18next';


function Menu({ isOpen, onClose, services, onOpenServiceModal, contactMethods, onOpenContactModal, onOpenSocialsModal, aboutUs, onOpenAboutUsModal }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { t } = useTranslation();

  /*
  const { 
    name, 
    description, 
    image_url, 
    icon_library, 
    icon_name, 
    icon_color 
  } = services;
*/

  if (!isOpen && !isClosing) return null;
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  
  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleContact = () => setIsContactOpen(!isContactOpen);
  
 
  const handleServiceClick = (service) => {
    onOpenServiceModal(service); 
    handleClose(); 
  };

   const handleContactMethodClick = (method) => {
    onOpenContactModal(method);
    handleClose();
  };
  const handleSocialsClick = () => {
    onOpenSocialsModal();
    handleClose();
  };

  const handleAboutUsClick = () => {
    onOpenAboutUsModal(aboutUs); 
    handleClose();
  };

  return (
    <div className={`menu-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
      <div className={`menu-panel ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="menu-close-button" onClick={handleClose}>&times;</button>
        <nav>
          <ul>
            <li>
              <button className="menu-item-button" onClick={toggleServices}>
                {t('menu.services')}
                <span className={`arrow ${isServicesOpen ? 'open' : ''}`}>
                    <IoIosArrowDown />
                </span>
              </button>
   
              <ul className={`submenu ${isServicesOpen ? 'open' : ''}`}>
                {services.map(service => (
                  <li key={service.id}>
                 
                    <button className="submenu-item-button" onClick={() => handleServiceClick(service)}>
                      {service.name}
                    <DynamicIcon 
                      library={service.icon_library} 
                      name={service.icon_name} 
                      color={service.icon_color}
                      size={30}
                      className="service-icon" 
                    />
                    </button>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <button className="menu-item-button" onClick={toggleContact}>
                {t('menu.contact_hours')} <span className={`arrow ${isContactOpen ? 'open' : ''}`}>
                    <IoIosArrowDown />
                </span>
              </button>

              <ul className={`submenu ${isContactOpen ? 'open' : ''}`}>
              <li><a href="#contact-card" className="submenu-item-link" onClick={handleClose}>{t('menu.send_message')}</a></li>

            {contactMethods.map(method => (
              <li key={method.id}>
                  <button className="submenu-item-button" onClick={() => handleContactMethodClick(method)}>
                  {method.title}
                  </button>
              </li>
            ))}
              <li><button className="submenu-item-button" onClick={handleSocialsClick}>{t('menu.social_networks')}</button></li>
              <li><a href="#office-hours" className="submenu-item-link" onClick={handleClose}>{t('menu.office_hours')}</a></li>
              </ul>
            </li>

            <li>
              <button className="menu-item-button" onClick={handleAboutUsClick}>
                {t("menu.about_us")}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Menu;