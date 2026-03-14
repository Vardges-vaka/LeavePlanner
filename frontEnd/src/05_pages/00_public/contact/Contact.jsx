import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Header_public, Footer_public } from "../../../00_components/_components.index.js";
import "./_styles/contact.css";

const Contact = () => {
  const { t } = useTranslation("contact");
  const { t: tc } = useTranslation("common");

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSending(true);
      // Placeholder — no backend endpoint yet
      await new Promise((r) => setTimeout(r, 800));
      setSending(false);
      setSubmitted(true);
    },
    [],
  );

  return (
    <div className="contact">
      <Header_public />

      <main className="contact__main">
        <h1 className="contact__title">{t("title")}</h1>
        <p className="contact__subtitle">{t("subtitle")}</p>

        <div className="contact__grid">
          {/* Form */}
          <form className="contact__form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="contact__success">{t("successMessage")}</div>
            ) : (
              <>
                <div className="contact__field">
                  <label className="contact__label">{t("nameLabel")}</label>
                  <input
                    className="contact__input"
                    type="text"
                    placeholder={t("namePlaceholder")}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                  />
                </div>

                <div className="contact__field">
                  <label className="contact__label">{t("emailLabel")}</label>
                  <input
                    className="contact__input"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                  />
                </div>

                <div className="contact__field">
                  <label className="contact__label">{t("companyLabel")}</label>
                  <input
                    className="contact__input"
                    type="text"
                    placeholder={t("companyPlaceholder")}
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                  />
                </div>

                <div className="contact__field">
                  <label className="contact__label">{t("messageLabel")}</label>
                  <textarea
                    className="contact__textarea"
                    placeholder={t("messagePlaceholder")}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    required
                  />
                </div>

                <button
                  className="contact__submitBtn"
                  type="submit"
                  disabled={sending}
                >
                  {sending ? tc("sending") : tc("send")}
                </button>
              </>
            )}
          </form>

          {/* Info sidebar */}
          <aside className="contact__info">
            <h2 className="contact__infoTitle">{t("infoTitle")}</h2>

            <div className="contact__infoItem">
              <span className="contact__infoIcon">📧</span>
              <span className="contact__infoText">{t("infoEmail")}</span>
            </div>

            <div className="contact__infoItem">
              <span className="contact__infoIcon">📞</span>
              <span className="contact__infoText">{t("infoPhone")}</span>
            </div>

            <div className="contact__infoItem">
              <span className="contact__infoIcon">📍</span>
              <span className="contact__infoText">{t("infoAddress")}</span>
            </div>
          </aside>
        </div>
      </main>

      <Footer_public />
    </div>
  );
};

export default Contact;
