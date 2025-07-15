import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import uk from './locales/uk/translation.json';
import fr from './locales/fr/translation.json';
import es from './locales/es/translation.json';
import pl from './locales/pl/translation.json';

const savedLang = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      uk: { translation: uk },
      fr: { translation: fr },
      es: { translation: es },
      pl: { translation: pl },
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;