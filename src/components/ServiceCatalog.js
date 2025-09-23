import React, { useState, useEffect } from 'react';
import ServiceItem from '../components/ServiceItem';
import "../styles/ServiceCatalog.css"; 

function ServiceCatalog() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Esta es la URL de tu backend
    const API_URL = 'http://localhost:5000/api/services';

    const fetchServices = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // 'data' es el array de objetos que viene de tu base de datos
        // ¡Ahora los tienes como "objetos" o "variables" en React!
        setServices(data); 
        
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []); // El array vacío [] significa que esto se ejecuta solo una vez

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
        // Aquí usas tu componente de item individual
        // y le pasas la información como props
        <ServiceItem 
          key={service.id} 
          title={service.name} 
          description={service.description}
          imageUrl={service.image_url}
          iconLibrary={service.icon_library}
          iconName={service.icon_name}
          iconColor={service.icon_color}
          className = 'service-item'
        />
        
      ))}
    </div>
  </div>
  );
}

export default ServiceCatalog;