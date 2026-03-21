import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Header_public, Footer_public } from "../../../00_components/_components.index.js";
import "./_styles/faq.css";

const FAQ = () => {
  const { t } = useTranslation("faq");
  const [openIndex, setOpenIndex] = useState(null);

  const items = t("items", { returnObjects: true });

  const toggle = useCallback((i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <div className="faq">
      <Header_public />

      <main className="faq_main">
        <h1 className="faq_title">{t("title")}</h1>
        <p className="faq_subtitle">{t("subtitle")}</p>

        <div className="faq_list">
          {Array.isArray(items) &&
            items.map((item, i) => (
              <div className="faq_item" key={i}>
                <button
                  className="faq_question"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  {item.q}
                  <span
                    className={`faq_chevron ${openIndex === i ? "faq_chevron--open" : ""}`}
                  >
                    ▼
                  </span>
                </button>
                {openIndex === i && (
                  <div className="faq_answer">{item.a}</div>
                )}
              </div>
            ))}
        </div>
      </main>

      <Footer_public />
    </div>
  );
};

export default FAQ;
