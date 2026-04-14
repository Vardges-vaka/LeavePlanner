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
 * ═══════════════════════════════════════════════════════════════ */
const Input_psw = forwardRef(function Input_psw(props, ref) {
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
      title: showPsw ? "Hide password" : "Show password"
    }
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
