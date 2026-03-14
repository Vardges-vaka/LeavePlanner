import { useTranslation } from "react-i18next";
import { Header_public, Footer_public } from "../../../00_components/_components.index.js";
import "./_styles/privacy.css";

const Privacy = () => {
  const { t } = useTranslation("privacy");
  const sections = t("sections", { returnObjects: true });

  return (
    <div className="privacy">
      <Header_public />

      <main className="privacy__main">
        <h1 className="privacy__title">{t("title")}</h1>
        <p className="privacy__date">{t("lastUpdated")}</p>
        <p className="privacy__intro">{t("intro")}</p>

        {Array.isArray(sections) &&
          sections.map((sec, i) => (
            <section className="privacy__section" key={i}>
              <h2 className="privacy__sectionTitle">{sec.title}</h2>
              <p className="privacy__sectionText">{sec.text}</p>
            </section>
          ))}
      </main>

      <Footer_public />
    </div>
  );
};

export default Privacy;
