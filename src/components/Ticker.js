import React from 'react';
import '../styles/Ticker.css';
import { useTranslation } from 'react-i18next';

function Ticker({ onOpenNewsletterModal }) {
      const { t } = useTranslation(); // ⬅️ Initialize hook

  return (
    <div className="ticker-wrap">
      <div className="ticker">
        <button className="ticker-item-button" onClick={onOpenNewsletterModal}>
          {t("ticker.item_button")}
        </button>
        <a href='#office-hours'><div className="ticker-item">{t("ticker.item_hours")}</div></a>
        <a href='#service-catalog'><div className="ticker-item">{t("ticker.item_services")}</div></a>
        
        <button className="ticker-item-button" onClick={onOpenNewsletterModal}>
          {t("ticker.item_button")}
        </button>
        <a href='#office-hours'><div className="ticker-item">{t("ticker.item_hours")}</div></a>
        <a href='#service-catalog'><div className="ticker-item">{t("ticker.item_services")}</div></a>
        
      </div>
    </div>
  );
}

export default Ticker;