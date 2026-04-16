import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import "./_styles/input_range.css";

/* ═══════════════════════════════════════════════════════════════
 *  Input_range  —  Range slider component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    A custom-styled range slider with label support, value display,
 *    min/max labels, and different sizes.
 *
 *  FEATURES
 *    - Custom styled track and thumb
 *    - Optional value display (above slider or inline)
 *    - Min/Max labels
 *    - Multiple sizes (xs, s, m, l, xl)
 *    - Validation states (error, success, warning)
 *    - Disabled state
 *    - Controlled and uncontrolled modes
 *    - Step support
 *
 *  PROPS
 *    label: (string) Label text for the slider
 *    showValue: (bool) Show current value (default: true)
 *    valuePosition: ("top"|"inline") Position of value display
 *    showMinMax: (bool) Show min/max labels (default: true)
 *    min: (number) Minimum value (default: 0)
 *    max: (number) Maximum value (default: 100)
 *    step: (number) Step increment (default: 1)
 *    size: ("xs"|"s"|"m"|"l"|"xl") Size of the slider
 *    validation: ("error"|"success"|"warning") Validation state
 *    value: (number) Controlled value
 *    defaultValue: (number) Uncontrolled default value
 *    onChange: (func) Change handler
 *    disabled: (bool) Disabled state
 *
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════
 *
 * Input_range - Range slider with value display and customizable range.
 *
 * A custom-styled range slider component with visual track fill, value display,
 * and min/max labels. Supports both controlled and uncontrolled modes. The track
 * fill dynamically updates to show the current value position.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.label] - Label text for the slider
 * @param {boolean} [props.showValue=true] - Show current value display
 * @param {string} [props.valuePosition="top"] - Value display position: "top" or "inline"
 * @param {boolean} [props.showMinMax=true] - Show min/max labels below slider
 * @param {number} [props.min=0] - Minimum value
 * @param {number} [props.max=100] - Maximum value
 * @param {number} [props.step=1] - Increment/decrement step
 * @param {string} [props.size="m"] - Slider size: "xs", "s", "m", "l", "xl"
 * @param {string} [props.validation] - Validation state: "error", "success", "warning"
 * @param {number} [props.value] - Controlled value
 * @param {number} [props.defaultValue] - Uncontrolled default value (defaults to min)
 * @param {Function} [props.onChange] - Change event handler
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Input ID
 * @param {string} [props.name] - Input name attribute
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @returns {JSX.Element} Rendered range slider
 *
 * @example
 * // Basic slider
 * <Input_range
 *   label="Volume"
 *   min={0}
 *   max={100}
 *   defaultValue={50}
 * />
 *
 * @example
 * // Temperature slider with inline value
 * <Input_range
 *   label="Temperature (°C)"
 *   min={-20}
 *   max={40}
 *   step={5}
 *   defaultValue={20}
 *   valuePosition="inline"
 * />
 *
 * @example
 * // Controlled rating slider
 * <Input_range
 *   label="Rating"
 *   min={0}
 *   max={5}
 *   step={0.5}
 *   value={rating}
 *   onChange={(e) => setRating(Number(e.target.value))}
 * />
 * ═══════════════════════════════════════════════════════════════ */

const Input_range = forwardRef(function Input_range(props, ref) {
  const {
    label,
    showValue = true,
    valuePosition = "top",
    showMinMax = true,
    min = 0,
    max = 100,
    step = 1,
    size = "m",
    validation,
    value,
    defaultValue = min,
    onChange,
    disabled = false,
    className = "",
    id,
    name,
    ...restProps
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Handles slider change events
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(e);
  };

  // Calculate percentage for track fill
  const percentage = ((currentValue - min) / (max - min)) * 100;

  const wrapperClasses = [
    "inputRange_wrapper",
    `inputRange-${size}`,
    disabled && "inputRange-wrapper-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sliderClasses = [
    "inputRange_slider",
    validation && `inputRange_slider-${validation}`,
    disabled && "inputRange_slider-disabled",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      {/* Label */}
      {label && (
        <div className="inputRange_labelRow">
          <label htmlFor={id} className="inputRange_label">
            {label}
          </label>
          {showValue && valuePosition === "inline" && (
            <span className="inputRange_valueInline">{currentValue}</span>
          )}
        </div>
      )}

      {/* Value display (top position) */}
      {showValue && valuePosition === "top" && (
        <div className="inputRange_valueTop">{currentValue}</div>
      )}

      {/* Slider container */}
      <div className="inputRange_sliderContainer">
        <input
          ref={ref}
          type="range"
          className={sliderClasses}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          id={id}
          name={name}
          style={{
            background: `linear-gradient(to right, var(--range-track-fill) 0%, var(--range-track-fill) ${percentage}%, var(--range-track-bg) ${percentage}%, var(--range-track-bg) 100%)`,
          }}
          {...restProps}
        />
      </div>

      {/* Min/Max labels */}
      {showMinMax && (
        <div className="inputRange_minMaxRow">
          <span className="inputRange_minLabel">{min}</span>
          <span className="inputRange_maxLabel">{max}</span>
        </div>
      )}
    </div>
  );
});

Input_range.propTypes = {
  label: PropTypes.string,
  showValue: PropTypes.bool,
  valuePosition: PropTypes.oneOf(["top", "inline"]),
  showMinMax: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl"]),
  validation: PropTypes.oneOf(["error", "success", "warning"]),
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

Input_range.displayName = "Input_range";

export default Input_range;
