import React, { useState } from "react";
import '../styles/Contact.css';
import { BsSend } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import { MdShare } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

const validateForm = (formData) => {
    const errors = {};
    if (!formData.name.trim()) {
        errors.name = "El nombre es obligatorio.";
    }
    if (!formData.email.trim()) {
        errors.email = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "El formato del correo no es válido.";
    }
    if (formData.message.length < 10) {
        errors.message = "El mensaje debe tener al menos 10 caracteres.";
    }
    return errors;
};

function Contact({ setFormStatus, onOpenSocialsModal, contactMethods = [], onOpenContactModal }) {

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const maxLength = 500;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setFormStatus("Enviando...");
        try {
            const response = await fetch(`${API_BASE_URL}/api/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus("¡Mensaje enviado con éxito!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setFormStatus("Error: No se pudo enviar el mensaje.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setFormStatus("Error de red. Intenta de nuevo.");
        }
    };

    return (
        <div className='cards-container' id='contact-card'>
            <h3 className='contact-title'>Contáctanos</h3>
            <p className='contact-subtitle-1'>Estamos listos para ayudarte.</p>
            <p className='contact-subtitle-2'>Contáctanos por cualquiera de estos medios:</p>
            
            <div className='contact-card'>
                <h3>Envíanos un mensaje</h3>
                <form className='contact-input-items' onSubmit={handleSubmit} noValidate>
                    <label htmlFor='name'>Nombre *</label>
                    <input 
                       type='text' 
                       id='name'
                       value={formData.name}
                       onChange={handleChange}
                       placeholder="Nombre..."
                       className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <small className="error-message">{errors.name}</small>}

                    <label htmlFor='email'>Correo Electrónico *</label>
                    <input 
                       type='email' 
                       id='email'
                       value={formData.email}
                       onChange={handleChange}
                       placeholder="correo@ejemplo.com"
                       className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <small className="error-message">{errors.email}</small>}

                    <label htmlFor='message'>Mensaje *</label>
                    <div className="char-counter-wrapper">
                        <textarea 
                          id="message" 
                          name="user_message" 
                          rows="6"
                          maxLength={maxLength}
                          value={formData.message} 
                          onChange={handleChange} 
                          placeholder="Escribe tu mensaje y nos contactaremos lo más pronto posible."
                          className={errors.message ? 'input-error' : ''}
                        />
                        <small 
                          id="char-counter" 
                          className={formData.message.length >= maxLength ? 'limit-reached' : ''}
                        >
                          {formData.message.length}/{maxLength}
                        </small>
                    </div>
                    {errors.message && <small className="error-message">{errors.message}</small>}

                    <button className='send-message-button' type="submit">
                        <BsSend className='icon-send'/>
                        <div className="button-text">Enviar Mensaje</div>
                    </button>
                </form>
            </div>

            <div className="contact-methods">
                
                <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1 }}>
                    <defs>
                        <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f09433" />
                            <stop offset="50%" stopColor="#dc2743" />
                            <stop offset="100%" stopColor="#bc1888" />
                        </linearGradient>
                    </defs>
                </svg>
                <h3 className="contact-methods-title">Información de Contacto</h3>
                
                 {contactMethods.map(method => (
                <div 
                    key={method.id}
                    className='contact-method' 
                    id={`contact-method-${method.id}`}
                    onClick={() => onOpenContactModal(method)}
                >
                <div className={method.id} id="icon">{method.icon}</div>
                <div className="contact-info">
                <h4>{method.title}</h4>
                <span>{method.info}</span>
            </div>
          </div>
        ))}

                <div className='contact-method' 
                id="contact-method-social" 
                onClick={onOpenSocialsModal}>
                    <a className="social" id="icon">
                    <MdShare />
                    </a>
                    <div className="contact-info">
                        <h4>Redes Sociales</h4>
                        <a className="social-icons">
                            <FaFacebook className='facebook-icon' />
                            <span className="instagram-gradient-icon">
                            <FaInstagram/>
                            </span>

                        </a>
                    </div>
                </div>
                    
                <div className="contact-method office-hours" id="office-hours">
                    <a className="office-hours-title">
                        <FaRegClock className="office-hours-icon" />
                        <h3>Horarios de Atención</h3>
                    </a>

                    <div className="office-hours-container" >
                        <div className="weekdays">
                            <h4>Lunes - Viernes:</h4>
                            <h4>Sábados:</h4>
                            <h4>Domingos:</h4>
                        </div>
                        <div className="operations-time">
                            <h4>8:00 AM - 6:00 PM</h4>
                            <h4>8:00 AM - 6:00 PM</h4>
                            <h4>Emergencias</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;