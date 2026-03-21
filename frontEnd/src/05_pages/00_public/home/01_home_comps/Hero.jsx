import { Link } from "react-router-dom";
import "../_styles/hero.css";

const Hero = ({ t }) => {
  return (
    <section className="home_hero">
      <h1 className="home_heroTitle">{t("heroTitle")}</h1>
      <p className="home_heroSubtitle">{t("heroSubtitle")}</p>
      <Link className="home_heroCta" to="/contact">
        {t("heroCta")}
      </Link>
    </section>
  );
};

export default Hero;
