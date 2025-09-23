import React, { useState } from "react";
import '../styles/Contact.css';
import { BsSend  } from "react-icons/bs";


function Contact() {
const [message, setMessage] = useState("");
    const maxLength = 500;

const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <div className='cards-container'>
            <h3 claclassNamess='contact-title'>Contáctanos</h3>
            <p className='contact-subtitle-1'>Estamos listos para ayudarte.</p>
            <p className='contact-subtitle-2'>Contáctanos por cualquiera de estos medios:</p>
            
            <div className='contact-card'>
                <h3>Envíanos un mensaje</h3>

            <form className='contact-input-items'>
                <label id='name'>Nombre *</label>

                <input type='text' 
                       id='name'
                       minLength={1}
                       maxLength={80}
                       placeholder="Nombre..."></input>

                <label id='email'>Correo Electrónico *</label>
                <input type='email' 
                       id='email'
                       maxLength={254}
                       minLength={5}
                        
                       placeholder="correo@ejemplo.com"></input>

                <label id='message'>Mensaje *</label>
                <div className="char-counter-wrapper">
                <textarea id="message" 
                          name="user_message" 
                          rows="6"
                          cols="50"
                          maxLength={500}
                          minLength={1}
                          value={message}                 
                          onChange={handleMessageChange} 
                          placeholder="Escribe tu mensaje y nos contactaremos contigo lo más pronto posible."></textarea>
                
                <small id="char-counter" 
                          className={message.length >= maxLength ? 'limit-reached' : ''}>
                          {message.length}/{maxLength}
                </small>
                </div>

                <a className='send-message-button'>
                    <BsSend className='icon-send'/>
                    <div className="button-text">Enviar Mensaje</div>
                </a>

            </form>

            </div>
            <div className="contact-methods">
             <h3 className="contact-methods-title">Información de Contacto</h3>
                <div className='contact-method'>
                    <h2></h2>
                </div>
                <div className='contact-method'>
                    <h2></h2>
                </div>
                <div className='contact-method'>
                    <h2></h2>
                </div>

            </div>
        </div>
    )
}

export default Contact;