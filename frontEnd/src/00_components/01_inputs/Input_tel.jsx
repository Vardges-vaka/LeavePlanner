import { forwardRef } from "react";
import PropTypes from "prop-types";
import InputGeneric from "./InputGeneric.jsx";

/* ═══════════════════════════════════════════════════════════════
 *  Input_tel  —  Telephone input component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    Specific variant for telephone inputs. Defaults type to "tel"
 *    and provides a default 'Phone' icon on the left if no custom
 *    icon is provided.
 *
 *  CONTACT TYPE
 *    Supports different contact types via the 'contactType' prop:
 *    - "phone" (default): Shows Phone icon
 *    - "whatsapp": Shows MessageCircle icon (WhatsApp style)
 *    - "telegram": Shows Send icon (Telegram style)
 *
 *    Custom icons can still override this via the icons prop.
 *
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════
 *
 * Input_tel - Telephone input with contact type variants.
 *
 * Extends InputGeneric with type="tel" for telephone number input. Supports different
 * contact types (phone, whatsapp, telegram) with appropriate icons. Mobile devices
 * will show a telephone-optimized keyboard.
 *
 * @component
 * @param {Object} props - All props from InputGeneric are supported
 * @param {string} [props.contactType="phone"] - Contact type: "phone", "whatsapp", or "telegram"
 * @param {Object} [props.icons] - Icon configuration (auto-selected based on contactType)
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @returns {JSX.Element} Rendered telephone input
 *
 * @example
 * // Basic phone input
 * <Input_tel
 *   label={{ text: "Phone Number" }}
 *   contactType="phone"
 *   placeholder="+1 (555) 123-4567"
 * />
 *
 * @example
 * // WhatsApp contact
 * <Input_tel
 *   label={{ text: "WhatsApp" }}
 *   contactType="whatsapp"
 *   placeholder="+1 (555) 123-4567"
 * />
 *
 * @example
 * // Telegram username
 * <Input_tel
 *   label={{ text: "Telegram" }}
 *   contactType="telegram"
 *   placeholder="@username"
 * />
 * ═══════════════════════════════════════════════════════════════ */

// Icon mapping for different contact types
const CONTACT_TYPE_ICONS = {
  phone: "Phone",
  whatsapp: "MessageCircle",
  telegram: "Send",
};

const Input_tel = forwardRef(function Input_tel(props, ref) {
  const { icons = {}, contactType = "phone", ...restProps } = props;

  // Determine the icon based on contactType
  const defaultIconContent =
    CONTACT_TYPE_ICONS[contactType] || CONTACT_TYPE_ICONS.phone;

  const mergedIcons = {
    isActive: true,
    leftIcon: icons.leftIcon || {
      isActive: true,
      type: "lucid",
      content: defaultIconContent,
    },
    rightIcon: icons.rightIcon,
  };

  return (
    <InputGeneric ref={ref} type="tel" icons={mergedIcons} {...restProps} />
  );
});

Input_tel.propTypes = {
  contactType: PropTypes.oneOf(["phone", "whatsapp", "telegram"]),
  icons: PropTypes.shape({
    isActive: PropTypes.bool,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
  }),
};

Input_tel.displayName = "Input_tel";

export default Input_tel;
