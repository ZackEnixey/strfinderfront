import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./translations/en.json";
import es from "./translations/es.json";
import fr from "./translations/fr.json";
import it from "./translations/it.json";
import de from "./translations/de.json";
import sr from "./translations/sr.json";
import ar from "./translations/ar.json";
import ru from "./translations/ru.json";
import he from "./translations/he.json";
import zh from "./translations/zh.json";
import ja from "./translations/ja.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  it: { translation: it },
  de: { translation: de },
  sr: { translation: sr },
  ar: { translation: ar },
  ru: { translation: ru },
  he: { translation: he },
  zh: { translation: zh },
  ja: { translation: ja }
};

export const availableLanguages = Object.keys(resources);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: resources
  });

export default i18n;