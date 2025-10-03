import React from 'react';
import ServiceItem from '../components/ServiceItem';
import "../styles/ServiceCatalog.css"; 

function ServiceCatalog({ services, onOpenModal }) {

  if (!services || services.length === 0) {
    return <h3>Cargando servicios...</h3>;
  }

  return (
    <div className='catalog' id='service-catalog'>
      <div className='catalog-information'>
        <h3>Nuestros Servicios</h3>
        <p>Ofrecemos servicios especializados para equipos domésticos, industriales y comerciales.</p>
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