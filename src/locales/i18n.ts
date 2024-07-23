import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
const getCurrentLang = () => {
    const pathLang = window.location.pathname.split('/')[1];
    return ['en', 'es'].includes(pathLang) ? pathLang : 'es';
  };

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'es',
        lng: getCurrentLang(),
        interpolation:{
            escapeValue: false
        },
        detection: {
            order: ['path', 'localStorage']
        }
    });

export default i18n;