import { XXX_childComponent } from "./XXX_childComps/_XXX_childComps.index.js";
import "./_styles/xXX_component.css";

const XXX_component = ({ states, handlers, apiHelpers, t, childProps }) => {
  return (
    <div>
      <XXX_childComponent
        states={states}
        handlers={handlers}
        apiHelpers={apiHelpers}
        t={t}
      />
    </div>
  );
};

export default XXX_component;
