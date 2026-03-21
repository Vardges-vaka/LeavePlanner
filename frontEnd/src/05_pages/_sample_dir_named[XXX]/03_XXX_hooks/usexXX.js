import { useTranslation } from "react-i18next";
import { usexXX_states } from "./usexXX_states.js";
import { usexXX_handlers } from "./usexXX_handlers.js";
import { usexXX_apiHelpers } from "./usexXX_apiHelpers.js";

export const usexXX = () => {
  const { t } = useTranslation("xxx");
  const { states, setters } = usexXX_states();
  const { handlers } = usexXX_handlers(states, setters, t);
  const { apiHelpers } = usexXX_apiHelpers();

  const childProps = { states, handlers, apiHelpers };
  const compProps = { states, handlers, apiHelpers, childProps: childProps };

  return { states, handlers, apiHelpers, compProps, t };
};
