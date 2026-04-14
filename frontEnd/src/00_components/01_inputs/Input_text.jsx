import { forwardRef } from "react";
import InputGeneric from "./InputGeneric.jsx";

/* ═══════════════════════════════════════════════════════════════
 *  Input_text  —  Text input component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    Standard single-line text input. It's essentially a direct 
 *    wrapper over InputGeneric setting type="text".
 * ═══════════════════════════════════════════════════════════════ */
const Input_text = forwardRef(function Input_text(props, ref) {
  return <InputGeneric ref={ref} type="text" {...props} />;
});

Input_text.displayName = "Input_text";

export default Input_text;
