import React from "react";
import '../styles/Footer.css'
import { useTranslation } from 'react-i18next'; // ⬅️ NEW IMPORT


function Footer() {

    const { t } = useTranslation(); // ⬅️ Initialize hook

    return (
        <div>

            <div className="footer-styles">
                        
                <div className="footer-info-container">
                    <h2 className="footer-title">
                        <strong className="coolfix-footer">
                            {t("footer.coolfix")}
                            </strong>
                            {t("footer.hogar_industria")}
                    </h2>
                    <h3 className="footer-subtitle">{t("footer.subtitle")}</h3>
                </div>
                    <h3 className="footer-subtitle-2">{t("footer.copyright")}</h3>
            </div>
        </div>
    )
}

export default Footer;