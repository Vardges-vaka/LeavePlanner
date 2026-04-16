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
 *
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════
 *
 * Input_email - Email input component with built-in validation and Mail icon.
 *
 * Extends InputGeneric with type="email" for HTML5 email validation. Automatically
 * includes a Mail icon on the left unless overridden. Mobile devices will show
 * an email-optimized keyboard.
 *
 * @component
 * @param {Object} props - All props from InputGeneric are supported
 * @param {Object} [props.icons] - Icon configuration (Mail icon is default for left)
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @returns {JSX.Element} Rendered email input
 *
 * @example
 * // Basic email input
 * <Input_email
 *   label={{ text: "Email Address" }}
 *   placeholder="user@example.com"
 * />
 *
 * @example
 * // With validation
 * <Input_email
 *   label={{ text: "Work Email" }}
 *   validation="success"
 *   size="l"
 * />
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
    rightIcon: icons.rightIcon,
  };

  return (
    <InputGeneric ref={ref} type="email" icons={mergedIcons} {...restProps} />
  );
});

Input_email.displayName = "Input_email";

export default Input_email;
