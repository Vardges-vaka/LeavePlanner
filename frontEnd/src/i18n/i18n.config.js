import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { APP_NAME } from "../_CONFIGURATIONS/_config.index.js";

// -- English namespaces
import en_common from "./locales/en/common.json";
import en_headerPublic from "./locales/en/headerPublic.json";
import en_footerPublic from "./locales/en/footerPublic.json";
import en_home from "./locales/en/home.json";
import en_contact from "./locales/en/contact.json";
import en_faq from "./locales/en/faq.json";
import en_tnc from "./locales/en/tnc.json";
import en_privacy from "./locales/en/privacy.json";

// -- Arabic namespaces
import ar_common from "./locales/ar/common.json";
import ar_headerPublic from "./locales/ar/headerPublic.json";
import ar_footerPublic from "./locales/ar/footerPublic.json";
import ar_home from "./locales/ar/home.json";
import ar_contact from "./locales/ar/contact.json";
import ar_faq from "./locales/ar/faq.json";
import ar_tnc from "./locales/ar/tnc.json";
import ar_privacy from "./locales/ar/privacy.json";

// -- Hindi namespaces
import hi_common from "./locales/hi/common.json";
import hi_headerPublic from "./locales/hi/headerPublic.json";
import hi_footerPublic from "./locales/hi/footerPublic.json";
import hi_home from "./locales/hi/home.json";
import hi_contact from "./locales/hi/contact.json";
import hi_faq from "./locales/hi/faq.json";
import hi_tnc from "./locales/hi/tnc.json";
import hi_privacy from "./locales/hi/privacy.json";

// -- Russian namespaces
import ru_common from "./locales/ru/common.json";
import ru_headerPublic from "./locales/ru/headerPublic.json";
import ru_footerPublic from "./locales/ru/footerPublic.json";
import ru_home from "./locales/ru/home.json";
import ru_contact from "./locales/ru/contact.json";
import ru_faq from "./locales/ru/faq.json";
import ru_tnc from "./locales/ru/tnc.json";
import ru_privacy from "./locales/ru/privacy.json";

/**
 * @file i18n.config.js
 * @description Initialises the i18next instance with per-page namespaces.
 *
 * Namespaces: common, headerPublic, footerPublic, home, contact, faq, tnc, privacy
 * Languages:  en (default), ar (RTL), hi, ru
 *
 * Usage in components:
 *   const { t } = useTranslation("home");
 *   t("heroTitle") → "Simplify Employee Leave Management"
 *
 * @module i18n.config
 */

const NS = ["common", "headerPublic", "footerPublic", "home", "contact", "faq", "tnc", "privacy"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: en_common,
        headerPublic: en_headerPublic,
        footerPublic: en_footerPublic,
        home: en_home,
        contact: en_contact,
        faq: en_faq,
        tnc: en_tnc,
        privacy: en_privacy,
      },
      ar: {
        common: ar_common,
        headerPublic: ar_headerPublic,
        footerPublic: ar_footerPublic,
        home: ar_home,
        contact: ar_contact,
        faq: ar_faq,
        tnc: ar_tnc,
        privacy: ar_privacy,
      },
      hi: {
        common: hi_common,
        headerPublic: hi_headerPublic,
        footerPublic: hi_footerPublic,
        home: hi_home,
        contact: hi_contact,
        faq: hi_faq,
        tnc: hi_tnc,
        privacy: hi_privacy,
      },
      ru: {
        common: ru_common,
        headerPublic: ru_headerPublic,
        footerPublic: ru_footerPublic,
        home: ru_home,
        contact: ru_contact,
        faq: ru_faq,
        tnc: ru_tnc,
        privacy: ru_privacy,
      },
    },
    ns: NS,
    defaultNS: "common",
    fallbackLng: "en",
    supportedLngs: ["en", "ru", "hi", "ar"],
    nonExplicitSupportedLngs: true,

    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: `${APP_NAME.id}_lang`,
      cacheUserLanguage: true,
    },

    interpolation: {
      escapeValue: false,
    },
  });

const rtlLangs = ["ar"];
const dir = rtlLangs.includes(i18n.language) ? "rtl" : "ltr";
document.documentElement.setAttribute("dir", dir);

export default i18n;
