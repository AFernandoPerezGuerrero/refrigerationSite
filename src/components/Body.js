import React from "react";
import '../styles/Body.css'
import { FaWhatsapp } from "react-icons/fa";

function Body() {
    return (
        <div className='main'>
            <div className='main-content'>
                <h1>Expertos en Reparación y Mantenimiento</h1>
                <p>En CoolFix Hogar e Industria somos expertos en 
                    reparación y mantenimiento de neveras, lavadoras,
                     secadoras, calentadores y equipos de refrigeración
                      industrial y comercial. Servicio rápido, confiable y garantizado.</p>
                <a className='whatsapp-button-main'><FaWhatsapp className="logo-main"/> <div>Contáctanos Ahora</div></a>

            </div>
        </div>
    )
}

export default Body;