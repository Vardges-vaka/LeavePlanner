import { forwardRef } from "react";
import InputGeneric from "./InputGeneric.jsx";

/* ═══════════════════════════════════════════════════════════════
 *  Input_text  —  Text input component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    Standard single-line text input. It's essentially a direct
 *    wrapper over InputGeneric setting type="text".
 *
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════
 *
 * Input_text - Standard single-line text input component.
 *
 * A simple wrapper around InputGeneric with type="text". Use this for general text entry
 * like names, usernames, addresses, or any single-line text field.
 *
 * @component
 * @param {Object} props - All props from InputGeneric are supported
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @returns {JSX.Element} Rendered text input
 *
 * @example
 * // Basic text input
 * <Input_text
 *   label={{ text: "Full Name" }}
 *   placeholder="John Doe"
 * />
 *
 * @example
 * // With validation
 * <Input_text
 *   label={{ text: "Username" }}
 *   validation="error"
 *   size="m"
 * />
 * ═══════════════════════════════════════════════════════════════ */

const Input_text = forwardRef(function Input_text(props, ref) {
  return <InputGeneric ref={ref} type="text" {...props} />;
});

Input_text.displayName = "Input_text";

export default Input_text;
