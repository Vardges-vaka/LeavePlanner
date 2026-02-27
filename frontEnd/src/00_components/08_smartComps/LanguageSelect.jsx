import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../_CONFIGURATIONS/_config.index.js";
import "./_styles/languageSelect.css";

/**
 * @file LanguageSelect.jsx
 * @description Custom accessible dropdown for switching the application
 * language.  Supported languages are defined in `_CONFIGURATIONS/_config.index`
 * as `LANGUAGES` — each entry carries a language code, labels, flag image, and
 * text direction.
 *
 * ## Behaviour
 * - The trigger button shows the active language's flag + native label.
 * - Clicking opens a `<ul role="listbox">` with all available languages.
 * - Selecting a different language calls `i18n.changeLanguage(code)` (which
 *   also writes to `localStorage` via `cacheUserLanguage`) then triggers
 *   `window.location.reload()` so the backend can serve translated data for
 *   the new locale.
 * - Selecting the already-active language closes the dropdown without reload.
 * - For Arabic (`ar`), `document.documentElement.dir` is set to `"rtl"` before
 *   reload; all other languages use `"ltr"`.
 *
 * ## Accessibility
 * - Trigger: `aria-haspopup="listbox"`, `aria-expanded`, `aria-label`.
 * - Options: `role="option"`, `aria-selected`, `tabIndex={0}`,
 *   keyboard-activatable via `Enter`.
 * - Closes on outside click and `Escape` key.
 *
 * @module LanguageSelect
 *
 *  * Language-selector dropdown.
 *
 * Reads the active language from the i18next instance and renders a flag +
 * native language name as the trigger.  On selection it reloads the page so
 * the entire app (including future backend responses) starts fresh in the
 * chosen locale.
 *
 * @component
 * @returns {JSX.Element}
 *
 * @example
 * ! Typically placed in a header next to ThemeToggler:
 * import LanguageSelect from "../08_smartComps/LanguageSelect";
 * <LanguageSelect />
 */

const LanguageSelect = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fall back to the first language if the stored/detected code is unknown
  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  // Close the dropdown when the user clicks anywhere outside the component
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Close the dropdown when the user presses Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  /**
   * Handles a language option click or Enter keypress.
   *
   * Flow:
   * 1. If the selected language is already active → close dropdown, no reload.
   * 2. Call `i18n.changeLanguage(code)`.
   *    - Resources are in-memory (imported JSON), so this is synchronous.
   *    - `cacheUserLanguage: true` in i18n.config writes the code to
   *      localStorage before the next line executes.
   * 3. Reload the page — fresh requests will carry the new locale.
   *
   * @param {{ code: string, dir: string }} lang - The selected language entry.
   */
  const handleSelect = useCallback(
    (lang) => {
      if (lang.code === i18n.language) {
        setIsOpen(false);
        return;
      }

      i18n.changeLanguage(lang.code);
      window.location.reload();
    },
    [i18n],
  );

  return (
    <div className="languageSelect" ref={dropdownRef}>
      <button
        className="languageSelect__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t("language.select")}
        tabIndex={0}>
        <img
          src={currentLang.flag}
          alt={currentLang.label}
          className="languageSelect__flag"
        />
        <span className="languageSelect__nativeLabel">
          {currentLang.nativeLabel}
        </span>
        <span
          className={`languageSelect__arrow ${
            isOpen ? "languageSelect__arrow--open" : ""
          }`}>
          ▾
        </span>
      </button>

      {isOpen && (
        <ul
          className="languageSelect__dropdown"
          role="listbox"
          aria-label={t("language.select")}>
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === currentLang.code;
            return (
              <li
                key={lang.code}
                className={`languageSelect__option ${
                  isActive ? "languageSelect__option--active" : ""
                }`}
                role="option"
                aria-selected={isActive}
                tabIndex={0}
                onClick={() => handleSelect(lang)}
                onKeyDown={(e) => e.key === "Enter" && handleSelect(lang)}>
                <img
                  src={lang.flag}
                  alt={lang.label}
                  className="languageSelect__flag"
                />
                <span className="languageSelect__nativeLabel">
                  {lang.nativeLabel}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelect;
