import { forwardRef } from "react";
import PropTypes from "prop-types";
import InputGeneric from "./InputGeneric.jsx";

/* ═══════════════════════════════════════════════════════════════
 *  Input_date  —  Date/Time input component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    Versatile date and time input component supporting multiple
 *    date/time formats through the 'dateType' prop.
 *
 *  DATE TYPES
 *    Supports different date/time types via the 'dateType' prop:
 *    - "date" (default): Standard date picker (YYYY-MM-DD)
 *    - "time": Time picker (HH:MM)
 *    - "datetime-local": Date and time picker (YYYY-MM-DDTHH:MM)
 *    - "month": Month and year picker (YYYY-MM)
 *    - "week": Week picker (YYYY-Www)
 *
 *    Custom icons can be provided via the icons prop.
 *
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════
 *
 * Input_date - Versatile date/time input supporting multiple formats.
 *
 * Extends InputGeneric with various date/time input types. Automatically selects
 * appropriate icons based on the dateType. Uses native browser date/time pickers
 * for consistent UX across devices.
 *
 * @component
 * @param {Object} props - All props from InputGeneric are supported
 * @param {string} [props.dateType="date"] - Date type: "date", "time", "datetime-local", "month", or "week"
 * @param {Object} [props.icons] - Icon configuration (auto-selected based on dateType)
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @returns {JSX.Element} Rendered date/time input
 *
 * @example
 * // Date picker
 * <Input_date
 *   label={{ text: "Birth Date" }}
 *   dateType="date"
 * />
 *
 * @example
 * // Time picker
 * <Input_date
 *   label={{ text: "Appointment Time" }}
 *   dateType="time"
 * />
 *
 * @example
 * // Date and time picker
 * <Input_date
 *   label={{ text: "Event Start" }}
 *   dateType="datetime-local"
 *   validation="success"
 * />
 *
 * @example
 * // Month picker
 * <Input_date
 *   label={{ text: "Report Month" }}
 *   dateType="month"
 * />
 * ═══════════════════════════════════════════════════════════════ */

// Icon mapping for different date types
const DATE_TYPE_ICONS = {
  date: "Calendar",
  time: "Clock",
  "datetime-local": "CalendarClock",
  month: "CalendarDays",
  week: "CalendarRange",
};

const Input_date = forwardRef(function Input_date(props, ref) {
  const { icons = {}, dateType = "date", ...restProps } = props;

  // Determine the icon based on dateType
  const defaultIconContent = DATE_TYPE_ICONS[dateType] || DATE_TYPE_ICONS.date;

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
    <InputGeneric
      ref={ref}
      type={dateType}
      icons={mergedIcons}
      {...restProps}
    />
  );
});

Input_date.propTypes = {
  dateType: PropTypes.oneOf([
    "date",
    "time",
    "datetime-local",
    "month",
    "week",
  ]),
  icons: PropTypes.shape({
    isActive: PropTypes.bool,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
  }),
};

Input_date.displayName = "Input_date";

export default Input_date;
