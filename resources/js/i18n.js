import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import jaTranslations from './locales/ja.json';
// import enTranslations from './locales/en.json'; // 英語も必要な場合

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ja: { translation: jaTranslations },
      // en: { translation: enTranslations }, // 英語も必要な場合
    },
    lng: 'ja', // デフォルト言語を日本語に設定
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;