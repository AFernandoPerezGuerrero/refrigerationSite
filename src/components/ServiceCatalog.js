import React, { useState, useEffect } from 'react';
import ServiceItem from '../components/ServiceItem';
import "../styles/ServiceCatalog.css"; 

// 1. Acepta 'onOpenModal' como prop
function ServiceCatalog({ onOpenModal }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // El estado del modal fue ELIMINADO de aquí.

  useEffect(() => {
    const API_URL = 'http://localhost:5000/api/services';
    const fetchServices = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setServices(data); 
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Las funciones 'openModal' y 'closeModal' fueron ELIMINADAS de aquí.
  
  if (loading) {
    return <h3>Cargando servicios...</h3>;
  }

  return (
    <div className='catalog'>
      <div className='catalog-information'>
        <h3>Nuestros Servicios</h3>
        <p>Ofrecemos servicios especializados para equipos domésticos, industriales y comerciales.</p>
      </div>
      
      <div className="catalog-container">
        {services.map(service => (
          // 2. Pasa 'onOpenModal' a cada ServiceItem
          <ServiceItem 
            key={service.id} 
            service={service}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>

      {/* El JSX del Modal fue ELIMINADO de aquí. */}
    </div>
  );
}

export default ServiceCatalog;