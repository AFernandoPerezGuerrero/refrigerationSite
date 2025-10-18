import React from "react";
import '../styles/Header.css'
import { IoIosMenu } from "react-icons/io";
import { useTranslation } from 'react-i18next';



function Header({ onOpenMenu }) {
    const { t, i18n } = useTranslation(); // ⬅️ Get i18n instance

    

    return (
    
        <div className='header'>
            <button className="menu-button" onClick={onOpenMenu} aria-label={t('header.open_menu_label')}>
            <IoIosMenu />
            </button>

            <a href="#" className='title'>
        <h2 className='coolfix'>{t('header.title_1')}</h2>
        <h2>{t('header.title_2')}</h2>
            </a>

            <div className='language-buttons'>

                <a className={`spanish-button ${i18n.language === 'es' ? 'active' : ''}`} 
                   onClick={() => changeLanguage('es')}>
                        ES
                        </a>
                <a className={`english-button ${i18n.language === 'en' ? 'active' : ''}`} 
                   onClick={() => changeLanguage('en')}>
                        EN
                        </a>
            </div>
        </div>
            
    )
}

export default Header;