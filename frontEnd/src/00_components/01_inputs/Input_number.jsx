import { forwardRef } from "react";
import InputGeneric from "./InputGeneric.jsx";

/* ═══════════════════════════════════════════════════════════════
 *  Input_number  —  Number input component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    A specific variant for numeric input. Extends InputGeneric and
 *    hides the default up/down spinners unless requested.
 *
 *  PROPS
 *    showSpinners: (bool) Defaults to false. If true, displays the native
 *                  browser arrows for incrementing/decrementing.
 *    (All other props are passed down to InputGeneric)
 *
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════
 *
 * Input_number - Numeric input component with optional spinners.
 *
 * Extends InputGeneric with type="number". By default, hides the native browser
 * spinner controls for a cleaner look. Set showSpinners={true} to display them.
 * Supports min, max, and step attributes for validation and increment control.
 *
 * @component
 * @param {Object} props - All props from InputGeneric are supported
 * @param {boolean} [props.showSpinners=false] - Show native up/down spinner buttons
 * @param {number} [props.min] - Minimum allowed value
 * @param {number} [props.max] - Maximum allowed value
 * @param {number} [props.step] - Increment/decrement step value
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @returns {JSX.Element} Rendered number input
 *
 * @example
 * // Basic number input without spinners
 * <Input_number
 *   label={{ text: "Age" }}
 *   placeholder="25"
 *   min={0}
 *   max={120}
 * />
 *
 * @example
 * // With spinners and step
 * <Input_number
 *   label={{ text: "Quantity" }}
 *   showSpinners={true}
 *   min={1}
 *   step={1}
 *   defaultValue={1}
 * />
 * ═══════════════════════════════════════════════════════════════ */

const Input_number = forwardRef(function Input_number(props, ref) {
  const { className = "", showSpinners = false, ...restProps } = props;

  const spinnerClass = showSpinners ? "" : "inputGeneric_number-noSpinners";

  return (
    <InputGeneric
      ref={ref}
      type="number"
      className={`${spinnerClass} ${className}`.trim()}
      {...restProps}
    />
  );
});

Input_number.displayName = "Input_number";

export default Input_number;
