import { createContext, useState, useEffect } from "react";
import { THEMES, APP_NAME } from "../../_CONFIGURATIONS/_config.index.js";

/**
 * @file ThemeContext.jsx
 * @description React Context + Provider for the application-wide light/dark
 * theme.  The active theme is persisted to `localStorage` under the key
 * `{APP_NAME.id}_theme` so it survives page reloads.  It is also applied to
 * `<html data-theme="...">` so plain CSS variables in `App.css` (and any
 * other stylesheet) can react to it without JavaScript.
 *
 * Consumers should always access this context through the `useThemeContext`
 * hook, which includes a guard ensuring it is used inside a `ThemeProvider`.
 *
 * @module ThemeContext
 *
 * The raw React context object.
 * Do **not** consume this directly — use `useThemeContext()` instead.
 *
 * @type {React.Context<{isDark: boolean, toggleTheme: Function} | null>}
 *
 *  * Wraps the subtree that needs access to the theme.
 * Place this high in the component tree (e.g. directly inside `<Router>` in
 * `App.jsx`) so every page and component can reach it.
 *
 * @component
 *
 * @param {object}        props
 * @param {React.ReactNode} props.children - The component subtree to provide
 *                                          the theme context to.
 *
 * @provides {{ isDark: boolean, toggleTheme: Function }}
 *   - `isDark`      {boolean}  — `true` when the active theme is `"dark"`.
 *   - `toggleTheme` {Function} — Flips between `THEMES[0]` (light) and
 *                                `THEMES[1]` (dark).  Updates both
 *                                `localStorage` and `data-theme` on `<html>`.
 *
 * @example
 * // App.jsx
 * import { ThemeProvider } from "./01_context/_context.index";
 *
 * function App() {
 *   return (
 *     <Router>
 *       <ThemeProvider>
 *         <Routes>...</Routes>
 *       </ThemeProvider>
 *     </Router>
 *   );
 * }
 */

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(`${APP_NAME.id}_theme`);
    if (THEMES.includes(storedTheme)) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(`${APP_NAME.id}_theme`, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES[0] ? THEMES[1] : THEMES[0]));
  };

  const value = {
    isDark: theme === "dark",
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
