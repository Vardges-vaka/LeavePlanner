import { usexXX } from "./03_XXX_hooks/_XXX_hooks.index.js";
import { XXX_component } from "./01_XXX_comps/_XXX_comps.index.js";
import "./_styles/xXX.css";

const XxX = () => {
  const { states, handlers, apiHelpers, t, compProps } = usexXX();
  return (
    <div className="xXX">
      <XXX_component
        states={compProps.states}
        handlers={compProps.handlers}
        apiHelpers={compProps.apiHelpers}
        t={t}
        childProps={compProps.childProps}
      />
    </div>
  );
};

export default XxX;
