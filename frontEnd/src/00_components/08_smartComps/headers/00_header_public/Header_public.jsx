import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { logo_light } from "../../../../_assets/_assets.index.js";
import ThemeToggler from "../../../08_smartComps/ThemeToggler.jsx";
import LanguageSelect from "../../../08_smartComps/LanguageSelect.jsx";
import "./_styles/header_public.css";

const Header_public = () => {
  const { t } = useTranslation("headerPublic");

  return (
    <header className="headerPublic">
      {/* Brand / Logo */}
      <Link to="/" className="headerPublic__brand">
        <img
          className="headerPublic__logo"
          src={logo_light}
          alt="Leave Planner"
        />
      </Link>

      {/* Navigation */}
      <nav className="headerPublic__nav">
        <Link className="headerPublic__navLink" to="/">
          {t("home")}
        </Link>
        <a className="headerPublic__navLink" href="/#features">
          {t("features")}
        </a>
        <Link className="headerPublic__navLink" to="/faq">
          {t("faq")}
        </Link>
        <Link className="headerPublic__navLink" to="/contact">
          {t("contact")}
        </Link>
      </nav>

      {/* Right-side actions */}
      <div className="headerPublic__actions">
        <LanguageSelect />
        <ThemeToggler />
        <Link className="headerPublic__loginBtn" to="/t">
          {t("login")}
        </Link>
        <Link className="headerPublic__ctaBtn" to="/contact">
          {t("requestAccess")}
        </Link>
      </div>
    </header>
  );
};

export default Header_public;
