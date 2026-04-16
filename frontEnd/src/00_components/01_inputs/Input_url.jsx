import { forwardRef } from "react";
import InputGeneric from "./InputGeneric.jsx";

/* ═══════════════════════════════════════════════════════════════
 *  Input_url  —  URL input component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    Specific variant for URL inputs. Defaults type to "url"
 *    and provides a default 'Link' icon on the left if no custom
 *    icon is provided.
 *
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════
 *
 * Input_url - URL input component with built-in validation and Link icon.
 *
 * Extends InputGeneric with type="url" for HTML5 URL validation. Automatically
 * includes a Link icon on the left unless overridden. Mobile devices will show
 * a URL-optimized keyboard with easy access to common URL characters.
 *
 * @component
 * @param {Object} props - All props from InputGeneric are supported
 * @param {Object} [props.icons] - Icon configuration (Link icon is default for left)
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @returns {JSX.Element} Rendered URL input
 *
 * @example
 * // Basic URL input
 * <Input_url
 *   label={{ text: "Website" }}
 *   placeholder="https://example.com"
 * />
 *
 * @example
 * // With validation
 * <Input_url
 *   label={{ text: "Portfolio URL" }}
 *   validation="success"
 *   size="m"
 * />
 * ═══════════════════════════════════════════════════════════════ */

const Input_url = forwardRef(function Input_url(props, ref) {
  const { icons = {}, ...restProps } = props;

  const mergedIcons = {
    isActive: true,
    leftIcon: icons.leftIcon || {
      isActive: true,
      type: "lucid",
      content: "Link",
    },
    rightIcon: icons.rightIcon,
  };

  return (
    <InputGeneric ref={ref} type="url" icons={mergedIcons} {...restProps} />
  );
});

Input_url.displayName = "Input_url";

export default Input_url;
