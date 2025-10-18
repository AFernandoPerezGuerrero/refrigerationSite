import React from "react";
import '../styles/Body.css'
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from 'react-i18next'; // ⬅️ NEW IMPORT


function Body() {
    const { t } = useTranslation(); // ⬅️ Initialize hook
    return (
        <div className='main'>
            <div className='main-content'>
                <h1>{t("body.heading")}</h1>
                <p>{t("body.paragraph")}</p>
                <a  className='whatsapp-button-main'
                    href="https://wa.me/3018520511"
                    target="_blank">
                        <FaWhatsapp className="logo-main"/>
                        <div>{t('body.contact_button')}</div>
                </a>

            </div>
        </div>
    )
}

export default Body;