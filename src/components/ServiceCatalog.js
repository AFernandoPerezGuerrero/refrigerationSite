import { useState, useEffect } from 'react';
import ServiceItem from '../components/ServiceItem';
import "../styles/ServiceCatalog.css"; 
import { useTranslation } from 'react-i18next'; // ⬅️ NEW IMPORT

function ServiceCatalog({ services, onOpenModal }) {
const { t, i18n } = useTranslation(); // ⬅️ Defines both 't' AND 'i18n'

const [activeCategory, setActiveCategory] = useState(null); 
  // ⬇️ NEW STATE: Stores the translated title for display ⬇️
  const [displayedTitle, setDisplayedTitle] = useState(null); 
  // ⬇️ NEW STATE: Unique key to force re-render and animation ⬇️
  const [animationKey, setAnimationKey] = useState(0);
  

  const getCategoryTitle = (categoryKey) => {
    if (categoryKey === 'home') return t('menu.services_domestic');
    if (categoryKey === 'industrial') return t('menu.services_industrial');
    if (categoryKey === 'commercial') return t('menu.linea_comercial');
    return null;
  };

  useEffect(() => {
      // If a category is active, re-translate its title whenever i18n.language changes
      if (activeCategory) {
          setDisplayedTitle(getCategoryTitle(activeCategory));
      }
      // The effect is triggered whenever i18n.language changes globally
  }, [i18n.language, activeCategory]);

  const handleCategoryClick = (categoryKey) => {
      // 1. Update the filter
      setActiveCategory(categoryKey); 
      // 2. Set the displayed title using the helper function
      setDisplayedTitle(getCategoryTitle(categoryKey)); 
      // 3. Trigger animation
      setAnimationKey(prev => prev + 1); 
  };

  

  // src/components/ServiceCatalog.js

// ... (rest of imports and hooks) ...

const getFilteredServices = () => {
    if (!activeCategory) {
      return []; 
    }

    // 1. Determine the required tag name (e.g., 'home' -> 'HOME')
    const requiredTag = activeCategory.toUpperCase(); 

    return services.filter(service => {
        // ⬇️ FIX: Filter based purely on the database tag ⬇️
        return service.category_tag === requiredTag;
    });
};
// ... (rest of component logic) ...

  const filteredServices = getFilteredServices();

    if (!services || services.length === 0) {
    return <h3>{t("catalog.loading")}</h3>;
  }


  const renderCategoryButtons = () => (
    <div className='catalog-buttons-container'>
    <div className="catalog-category-buttons">
      <button 
        className={`category-button ${activeCategory === 'home' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('home')}
      >
        {t('menu.services_domestic')}
      </button>
      <button 
        className={`category-button ${activeCategory === 'industrial' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('industrial')}
      >
        {t('menu.services_industrial')}
      </button>

    </div>

    <button 
        className={`category-button ${activeCategory === 'commercial' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('commercial')}
      >
        {t('menu.linea_comercial')} 
      </button>
</div>
  );

    const renderServiceItems = () => {
        
        // Scenario A: Data is loading (show initial loading state from App.js)
        if (!services || services.length === 0) {
            return <h3>{t("catalog.loading")}</h3>; 
        }

        // Scenario B: No category is active (prompt user to click a button)
        if (!activeCategory) {
            return <p className="initial-prompt">{t('catalog.prompt_filter')}</p>; // Need to add this key
        }
        
        // Scenario C: Filter is active but found nothing
        if (filteredServices.length === 0) {
             return <p className="no-services">{t('catalog.no_services_found')}</p>;
        }

        // Scenario D: Display filtered services (The list fade-in logic)
        return (
            <div className="catalog-container animated-content">
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
      
      {displayedTitle && (
          <h2 className="active-category-title">{displayedTitle}</h2>
      )}

      <div className="service-animation-wrapper">
                {renderServiceItems()}
            </div>
    </div>
  );
}

export default ServiceCatalog;