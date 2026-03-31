import PropTypes from "prop-types";
import "./_styles/buttonGenericTooltip.css";

/**
 * ButtonGenericTooltip
 *
 * A custom-styled tooltip that appears above the button on
 * hover / focus.  Visibility is fully controlled by the
 * `visible` prop — no internal state.
 *
 * Theme-aware via --btn-tooltip-bg / --btn-tooltip-text
 * CSS variables defined in App.css.
 *
 * This component is internal to the 00_buttons directory and
 * is NOT exported through the barrel file.
 */
const ButtonGenericTooltip = ({ text, visible = false }) => {
  if (!text) return null;

  const className = [
    "buttonGenericTooltip",
    visible ? "buttonGenericTooltip-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={className} role="tooltip">
      {text}
    </span>
  );
};

ButtonGenericTooltip.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool,
};

export default ButtonGenericTooltip;
