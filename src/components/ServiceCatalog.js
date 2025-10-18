import { useState } from 'react';
import ServiceItem from '../components/ServiceItem';
import "../styles/ServiceCatalog.css"; 
import { useTranslation } from 'react-i18next'; // ⬅️ NEW IMPORT

function ServiceCatalog({ services, onOpenModal }) {
  const { t } = useTranslation(); // ⬅️ Initialize hook
  
  const [activeCategory, setActiveCategory] = useState(null); // 'home', 'industrial', 'commercial'

  if (!services || services.length === 0) {
    return <h3>{t("catalog.loading")}</h3>;
  }

  const getFilteredServices = () => {
    if (!activeCategory) {
      // If no category is selected, return an empty array (or all services, but client asked to show only when clicked)
      return []; 
    }

    return services.filter(service => {
        const originalName = service.name_es || service.name; // Use Spanish name for filtering logic
        
        if (activeCategory === 'home') {
            return originalName && (originalName.includes('Doméstica') || originalName.includes('Calefacción') || originalName.includes('Cocina'));
        }
        if (activeCategory === 'industrial') {
            return originalName && originalName.includes('Industrial');
        }
        if (activeCategory === 'commercial') {
            return originalName && originalName.includes('Comercial');
        }
        return false;
    });
  };

  const filteredServices = getFilteredServices();

  const renderCategoryButtons = () => (
    <div className="catalog-category-buttons">
      <button 
        className={`category-button ${activeCategory === 'home' ? 'active' : ''}`}
        onClick={() => setActiveCategory('home')}
      >
        {t('menu.services_domestic')}
      </button>
      <button 
        className={`category-button ${activeCategory === 'industrial' ? 'active' : ''}`}
        onClick={() => setActiveCategory('industrial')}
      >
        {t('menu.services_industrial')}
      </button>
      <button 
        className={`category-button ${activeCategory === 'commercial' ? 'active' : ''}`}
        onClick={() => setActiveCategory('commercial')}
      >
        {t('menu.linea_comercial')} {/* Assuming a new translation key for "Línea Comercial" */}
      </button>
    </div>
  );

    const renderServiceItems = () => {
      if (filteredServices.length === 0) {
          if (activeCategory) {
              return <p className="no-services">{t('catalog.no_services_found')}</p>;
          }
          return null; // Don't show anything until a button is clicked
      }

  return (
          <div className="catalog-container">
              {filteredServices.map(service => (
                  <ServiceItem 
                      key={service.id} 
                      service={service}
                      onOpenModal={onOpenModal}
                  />
              ))}
          </div>
      );
  };


  return (
    <div className='catalog' id='service-catalog'>
      <div className='catalog-information'>
        <h3>{t("catalog.header")}</h3>
        <p>{t("catalog.description")}</p>
      </div>
      
      {/* Step 2: Render the buttons */}
      {renderCategoryButtons()}
      
      {/* Step 3: Render the services only if a category is active */}
      {renderServiceItems()}

    </div>
  );
}

export default ServiceCatalog;