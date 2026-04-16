import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { icons } from "lucide-react";
import "./_styles/inputGeneric.css";

/* ═══════════════════════════════════════════════════════════════
 *  InputGeneric  —  Shared structural input component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    The core, un-opinionated engine behind all input components.
 *    It provides the structural layout for floating/adjacent labels,
 *    left and right icons, tooltips/focus behavior, validation states,
 *    and size calculations. All specific inputs (Input_text, Input_email,
 *    etc.) use this under the hood.
 *
 *  ICONS & BUTTONS
 *    Supports 'lucid' (lucide-react components) or custom images
 *    rendered on the left/right. See documentation for the 'icons' prop.
 *
 *  LABELS
 *    Can position labels inside the wrapper (top-left, top-right,
 *    before, after) adjusting flex-direction accordingly.
 *
 *  PROPS
 *    fullWidth: (bool) Expands the input wrapper to 100% of its container.
 *    validation: ("error"|"success"|"warning"|falsy) Paints the borders.
 *    size: 'xs' through 'xxl'.
 *
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════
 *
 * InputGeneric - Base input component providing structure for all text-based inputs.
 *
 * This is the foundational component that all specific input types (Input_text, Input_email, etc.)
 * extend. It handles the common functionality: labels, icons, validation states, sizes, and focus behavior.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} [props.label] - Label configuration
 * @param {string} [props.label.text] - Label text content
 * @param {string} [props.label.position="top-left"] - Label position: "top-left", "top-right", "bottom-left", "bottom-right", "before", "after"
 * @param {string} [props.label.classname] - Custom CSS class for label
 * @param {Function|boolean} [props.label.onClick] - Label click handler
 * @param {Function|boolean} [props.label.onHover] - Label hover handler
 * @param {string} [props.label.title] - Label tooltip text
 *
 * @param {Object} [props.icons] - Icons configuration
 * @param {boolean} [props.icons.isActive=false] - Enable icons
 * @param {Object} [props.icons.leftIcon] - Left icon configuration (same structure as renderIcon)
 * @param {Object} [props.icons.rightIcon] - Right icon configuration (same structure as renderIcon)
 *
 * @param {string} [props.size="m"] - Input size: "xs", "s", "m", "l", "xl", "xxl"
 * @param {boolean} [props.fullWidth=false] - Expand to 100% width
 * @param {string} [props.validation] - Validation state: "error", "success", "warning"
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.type="text"] - HTML input type
 * @param {string} [props.id] - Input ID for label association
 * @param {boolean} [props.disabled=false] - Disable the input
 * @param {boolean} [props.readOnly=false] - Make input read-only
 * @param {Function} [props.onChange] - Change event handler
 * @param {Function} [props.onFocus] - Focus event handler
 * @param {Function} [props.onBlur] - Blur event handler
 * @param {Function} [props.onKeyDown] - KeyDown event handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string|number} [props.value] - Controlled value
 * @param {string|number} [props.defaultValue] - Uncontrolled default value
 * @param {string} [props.name] - Input name attribute
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @returns {JSX.Element} Rendered input component
 *
 * @example
 * // Basic usage
 * <InputGeneric
 *   label={{ text: "Username" }}
 *   placeholder="Enter username"
 * />
 *
 * @example
 * // With icons and validation
 * <InputGeneric
 *   label={{ text: "Email" }}
 *   icons={{
 *     isActive: true,
 *     leftIcon: { isActive: true, type: "lucid", content: "Mail" }
 *   }}
 *   validation="success"
 *   size="l"
 * />
 * ═══════════════════════════════════════════════════════════════ */

// Main Component
/**
 * InputGeneric - Base input component providing structure for all text-based inputs.
 *
 * This is the foundational component that all specific input types (Input_text, Input_email, etc.)
 * extend. It handles the common functionality: labels, icons, validation states, sizes, and focus behavior.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} [props.label] - Label configuration
 * @param {string} [props.label.text] - Label text content
 * @param {string} [props.label.position="top-left"] - Label position: "top-left", "top-right", "bottom-left", "bottom-right", "before", "after"
 * @param {string} [props.label.classname] - Custom CSS class for label
 * @param {Function|boolean} [props.label.onClick] - Label click handler
 * @param {Function|boolean} [props.label.onHover] - Label hover handler
 * @param {string} [props.label.title] - Label tooltip text
 *
 * @param {Object} [props.icons] - Icons configuration
 * @param {boolean} [props.icons.isActive=false] - Enable icons
 * @param {Object} [props.icons.leftIcon] - Left icon configuration (same structure as renderIcon)
 * @param {Object} [props.icons.rightIcon] - Right icon configuration (same structure as renderIcon)
 *
 * @param {string} [props.size="m"] - Input size: "xs", "s", "m", "l", "xl", "xxl"
 * @param {boolean} [props.fullWidth=false] - Expand to 100% width
 * @param {string} [props.validation] - Validation state: "error", "success", "warning"
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.type="text"] - HTML input type
 * @param {string} [props.id] - Input ID for label association
 * @param {boolean} [props.disabled=false] - Disable the input
 * @param {boolean} [props.readOnly=false] - Make input read-only
 * @param {Function} [props.onChange] - Change event handler
 * @param {Function} [props.onFocus] - Focus event handler
 * @param {Function} [props.onBlur] - Blur event handler
 * @param {Function} [props.onKeyDown] - KeyDown event handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string|number} [props.value] - Controlled value
 * @param {string|number} [props.defaultValue] - Uncontrolled default value
 * @param {string} [props.name] - Input name attribute
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @returns {JSX.Element} Rendered input component
 *
 * @example
 * // Basic usage
 * <InputGeneric
 *   label={{ text: "Username" }}
 *   placeholder="Enter username"
 * />
 *
 * @example
 * // With icons and validation
 * <InputGeneric
 *   label={{ text: "Email" }}
 *   icons={{
 *     isActive: true,
 *     leftIcon: { isActive: true, type: "lucid", content: "Mail" }
 *   }}
 *   validation="success"
 *   size="l"
 * />
 */

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

