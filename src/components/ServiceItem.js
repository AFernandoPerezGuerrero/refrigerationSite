import "../styles/ServiceItem.css"; 
import DynamicIcon from './DynamicIcon'; 


function ServiceItem({ title, description, imageUrl, iconLibrary, iconName, iconColor }) {
  return (
    <div className="service-card">
      <img src={imageUrl} 
      alt={title} 
      className='service-card-image'/>

        <div className='card-info'>
         
        <div className='item-title'>
        <DynamicIcon 
          library={iconLibrary} 
          name={iconName} 
          color={iconColor}
          size={30} // Puedes pasar props de react-icons
          className="service-icon" // Y clases de CSS 
        />
          <h3>{title}</h3>
        </div>

      <p>{description}</p>
      <a>Solicitar Servicio</a>
        </div>
    </div>
  );
}

export default ServiceItem;