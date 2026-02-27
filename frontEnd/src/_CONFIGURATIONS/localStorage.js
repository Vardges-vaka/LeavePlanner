import {
  British_flag,
  Russian_flag,
  India_flag,
  Saudi_flag,
} from "../_assets/_assets.index.js";

const LANGUAGES = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    flag: British_flag,
    dir: "ltr",
  },
  {
    code: "ru",
    label: "Russian",
    nativeLabel: "Русский",
    flag: Russian_flag,
    dir: "ltr",
  },
  {
    code: "hi",
    label: "Hindi",
    nativeLabel: "हिन्दी",
    flag: India_flag,
    dir: "ltr",
  },
  {
    code: "ar",
    label: "Arabic",
    nativeLabel: "عربي",
    flag: Saudi_flag,
    dir: "rtl",
  },
];

const THEMES = ["light", "dark"];

export { LANGUAGES, THEMES };
