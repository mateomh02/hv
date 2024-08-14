import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const getCurrentLang = () => {
    const pathLang = window.location.pathname.split('/')[1];
    return ['en', 'es'].includes(pathLang) ? pathLang : null; // Cambiar a null si no se detecta un idioma en el path
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'es', // Idioma predeterminado
        lng: getCurrentLang() || localStorage.getItem('i18nextLng') || 'es', // Revisar primero el localStorage
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'path', 'navigator'], // Prioriza localStorage sobre path
            caches: ['localStorage'], // Guarda el idioma en localStorage
        }
    });

export default i18n;
