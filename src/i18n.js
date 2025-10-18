import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    // Use Spanish as the default language
    fallbackLng: 'es', 
    lng: 'es', 
    debug: false,
    
    interpolation: {
      escapeValue: false, 
    },

    backend: {
      // Path where translations are stored (relative to public directory)
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    // We only want the language code (e.g., 'es' or 'en')
    load: 'languageOnly' 
  });

export default i18n;