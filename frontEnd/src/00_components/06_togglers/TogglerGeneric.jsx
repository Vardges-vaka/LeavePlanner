import { forwardRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import "./_styles/togglerGeneric.css";

// Helper: Extracts data-* attributes from props object
const extractDataAttrs = (allProps) => {
  const attrs = {};
  for (const key in allProps) {
    if (key.startsWith("data_")) {
      attrs[key.replace("data_", "data-")] = allProps[key];
    }
  }
  return attrs;
};

/**
 * TogglerGeneric - A customizable switch component.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} [props.label] - Label configuration
 * @param {string} [props.label.text] - Label text content
 * @param {string} [props.label.position="top-left"] - Label position
 * @param {string} [props.label.classname] - Custom CSS class for label
 * @param {Function|boolean} [props.label.onClick] - Label click handler
 * @param {Function|boolean} [props.label.onHover] - Label hover handler
 * @param {string} [props.label.title] - Label tooltip text
 *
 * @param {string} [props.size="m"] - Size: "xs", "s", "m", "l", "xl", "xxl"
 * @param {string} [props.shape="oval"] - Shape: "oval", "rectangular"
 * @param {string} [props.validation] - Validation state: "error", "success", "warning"
 * @param {boolean} [props.fullWidth=false] - Expand to 100% width
 * @param {Object} [props.colors] - Custom colors overriding defaults
 * @param {string} [props.colors.bg] - Background color of the track
 * @param {string} [props.colors.txt] - Color of the text
 * @param {string} [props.colors.icon] - Color of the icons
 * @param {Object} [props.innerContent] - Content to show on the track
 * @param {Object|string|React.Node} [props.innerContent.on] - Content when checked
 * @param {Object|string|React.Node} [props.innerContent.off] - Content when unchecked
 *
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.checked] - Controlled checked state
 * @param {boolean} [props.defaultChecked=false] - Uncontrolled default checked state
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.id] - Input ID
 * @param {string} [props.name] - Input name
 * @param {string} [props.value] - Input value
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.data_*] - Any custom data attribute
 * @param {React.Ref} ref - Forwarded ref
 */
const TogglerGeneric = forwardRef(function TogglerGeneric(props, ref) {
  const {
    label = {
      text: "",
      position: "after", // Typical toggle label is after
      classname: "",
      onClick: false,
      onHover: false,
      title: "",
    },
    size = "m",
    shape = "oval",
    colors,
    innerContent,
    validation,
    fullWidth = false,
    className = "",
    checked,
    defaultChecked = false,
    disabled = false,
    onChange,
    id,
    name,
    value,
    ...restProps
  } = props;

  const dataAttrs = useMemo(() => extractDataAttrs(restProps), [restProps]);

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  const rootClasses = useMemo(() => {
    const classes = ["togglerGeneric_wrapper", `togglerGeneric-${size}`];

    if (label && label.text) {
      classes.push(`togglerGeneric-label-${label.position || "after"}`);
    }
    if (shape === "rectangular") {
      classes.push("togglerGeneric-rectangular");
    }
    if (fullWidth) classes.push("togglerGeneric-fullWidth");
    if (disabled) classes.push("togglerGeneric-wrapper-disabled");
    if (className) classes.push(className);

    return classes.join(" ");
  }, [size, shape, fullWidth, disabled, className, label]);

  const trackClasses = useMemo(() => {
    const classes = ["togglerGeneric_track"];
    if (validation) classes.push(`togglerGeneric_track-${validation}`);
    if (disabled) classes.push("togglerGeneric_track-disabled");
    return classes.join(" ");
  }, [validation, disabled]);

  const customStyle = useMemo(() => {
    // If it is checked and custom colors are provided, apply them
    const style = {};
    if (isChecked && colors && !disabled) {
      if (colors.bg) {
        style.backgroundColor = colors.bg;
        style.borderColor = colors.bg;
      }
      if (colors.txt) {
        style["--toggler-custom-txt"] = colors.txt;
      }
      if (colors.icon) {
        style["--toggler-custom-icon"] = colors.icon;
      }
    }
    return style;
  }, [isChecked, colors, disabled]);

  const renderContent = (content, className) => {
    if (!content) return null;
    const isStructured = typeof content === "object" && !content.$$typeof;
    const text = isStructured ? content.text : content;
    const leftIcon = isStructured ? content.leftIcon : null;
    const rightIcon = isStructured ? content.rightIcon : null;

    if (!text && !leftIcon && !rightIcon) return null;

    return (
      <div className={`togglerGeneric_text ${className}`}>
        {leftIcon && <span className="togglerGeneric_innerIcon">{leftIcon}</span>}
        {text !== undefined && text !== null && <span>{text}</span>}
        {rightIcon && <span className="togglerGeneric_innerIcon">{rightIcon}</span>}
      </div>
    );
  };

  const togglerElement = (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        ref={ref}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        className="togglerGeneric_input"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        {...dataAttrs}
      />
      <div 
        className={trackClasses}
        style={customStyle}
      >
        {innerContent && (
          <div className="togglerGeneric_texts">
            {renderContent(innerContent.on, "togglerGeneric_text-on")}
            {renderContent(innerContent.off, "togglerGeneric_text-off")}
          </div>
        )}
        <span className="togglerGeneric_thumb" />
      </div>
    </div>
  );

  if (label && label.text) {
    const labelClick =
      typeof label.onClick === "function" ? label.onClick : undefined;
    const labelHover =
      typeof label.onHover === "function" ? label.onHover : undefined;

    return (
      <label className={rootClasses}>
        {["top-left", "top-right", "before"].includes(label.position) && (
          <span
            className={`togglerGeneric_label ${label.classname || ""}`}
            onClick={labelClick}
            onMouseEnter={labelHover}
            title={label.title}
          >
            {label.text}
          </span>
        )}

        {togglerElement}

        {(!label.position || ["bottom-left", "bottom-right", "after"].includes(label.position)) && (
          <span
            className={`togglerGeneric_label ${label.classname || ""}`}
            onClick={labelClick}
            onMouseEnter={labelHover}
            title={label.title}
          >
            {label.text}
          </span>
        )}
      </label>
    );
  }

  return <label className={rootClasses}>{togglerElement}</label>;
});

TogglerGeneric.propTypes = {
  label: PropTypes.shape({
    text: PropTypes.string,
    position: PropTypes.oneOf([
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
      "before",
      "after",
    ]),
    classname: PropTypes.string,
    onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onHover: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    title: PropTypes.string,
  }),
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl", "xxl"]),
  shape: PropTypes.oneOf(["oval", "rectangular"]),
  validation: PropTypes.oneOf(["error", "success", "warning"]),
  fullWidth: PropTypes.bool,
  colors: PropTypes.shape({
    bg: PropTypes.string,
    txt: PropTypes.string,
    icon: PropTypes.string,
  }),
  innerContent: PropTypes.shape({
    on: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.shape({
        text: PropTypes.string,
        leftIcon: PropTypes.node,
        rightIcon: PropTypes.node,
      })
    ]),
    off: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.shape({
        text: PropTypes.string,
        leftIcon: PropTypes.node,
        rightIcon: PropTypes.node,
      })
    ]),
  }),
  className: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
};

TogglerGeneric.displayName = "TogglerGeneric";

export default TogglerGeneric;
