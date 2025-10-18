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
import { useTranslation } from 'react-i18next'; // ⬅️ NEW IMPORT


const validateForm = (formData, t) => {
    const errors = {};
    if (!formData.name.trim()) {
        errors.name = t("validation.name_required"); // Use translated key
    }
    if (!formData.email.trim()) {
        errors.email = t("validation.email_required"); // Use translated key
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = t("validation.email_invalid"); // Use translated key
    }
    if (formData.message.length < 10) {
        errors.message = t("validation.message_min_length"); // Use translated key
    }
    return errors;
};

function Contact({ setFormStatus, onOpenSocialsModal, contactMethods = [], onOpenContactModal }) {
    const { t } = useTranslation(); // ⬅️ Initialize hook
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
        
        const validationErrors = validateForm(formData, t);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setFormStatus(t("notification.sending"));
        try {
            const response = await fetch(`${API_BASE_URL}/api/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus(t("notifications.success"));
                setFormData({ name: "", email: "", message: "" });
            } else {
                setFormStatus(t("notifications.error_send_fail"));
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setFormStatus(t("notifications.error_network"));
        }
    };

    return (
        <div className='cards-container' id='contact-card'>
           <h3 className='contact-title'>{t('contact.title')}</h3>
            <p className='contact-subtitle-1'>{t('contact.subtitle_1')}</p>
            <p className='contact-subtitle-2'>{t('contact.subtitle_2')}</p>
            
            <div className='contact-card'>
                <h3>{t('contact.send_message_title')}</h3>
                <form className='contact-input-items' onSubmit={handleSubmit} noValidate>
                    <label htmlFor='name'>{t('contact.name_label')}</label>
                    <input 
                       type='text' 
                       id='name'
                       value={formData.name}
                       onChange={handleChange}
                       placeholder={t('contact.name_placeholder')}
                       className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <small className="error-message">{errors.name}</small>}

                    <label htmlFor='email'>{t('contact.email_label')}</label>
                    <input 
                       type='email' 
                       id='email'
                       value={formData.email}
                       onChange={handleChange}
                       placeholder={t('contact.email_placeholder')}
                       className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <small className="error-message">{errors.email}</small>}

                    <label htmlFor='message'>{t('contact.message_label')}</label>
                    <div className="char-counter-wrapper">
                        <textarea 
                          id="message" 
                          name="user_message" 
                          rows="6"
                          maxLength={maxLength}
                          value={formData.message} 
                          onChange={handleChange} 
                          placeholder={t('contact.message_placeholder')}
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
                        <div className="button-text">{t('contact.send_button')}</div>
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
                <h3 className="contact-methods-title">{t('contact.info_title')}</h3>
                
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
                        <h4>{t('method.social')}</h4>
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
                        <h3>{t('contact.office_title')}</h3>
                    </a>

                    <div className="office-hours-container" >
                        <div className="weekdays">
                            {/* ⬇️ Translate Days of the Week ⬇️ */}
                            <h4>{t('contact.weekdays_label')}</h4>
                            <h4>{t('contact.saturdays_label')}</h4>
                            <h4>{t('contact.sundays_label')}</h4>
                        </div>
                        <div className="operations-time">
                            {/* ⬇️ Translate Times (Time should be localized if necessary) ⬇️ */}
                            <h4>{t('contact.time_weekdays')}</h4>
                            <h4>{t('contact.time_saturdays')}</h4>
                            <h4>{t('contact.time_sundays')}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;