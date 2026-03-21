import "../_styles/infoSidebar.css";

const InfoSidebar = ({ t }) => {
  return (
    <aside className="contact_info">
      <h2 className="contact_infoTitle">{t("infoTitle")}</h2>

      <div className="contact_infoItem">
        <span className="contact_infoIcon">📧</span>
        <span className="contact_infoText">{t("infoEmail")}</span>
      </div>

      <div className="contact_infoItem">
        <span className="contact_infoIcon">📞</span>
        <span className="contact_infoText">{t("infoPhone")}</span>
      </div>

      <div className="contact_infoItem">
        <span className="contact_infoIcon">📍</span>
        <span className="contact_infoText">{t("infoAddress")}</span>
      </div>
    </aside>
  );
};

export default InfoSidebar;
