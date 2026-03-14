import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Header_public, Footer_public } from "../../../00_components/_components.index.js";
import "./_styles/home.css";

const FEATURE_ICONS = ["📋", "📊", "📅", "🔔", "⚡", "📈"];

const Home = () => {
  const { t } = useTranslation("home");

  const features = Array.from({ length: 6 }, (_, i) => ({
    icon: FEATURE_ICONS[i],
    title: t(`feature${i + 1}Title`),
    desc: t(`feature${i + 1}Desc`),
  }));

  const steps = Array.from({ length: 3 }, (_, i) => ({
    title: t(`how${i + 1}Title`),
    desc: t(`how${i + 1}Desc`),
  }));

  return (
    <div className="home">
      <Header_public />

      {/* Hero */}
      <section className="home__hero">
        <h1 className="home__heroTitle">{t("heroTitle")}</h1>
        <p className="home__heroSubtitle">{t("heroSubtitle")}</p>
        <Link className="home__heroCta" to="/contact">
          {t("heroCta")}
        </Link>
      </section>

      {/* Features */}
      <section className="home__features" id="features">
        <h2 className="home__sectionTitle">{t("featuresTitle")}</h2>
        <p className="home__sectionSubtitle">{t("featuresSubtitle")}</p>
        <div className="home__featuresGrid">
          {features.map((f, i) => (
            <div className="home__featureCard" key={i}>
              <div className="home__featureIcon">{f.icon}</div>
              <h3 className="home__featureTitle">{f.title}</h3>
              <p className="home__featureDesc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="home__how">
        <div className="home__howInner">
          <h2 className="home__sectionTitle">{t("howTitle")}</h2>
          <p className="home__sectionSubtitle">{t("howSubtitle")}</p>
          <div className="home__howSteps">
            {steps.map((s, i) => (
              <div className="home__howStep" key={i}>
                <div className="home__howNumber">{i + 1}</div>
                <h3 className="home__howStepTitle">{s.title}</h3>
                <p className="home__howStepDesc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="home__cta">
        <h2 className="home__ctaTitle">{t("ctaTitle")}</h2>
        <p className="home__ctaSubtitle">{t("ctaSubtitle")}</p>
        <Link className="home__ctaBtn" to="/contact">
          {t("ctaCta")}
        </Link>
      </section>

      <Footer_public />
    </div>
  );
};

export default Home;
