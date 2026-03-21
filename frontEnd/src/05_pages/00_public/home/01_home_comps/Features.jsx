import { getFeatures } from "../02_home_helpers/_home_helpers.index.js";
import "../_styles/features.css";

const Features = ({ t }) => {
  const features = getFeatures(t);
  return (
    <section className="home_features" id="features">
      <h2 className="home_sectionTitle">{t("featuresTitle")}</h2>
      <p className="home_sectionSubtitle">{t("featuresSubtitle")}</p>
      <div className="home_featuresGrid">
        {features.map((f, i) => (
          <div className="home_featureCard" key={i}>
            <div className="home_featureIcon">{f.icon}</div>
            <h3 className="home_featureTitle">{f.title}</h3>
            <p className="home_featureDesc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