// Helper: Renders an icon (Lucide or image) as either a static span or clickable button
const renderIcon = (iconConfig) => {
  if (!iconConfig || !iconConfig.isActive || !iconConfig.content) return null;

  const content = (
    <>
      {iconConfig.type === "lucid" ? (
        (() => {
          const iconName =
            iconConfig.content.charAt(0).toUpperCase() +
            iconConfig.content.slice(1);
          const LucideIcon = icons[iconName];
          if (!LucideIcon) {
            // Use setTimeout to prevent React render-blocking and infinite alert loops during render
            setTimeout(
              () =>
                alert(`[InputGeneric] Lucide icon "${iconName}" not found.`),
              0,
            );
            return null;
          }
          return <LucideIcon aria-hidden="true" />;
        })()
      ) : (
        <img
          src={iconConfig.content}
          alt={iconConfig.title || ""}
          aria-hidden={!iconConfig.title}
        />
      )}
    </>
  );

  if (iconConfig.onClick) {
    return (
      <button
        type="button"
        className={`inputGeneric_iconButton ${iconConfig.classname || ""}`}
        onClick={iconConfig.onClick}
        onMouseEnter={iconConfig.onHover}
        title={iconConfig.title}
        tabIndex="-1">
        {content}
      </button>
    );
  }

  return (
    <span
      className={`inputGeneric_iconStatic ${iconConfig.classname || ""}`}
      onMouseEnter={iconConfig.onHover}
      title={iconConfig.title}>
      {content}
    </span>
  );
};

const InputGeneric = forwardRef(function InputGeneric(props, ref) {
  const {
    label = {
      text: "",
      position: "top-left",
      classname: "",
      onClick: false,
      onHover: false,
      title: "",
    },
    icons: iconsConfig = {
      isActive: false,
      leftIcon: null,
      rightIcon: null,
    },
    size = "m",
    fullWidth = false,
    validation,
    className = "",
    type = "text",
    id,
    disabled = false,
    readOnly = false,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    placeholder,
    value,
    defaultValue,
    name,
    ...restProps
  } = props;

  const dataAttrs = useMemo(() => extractDataAttrs(restProps), [restProps]);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(
    (e) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const rootClassName = useMemo(() => {
    const classes = ["inputGeneric_wrapper", `inputGeneric-${size}`];

    if (label && label.text) {
      classes.push(`inputGeneric-label-${label.position || "top-left"}`);
    }

    if (fullWidth) classes.push("inputGeneric-fullWidth");
    if (disabled) classes.push("inputGeneric-wrapper-disabled");
    if (className) classes.push(className);

    return classes.join(" ");
  }, [size, fullWidth, disabled, className, label]);

  const inputContainerClass = useMemo(() => {
    const classes = ["inputGeneric_container"];
    if (isFocused) classes.push("inputGeneric_container-focused");
    if (validation) classes.push(`inputGeneric_container-${validation}`);
    if (disabled) classes.push("inputGeneric_container-disabled");
    return classes.join(" ");
  }, [isFocused, validation, disabled]);

  const leftIconElement =
    iconsConfig?.isActive && iconsConfig.leftIcon
      ? renderIcon(iconsConfig.leftIcon)
      : null;

  const rightIconElement =
    iconsConfig?.isActive && iconsConfig.rightIcon
      ? renderIcon(iconsConfig.rightIcon)
      : null;

  const inputElement = (
    <div className={inputContainerClass}>
      {leftIconElement && (
        <div className="inputGeneric_leftIconWrapper">{leftIconElement}</div>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        className="inputGeneric_input"
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        {...dataAttrs}
      />
      {rightIconElement && (
        <div className="inputGeneric_rightIconWrapper">{rightIconElement}</div>
      )}
    </div>
  );

  if (label && label.text) {
    const labelClick =
      typeof label.onClick === "function" ? label.onClick : undefined;
    const labelHover =
      typeof label.onHover === "function" ? label.onHover : undefined;

    return (
      <div className={rootClassName}>
        {["top-left", "top-right", "before"].includes(
          label.position || "top-left",
        ) && (
          <label
            htmlFor={id}
            className={`inputGeneric_label ${label.classname || ""}`}
            onClick={labelClick}
            onMouseEnter={labelHover}
            title={label.title}>
            {label.text}
          </label>
        )}

        {inputElement}

        {["bottom-left", "bottom-right", "after"].includes(label.position) && (
          <label
            htmlFor={id}
            className={`inputGeneric_label ${label.classname || ""}`}
            onClick={labelClick}
            onMouseEnter={labelHover}
            title={label.title}>
            {label.text}
          </label>
        )}
      </div>
    );
  }

  return <div className={rootClassName}>{inputElement}</div>;
});

const labelPropType = PropTypes.shape({
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
});

const iconPropType = PropTypes.shape({
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  title: PropTypes.string,
  classname: PropTypes.string,
  type: PropTypes.oneOf(["lucid", "img"]),
  content: PropTypes.string,
});

InputGeneric.propTypes = {
  label: labelPropType,
  icons: PropTypes.shape({
    isActive: PropTypes.bool,
    leftIcon: iconPropType,
    rightIcon: iconPropType,
  }),
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl", "xxl"]),
  fullWidth: PropTypes.bool,
  validation: PropTypes.oneOf(["error", "success", "warning"]),
  className: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
};

InputGeneric.displayName = "InputGeneric";

export default InputGeneric;
