import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { logo_dark } from "../../../../_assets/_assets.index.js";
import "./_styles/footer_public.css";

const Footer_public = () => {
  const { t } = useTranslation("footerPublic");

  return (
    <footer className="footerPublic">
      <div className="footerPublic__inner">
        {/* Brand column */}
        <div className="footerPublic__brand">
          <img
            className="footerPublic__logo"
            src={logo_dark}
            alt="Leave Planner"
          />
          <p className="footerPublic__tagline">{t("tagline")}</p>
        </div>

        {/* Product links */}
        <div className="footerPublic__column">
          <span className="footerPublic__columnTitle">{t("product")}</span>
          <Link className="footerPublic__link" to="/">{t("home")}</Link>
          <Link className="footerPublic__link" to="/#features">{t("features")}</Link>
          <Link className="footerPublic__link" to="/faq">{t("faq")}</Link>
        </div>

        {/* Legal links */}
        <div className="footerPublic__column">
          <span className="footerPublic__columnTitle">{t("legal")}</span>
          <Link className="footerPublic__link" to="/tnc">{t("tnc")}</Link>
          <Link className="footerPublic__link" to="/privacy">{t("privacy")}</Link>
        </div>

        {/* Connect links */}
        <div className="footerPublic__column">
          <span className="footerPublic__columnTitle">{t("connect")}</span>
          <Link className="footerPublic__link" to="/contact">{t("contact")}</Link>
        </div>
      </div>

      <hr className="footerPublic__divider" />
      <p className="footerPublic__bottom">{t("copyright")}</p>
    </footer>
  );
};

export default Footer_public;
