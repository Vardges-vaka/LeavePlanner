import { useContactForm } from "./03_contact_hooks/_contact_hooks.index.js";
import {
  Header_public,
  Footer_public,
} from "../../../00_components/_components.index.js";
import {
  ContactForm,
  InfoSidebar,
} from "./01_contact_comps/_contact_comps.index.js";
import "./_styles/contact.css";

const Contact = () => {
  const { states, handlers, t, tc } = useContactForm();

  return (
    <div className="contact">
      <Header_public />

      <main className="contact_main">
        <h1 className="contact_title">{t("title")}</h1>
        <p className="contact_subtitle">{t("subtitle")}</p>

        <div className="contact_grid">
          <ContactForm states={states} handlers={handlers} t={t} tc={tc} />
          <InfoSidebar t={t} />
        </div>
      </main>

      <Footer_public />
    </div>
  );
};

export default Contact;
