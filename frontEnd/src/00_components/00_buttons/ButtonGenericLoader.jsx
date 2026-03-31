import PropTypes from "prop-types";
import "./_styles/buttonGenericLoader.css";

/**
 * ButtonGenericLoader
 *
 * A spinning ring indicator rendered inside ButtonGeneric during
 * its loading state.  Size and color adapt to the parent button's
 * `size` and `version` props via CSS modifier classes.
 *
 * This component is internal to the 00_buttons directory and
 * is NOT exported through the barrel file.
 */
const ButtonGenericLoader = ({ size = "m", version = "normal" }) => {
  const className = [
    "buttonGenericLoader",
    `buttonGenericLoader-${version}`,
    `buttonGenericLoader-${size}`,
  ].join(" ");

  return (
    <span
      className={className}
      role="status"
      aria-label="Loading"
    />
  );
};

ButtonGenericLoader.propTypes = {
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl", "xxl"]),
  version: PropTypes.oneOf(["primary", "secondary", "normal"]),
};

export default ButtonGenericLoader;
