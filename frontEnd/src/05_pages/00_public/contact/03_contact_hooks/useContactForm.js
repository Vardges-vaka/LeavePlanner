import { useTranslation } from "react-i18next";
import { useContactForm_states } from "./useContactForm_states.js";
import { useContactForm_handlers } from "./useContactForm_handlers.js";
import { useContactForm_apiHelpers } from "./useContactForm_apiHelpers.js";

export const useContactForm = () => {
  const { t } = useTranslation("contact");
  const { t: tc } = useTranslation("common");
  const { states, setters } = useContactForm_states();
  const { apiHelpers } = useContactForm_apiHelpers(states, setters);
  const { handlers } = useContactForm_handlers(states, setters);

  return {
    states,
    handlers,
    t,
    tc,
  };
};
