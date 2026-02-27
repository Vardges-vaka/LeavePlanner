import "./_styles/themeToggler.css";
import { useThemeContext } from "../../01_context/00_theme_context/useThemeContext";
import { Day_Night_Toggle_02 } from "../06_togglers/_togglers.index";

const ThemeToggler = () => {
  const { isDark, toggleTheme } = useThemeContext();
  return <Day_Night_Toggle_02 isDark={isDark} onClick={toggleTheme} size="S" />;
};

export default ThemeToggler;
