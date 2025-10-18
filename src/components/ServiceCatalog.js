import React from 'react';
import ServiceItem from '../components/ServiceItem';
import "../styles/ServiceCatalog.css"; 
import { useTranslation } from 'react-i18next'; // ⬅️ NEW IMPORT

function ServiceCatalog({ services, onOpenModal }) {
  
  const { t } = useTranslation(); // ⬅️ Initialize hook
  
  if (!services || services.length === 0) {
    return <h3>{t("catalog.loading")}</h3>;
  }

  return (
    <div className='catalog' id='service-catalog'>
      <div className='catalog-information'>
        <h3>{t("catalog.header")}</h3>
        <p>{t("catalog.description")}</p>
      </div>
      
      <div className="catalog-container">
        {services.map(service => (
          <ServiceItem 
            key={service.id} 
            service={service}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>

    </div>
  );
}

export default ServiceCatalog;