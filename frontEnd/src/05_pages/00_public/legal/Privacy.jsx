import { useTranslation } from "react-i18next";
import { Header_public, Footer_public } from "../../../00_components/_components.index.js";
import "./_styles/privacy.css";

const Privacy = () => {
  const { t } = useTranslation("privacy");
  const sections = t("sections", { returnObjects: true });

  return (
    <div className="privacy">
      <Header_public />

      <main className="privacy_main">
        <h1 className="privacy_title">{t("title")}</h1>
        <p className="privacy_date">{t("lastUpdated")}</p>
        <p className="privacy_intro">{t("intro")}</p>

        {Array.isArray(sections) &&
          sections.map((sec, i) => (
            <section className="privacy_section" key={i}>
              <h2 className="privacy_sectionTitle">{sec.title}</h2>
              <p className="privacy_sectionText">{sec.text}</p>
            </section>
          ))}
      </main>

      <Footer_public />
    </div>
  );
};

export default Privacy;
