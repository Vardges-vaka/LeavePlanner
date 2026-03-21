import { useTranslation } from "react-i18next";
import { Header_public, Footer_public } from "../../../00_components/_components.index.js";
import "./_styles/tnc.css";

const TnC = () => {
  const { t } = useTranslation("tnc");
  const sections = t("sections", { returnObjects: true });

  return (
    <div className="tnc">
      <Header_public />

      <main className="tnc_main">
        <h1 className="tnc_title">{t("title")}</h1>
        <p className="tnc_date">{t("lastUpdated")}</p>
        <p className="tnc_intro">{t("intro")}</p>

        {Array.isArray(sections) &&
          sections.map((sec, i) => (
            <section className="tnc_section" key={i}>
              <h2 className="tnc_sectionTitle">{sec.title}</h2>
              <p className="tnc_sectionText">{sec.text}</p>
            </section>
          ))}
      </main>

      <Footer_public />
    </div>
  );
};

export default TnC;
