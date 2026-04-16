import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { icons } from "lucide-react";
import "./_styles/checkbox.css";

/* ═══════════════════════════════════════════════════════════════
 *  Checkbox  —  Custom checkbox component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    A custom-styled checkbox component with label support, different
 *    sizes, validation states, and optional indeterminate state.
 *
 *  FEATURES
 *    - Custom checkmark icon (using Lucide Check icon)
 *    - Label positioning (left or right of checkbox)
 *    - Multiple sizes (xs, s, m, l, xl)
 *    - Validation states (error, success, warning)
 *    - Indeterminate state support
 *    - Disabled state
 *    - Controlled and uncontrolled modes
 *
 *  PROPS
 *    label: (string) Label text for the checkbox
 *    labelPosition: ("left"|"right") Position of label relative to checkbox
 *    size: ("xs"|"s"|"m"|"l"|"xl") Size of the checkbox
 *    validation: ("error"|"success"|"warning") Validation state
 *    indeterminate: (bool) Shows indeterminate state (dash icon)
 *    checked: (bool) Controlled checked state
 *    defaultChecked: (bool) Uncontrolled default checked state
 *    onChange: (func) Change handler
 *    disabled: (bool) Disabled state
 * ═══════════════════════════════════════════════════════════════ */

/**
 * Checkbox - Custom-styled checkbox with indeterminate state support.
 *
 * A fully customizable checkbox component with support for labels, multiple sizes,
 * validation states, and an indeterminate state (useful for "select all" scenarios).
 * Supports both controlled and uncontrolled modes.
 *
 * The indeterminate state shows a dash icon instead of a checkmark, typically used
 * when some but not all child items are selected in a hierarchical list.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.label] - Label text displayed next to checkbox
 * @param {string} [props.labelPosition="right"] - Label position: "left" or "right"
 * @param {string} [props.size="m"] - Checkbox size: "xs", "s", "m", "l", "xl"
 * @param {string} [props.validation] - Validation state: "error", "success", "warning"
 * @param {boolean} [props.indeterminate=false] - Show indeterminate state (dash icon)
 * @param {boolean} [props.checked] - Controlled checked state
 * @param {boolean} [props.defaultChecked=false] - Uncontrolled default checked state
 * @param {Function} [props.onChange] - Change event handler
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Input ID for label association
 * @param {string} [props.name] - Input name attribute
 * @param {string} [props.value] - Input value attribute
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @returns {JSX.Element} Rendered checkbox
 *
 * @example
 * // Basic checkbox
 * <Checkbox
 *   label="Accept terms and conditions"
 *   defaultChecked={false}
 * />
 *
 * @example
 * // Controlled checkbox
 * <Checkbox
 *   label="Remember me"
 *   checked={isChecked}
 *   onChange={(e) => setIsChecked(e.target.checked)}
 * />
 *
 * @example
 * // Indeterminate state (select all)
 * <Checkbox
 *   label="Select All"
 *   indeterminate={someSelected && !allSelected}
 *   checked={allSelected}
 *   onChange={handleSelectAll}
 * />
 *
 * @example
 * // With validation
 * <Checkbox
 *   label="Required field"
 *   validation="error"
 *   size="l"
 * />
 *
 * @example
 * // Label on left side
 * <Checkbox
 *   label="Enable notifications"
 *   labelPosition="left"
 * />
 */
const Checkbox = forwardRef(function Checkbox(props, ref) {
  const {
    label,
    labelPosition = "right",
    size = "m",
    validation,
    indeterminate = false,
    checked,
    defaultChecked = false,
    onChange,
    disabled = false,
    className = "",
    id,
    name,
    value,
    ...restProps
  } = props;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  /**
   * Handles checkbox change events.
   * Updates internal state for uncontrolled mode and calls onChange callback.
   */
  const handleChange = (e) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  const wrapperClasses = [
    "checkbox_wrapper",
    `checkbox-${size}`,
    labelPosition === "left" && "checkbox-labelLeft",
    disabled && "checkbox-wrapper-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const checkboxClasses = [
    "checkbox_box",
    isChecked && "checkbox_box-checked",
    indeterminate && "checkbox_box-indeterminate",
    validation && `checkbox_box-${validation}`,
    disabled && "checkbox_box-disabled",
  ]
    .filter(Boolean)
    .join(" ");

  const CheckIcon = icons.Check;
  const MinusIcon = icons.Minus;

  return (
    <label className={wrapperClasses}>
      <input
        ref={ref}
        type="checkbox"
        className="checkbox_input"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        id={id}
        name={name}
        value={value}
        {...restProps}
      />
      <span className={checkboxClasses}>
        {indeterminate ? (
          <MinusIcon className="checkbox_icon" aria-hidden="true" />
        ) : (
          isChecked && (
            <CheckIcon className="checkbox_icon" aria-hidden="true" />
          )
        )}
      </span>
      {label && <span className="checkbox_label">{label}</span>}
    </label>
  );
});

Checkbox.propTypes = {
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(["left", "right"]),
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl"]),
  validation: PropTypes.oneOf(["error", "success", "warning"]),
  indeterminate: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
