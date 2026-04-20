import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import "./_styles/textAreaGeneric.css";

/* ═══════════════════════════════════════════════════════════════
 *  TextAreaGeneric  —  Shared structural textarea component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    The core, un-opinionated engine behind all textarea components.
 *    It provides the structural layout for floating/adjacent labels,
 *    validation states, size calculations, and resize behavior.
 *    Similar to InputGeneric but for multi-line text input.
 *
 *  LABELS
 *    Can position labels inside the wrapper (top-left, top-right,
 *    before, after) adjusting flex-direction accordingly.
 *
 *  PROPS
 *    fullWidth: (bool) Expands the textarea wrapper to 100% of its container.
 *    validation: ("error"|"success"|"warning"|falsy) Paints the borders.
 *    size: 'xs' through 'xxl'.
 *    resize: ("none"|"vertical"|"horizontal"|"both") Controls resize behavior.
 *    rows: (number) Initial number of visible text rows.
 *
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════
 *
 * TextAreaGeneric - Base textarea component providing structure for all multi-line text inputs.
 *
 * This is the foundational component for textarea elements. It handles common functionality:
 * labels, validation states, sizes, focus behavior, and resize control. No icons support
 * to keep it simple and focused on multi-line text input.
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
 * @param {string} [props.size="m"] - Textarea size: "xs", "s", "m", "l", "xl", "xxl"
 * @param {boolean} [props.fullWidth=false] - Expand to 100% width
 * @param {string} [props.validation] - Validation state: "error", "success", "warning"
 * @param {string} [props.resize="vertical"] - Resize behavior: "none", "vertical", "horizontal", "both"
 * @param {number} [props.rows=3] - Initial number of visible text rows
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Textarea ID for label association
 * @param {boolean} [props.disabled=false] - Disable the textarea
 * @param {boolean} [props.readOnly=false] - Make textarea read-only
 * @param {Function} [props.onChange] - Change event handler
 * @param {Function} [props.onFocus] - Focus event handler
 * @param {Function} [props.onBlur] - Blur event handler
 * @param {Function} [props.onKeyDown] - KeyDown event handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.value] - Controlled value
 * @param {string} [props.defaultValue] - Uncontrolled default value
 * @param {string} [props.name] - Textarea name attribute
 * @param {number} [props.maxLength] - Maximum character length
 * @param {string} [props.data_*] - Any custom data attribute (ex: data_user="123" -> data-user="123", accessible via e.target.dataset.user)
 * @param {React.Ref} ref - Forwarded ref to the textarea element
 *
 * @returns {JSX.Element} Rendered textarea component
 *
 * @example
 * // Basic usage
 * <TextAreaGeneric
 *   label={{ text: "Description" }}
 *   placeholder="Enter description"
 *   rows={4}
 * />
 *
 * @example
 * // With validation and resize control
 * <TextAreaGeneric
 *   label={{ text: "Comments" }}
 *   validation="success"
 *   resize="none"
 *   size="l"
 *   rows={6}
 * />
 *
 * @example
 * // Controlled with character limit
 * <TextAreaGeneric
 *   label={{ text: "Bio" }}
 *   value={bio}
 *   onChange={(e) => setBio(e.target.value)}
 *   maxLength={500}
 *   rows={5}
 * />
 * ═══════════════════════════════════════════════════════════════ */

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

const TextAreaGeneric = forwardRef(function TextAreaGeneric(props, ref) {
  const {
    label = {
      text: "",
      position: "top-left",
      classname: "",
      onClick: false,
      onHover: false,
      title: "",
    },
    size = "m",
    fullWidth = false,
    validation,
    resize = "vertical",
    rows = 3,
    className = "",
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
    maxLength,
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
    const classes = ["textAreaGeneric_wrapper", `textAreaGeneric-${size}`];

    if (label && label.text) {
      classes.push(`textAreaGeneric-label-${label.position || "top-left"}`);
    }

    if (fullWidth) classes.push("textAreaGeneric-fullWidth");
    if (disabled) classes.push("textAreaGeneric-wrapper-disabled");
    if (className) classes.push(className);

    return classes.join(" ");
  }, [size, fullWidth, disabled, className, label]);

  const textareaContainerClass = useMemo(() => {
    const classes = ["textAreaGeneric_container"];
    if (isFocused) classes.push("textAreaGeneric_container-focused");
    if (validation) classes.push(`textAreaGeneric_container-${validation}`);
    if (disabled) classes.push("textAreaGeneric_container-disabled");
    return classes.join(" ");
  }, [isFocused, validation, disabled]);

  const textareaClassName = useMemo(() => {
    const classes = ["textAreaGeneric_textarea"];
    if (resize) classes.push(`textAreaGeneric_textarea-resize-${resize}`);
    return classes.join(" ");
  }, [resize]);

  const textareaElement = (
    <div className={textareaContainerClass}>
      <textarea
        ref={ref}
        id={id}
        name={name}
        className={textareaClassName}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        rows={rows}
        maxLength={maxLength}
        {...dataAttrs}
      />
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
            className={`textAreaGeneric_label ${label.classname || ""}`}
            onClick={labelClick}
            onMouseEnter={labelHover}
            title={label.title}>
            {label.text}
          </label>
        )}

        {textareaElement}

        {["bottom-left", "bottom-right", "after"].includes(label.position) && (
          <label
            htmlFor={id}
            className={`textAreaGeneric_label ${label.classname || ""}`}
            onClick={labelClick}
            onMouseEnter={labelHover}
            title={label.title}>
            {label.text}
          </label>
        )}
      </div>
    );
  }

  return <div className={rootClassName}>{textareaElement}</div>;
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

TextAreaGeneric.propTypes = {
  label: labelPropType,
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl", "xxl"]),
  fullWidth: PropTypes.bool,
  validation: PropTypes.oneOf(["error", "success", "warning"]),
  resize: PropTypes.oneOf(["none", "vertical", "horizontal", "both"]),
  rows: PropTypes.number,
  className: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  maxLength: PropTypes.number,
};

TextAreaGeneric.displayName = "TextAreaGeneric";

export default TextAreaGeneric;
