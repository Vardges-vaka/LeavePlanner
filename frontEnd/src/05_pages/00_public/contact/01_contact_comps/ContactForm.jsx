import "../_styles/contactForm.css";

const Contact = ({ states, handlers, t, tc }) => {
  return (
    <form className="contact_form" onSubmit={handlers.handleSubmit}>
      {states.submitted ? (
        <div className="contact_success">{t("successMessage")}</div>
      ) : (
        <>
          <div className="contact_field">
            <label className="contact_label">{t("nameLabel")}</label>
            <input
              className="contact_input"
              type="text"
              placeholder={t("namePlaceholder")}
              value={states.form.name}
              onChange={(e) => handlers.handlesUpdate("name", e.target.value)}
              required
            />
          </div>

          <div className="contact_field">
            <label className="contact_label">{t("emailLabel")}</label>
            <input
              className="contact_input"
              type="email"
              placeholder={t("emailPlaceholder")}
              value={states.form.email}
              onChange={(e) => handlers.handlesUpdate("email", e.target.value)}
              required
            />
          </div>

          <div className="contact_field">
            <label className="contact_label">{t("companyLabel")}</label>
            <input
              className="contact_input"
              type="text"
              placeholder={t("companyPlaceholder")}
              value={states.form.company}
              onChange={(e) =>
                handlers.handlesUpdate("company", e.target.value)
              }
            />
          </div>

          <div className="contact_field">
            <label className="contact_label">{t("messageLabel")}</label>
            <textarea
              className="contact_textarea"
              placeholder={t("messagePlaceholder")}
              value={states.form.message}
              onChange={(e) =>
                handlers.handlesUpdate("message", e.target.value)
              }
              required
            />
          </div>

          <button
            className="contact_submitBtn"
            type="submit"
            disabled={states.sending}>
            {states.sending ? tc("sending") : tc("send")}
          </button>
        </>
      )}
    </form>
  );
};

export default Contact;
