import { forwardRef, useState } from "react";
import InputGeneric from "./InputGeneric.jsx";

/* ═══════════════════════════════════════════════════════════════
 *  Input_psw  —  Password input component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    Provides built-in password visibility toggling. Encapsulates
 *    the logic to show/hide the password text.
 *    Defaults to using 'Lock' on the left and 'Eye'/'EyeOff'
 *    on the right if not overridden.
 *
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════
 *
 * Input_psw - Password input with built-in show/hide toggle.
 *
 * Extends InputGeneric with password-specific functionality. Includes a Lock icon on the left
 * and an Eye/EyeOff toggle button on the right. Clicking the eye icon switches between
 * password (hidden) and text (visible) modes.
 *
 * @component
 * @param {Object} props - All props from InputGeneric are supported
 * @param {Object} [props.icons] - Icon configuration (Lock and Eye/EyeOff are defaults)
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @returns {JSX.Element} Rendered password input
 *
 * @example
 * // Basic password input
 * <Input_psw
 *   label={{ text: "Password" }}
 *   placeholder="Enter password"
 * />
 *
 * @example
 * // With validation
 * <Input_psw
 *   label={{ text: "Confirm Password" }}
 *   validation="error"
 *   size="m"
 * />
 * ═══════════════════════════════════════════════════════════════ */

const Input_psw = forwardRef(function Input_psw(props, ref) {
  // Internal state to track password visibility
  const [showPsw, setShowPsw] = useState(false);

  const { icons = {}, ...restProps } = props;

  // Toggle function for the right icon
  const handleTogglePsw = (e) => {
    e.preventDefault();
    setShowPsw((prev) => !prev);
  };

  const mergedIcons = {
    isActive: true,
    leftIcon: icons.leftIcon || {
      isActive: true,
      type: "lucid",
      content: "Lock",
    },
    rightIcon: icons.rightIcon || {
      isActive: true,
      type: "lucid",
      content: showPsw ? "EyeOff" : "Eye",
      onClick: handleTogglePsw,
      title: showPsw ? "Hide password" : "Show password",
    },
  };

  return (
    <InputGeneric
      ref={ref}
      type={showPsw ? "text" : "password"}
      icons={mergedIcons}
      {...restProps}
    />
  );
});

Input_psw.displayName = "Input_psw";

export default Input_psw;
