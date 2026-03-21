import { Link } from "react-router-dom";
import "../_styles/cta_Banner.css";

const CTA_Banner = ({ t }) => {
  return (
    <section className="home_cta">
      <h2 className="home_ctaTitle">{t("ctaTitle")}</h2>
      <p className="home_ctaSubtitle">{t("ctaSubtitle")}</p>
      <Link className="home_ctaBtn" to="/contact">
        {t("ctaCta")}
      </Link>
    </section>
  );
};

export default CTA_Banner;
