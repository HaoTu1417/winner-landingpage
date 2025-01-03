'use client'; // Ensures this runs only on the client side

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import viTranslation from './public/locales/vi/translation.json';
import cnTranslation from './public/locales/cn/translation.json';

// Check if i18n has already been initialized to avoid reinitializing
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next) // Connects react-i18next to i18next
    .init({
      resources: {
        vi: { translation: viTranslation },
        cn: { translation: cnTranslation },
      },
      lng: 'vi', // Default language
      fallbackLng: 'vi',
      interpolation: {
        escapeValue: false, // React already handles escaping
      },
    });
}

export default i18n;
