import { useTranslation } from "react-i18next";
import { Header_public, Footer_public } from "../../../00_components/_components.index.js";
import "./_styles/tnc.css";

const TnC = () => {
  const { t } = useTranslation("tnc");
  const sections = t("sections", { returnObjects: true });

  return (
    <div className="tnc">
      <Header_public />

      <main className="tnc__main">
        <h1 className="tnc__title">{t("title")}</h1>
        <p className="tnc__date">{t("lastUpdated")}</p>
        <p className="tnc__intro">{t("intro")}</p>

        {Array.isArray(sections) &&
          sections.map((sec, i) => (
            <section className="tnc__section" key={i}>
              <h2 className="tnc__sectionTitle">{sec.title}</h2>
              <p className="tnc__sectionText">{sec.text}</p>
            </section>
          ))}
      </main>

      <Footer_public />
    </div>
  );
};

export default TnC;
