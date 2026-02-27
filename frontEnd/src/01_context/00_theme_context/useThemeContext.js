import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

/**
 * @file useThemeContext.js
 * @description Custom hook that provides safe, ergonomic access to the
 * application theme context.  It wraps `useContext(ThemeContext)` and adds a
 * development-time guard so that misconfigured component trees produce a clear
 * error message instead of a silent `undefined`.
 *
 * @module useThemeContext
 *
 *  * Returns the current theme context value.
 *
 * Must be called inside a component that is a descendant of `ThemeProvider`.
 * Throws in development if the hook is used outside the provider tree.
 *
 * @returns {{ isDark: boolean, toggleTheme: Function }}
 *   - `isDark`      {boolean}  — `true` when the active theme is `"dark"`.
 *   - `toggleTheme` {Function} — Flips the theme and persists it to
 *                                `localStorage` + `<html data-theme>`.
 *
 * @throws {Error} If called outside a `ThemeProvider`.
 *
 * @example
 * import { useThemeContext } from "../01_context/00_theme_context/useThemeContext";
 *
 * const MyComponent = () => {
 *   const { isDark, toggleTheme } = useThemeContext();
 *   return <button onClick={toggleTheme}>{isDark ? "Go Light" : "Go Dark"}</button>;
 * };
 */

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("useThemeContext must be used inside a ThemeProvider");
  }

  return ctx;
};
