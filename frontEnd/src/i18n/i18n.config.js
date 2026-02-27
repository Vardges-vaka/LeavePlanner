import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { APP_NAME } from "../_CONFIGURATIONS/_config.index.js";
import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";
import hi from "./locales/hi/translation.json";
import ar from "./locales/ar/translation.json";

/**
 * @file i18n.config.js
 * @description Initialises the i18next instance used throughout the app.
 *
 * ## Supported languages
 * | Code | Language | Script    | Direction |
 * |------|----------|-----------|-----------|
 * | en   | English  | Latin     | LTR       |
 * | ru   | Russian  | Cyrillic  | LTR       |
 * | hi   | Hindi    | Devanagari| LTR       |
 * | ar   | Arabic   | Arabic    | RTL       |
 *
 * ## Language detection order
 * 1. `localStorage["{APP_NAME.id}_lang"]` — user's explicit past choice.
 * 2. `navigator.language` (browser setting, e.g. `"en-US"`, `"ru-RU"`).
 *    `nonExplicitSupportedLngs: true` trims region tags so `"en-US"` matches
 *    our supported `"en"`, etc.
 * 3. `fallbackLng: "en"` — used when no match is found (e.g. browser is set
 *    to Japanese).
 *
 * ## Language switching & persistence
 * Language changes are triggered by `LanguageSelect` via
 * `i18n.changeLanguage(code)`.  Because resources are bundled as imported
 * JSON (no HTTP backend), `changeLanguage` is **synchronous** — by the time
 * the next line runs, `cacheUserLanguage` has already written the new code to
 * `localStorage`.  The component then calls `window.location.reload()` so the
 * backend can serve translated content for the new locale on the fresh request.
 *
 * ## RTL support
 * After init, the file reads `i18n.language` and sets `dir` on
 * `<html>` so Arabic flips the layout immediately, before React renders.
 *
 * @module i18n.config
 */

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      hi: { translation: hi },
      ar: { translation: ar },
    },
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
