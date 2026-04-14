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
