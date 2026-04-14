import { forwardRef } from "react";
import InputGeneric from "./InputGeneric.jsx";

/* ═══════════════════════════════════════════════════════════════
 *  Input_email  —  Email input component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    Specific variant for email inputs. Defaults type to "email"
 *    and provides a default 'Mail' icon on the left if no custom
 *    icon is provided.
 * ═══════════════════════════════════════════════════════════════ */
const Input_email = forwardRef(function Input_email(props, ref) {
  const { icons = {}, ...restProps } = props;

  const mergedIcons = {
    isActive: true,
    leftIcon: icons.leftIcon || {
      isActive: true,
      type: "lucid",
      content: "Mail",
    },
    rightIcon: icons.rightIcon
  };

  return (
    <InputGeneric 
      ref={ref} 
      type="email" 
      icons={mergedIcons}
      {...restProps} 
    />
  );
});

Input_email.displayName = "Input_email";

export default Input_email;
