import "./_styles/header_public.css";
import ThemeToggler from "../../../08_smartComps/ThemeToggler.jsx";
import LanguageSelect from "../../../08_smartComps/LanguageSelect.jsx";
// import { ThemeToggler, LanguageSelect } from "../../_smartComps.index.js";

const Header_public = () => {
  return (
    <div className="header_public">
      <aside className="header_public_aside left">Left</aside>
      <nav className="header_public_nav">Middle</nav>
      <aside className="header_public_aside right">
        <LanguageSelect />
        <ThemeToggler />
      </aside>
    </div>
  );
};

export default Header_public;
