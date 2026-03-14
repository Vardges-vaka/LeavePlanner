import i18next from "i18next";
import Backend from "i18next-fs-backend";
import i18nMiddleware from "i18next-http-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18next
  .use(Backend)
  .use(i18nMiddleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "ar", "hi", "ru"],
    preload: ["en", "ar", "hi", "ru"],
    ns: ["translation"],
    defaultNS: "translation",

    backend: {
      loadPath: path.join(__dirname, "locales/{{lng}}/{{ns}}.json"),
    },

    detection: {
      order: ["header", "querystring", "cookie"],
      lookupHeader: "accept-language",
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
