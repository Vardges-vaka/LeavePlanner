import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import InputGeneric from "./InputGeneric.jsx";

/* ═══════════════════════════════════════════════════════════════
 *  Input_search  —  Search input component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    Specific variant for search inputs. Defaults type to "search"
 *    and provides a default 'Search' icon on the left. Optionally
 *    shows a clear button (X icon) on the right when there's text.
 *
 *  PROPS
 *    showClearButton: (bool) Defaults to true. Shows an X button
 *                     on the right to clear the input when it has value.
 *    onClear: (func) Optional callback when clear button is clicked.
 *
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════
 *
 * Input_search - Search input with automatic clear button.
 *
 * Extends InputGeneric with search-specific functionality. Includes a Search icon on the left
 * and automatically shows a clear (X) button on the right when text is present. Supports both
 * controlled and uncontrolled modes. The clear button triggers both onClear and onChange callbacks.
 *
 * @component
 * @param {Object} props - All props from InputGeneric are supported
 * @param {boolean} [props.showClearButton=true] - Show clear button when input has value
 * @param {Function} [props.onClear] - Callback when clear button is clicked
 * @param {string} [props.value] - Controlled value
 * @param {string} [props.defaultValue] - Uncontrolled default value
 * @param {Function} [props.onChange] - Change event handler
 * @param {Object} [props.icons] - Icon configuration (Search icon is default for left)
 * @param {React.Ref} ref - Forwarded ref to the input element
 *
 * @returns {JSX.Element} Rendered search input
 *
 * @example
 * // Basic search input
 * <Input_search
 *   label={{ text: "Search" }}
 *   placeholder="Search..."
 * />
 *
 * @example
 * // Controlled with clear callback
 * <Input_search
 *   label={{ text: "Search Users" }}
 *   value={searchValue}
 *   onChange={(e) => setSearchValue(e.target.value)}
 *   onClear={() => console.log("Search cleared")}
 * />
 *
 * @example
 * // Without clear button
 * <Input_search
 *   label={{ text: "Filter" }}
 *   showClearButton={false}
 * />
 * ═══════════════════════════════════════════════════════════════ */

const Input_search = forwardRef(function Input_search(props, ref) {
  const {
    icons = {},
    showClearButton = true,
    onClear,
    value,
    defaultValue,
    onChange,
    ...restProps
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Handles input change events
  const handleChange = (e) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  // Handles clear button click
  const handleClear = (e) => {
    e.preventDefault();

    if (!isControlled) {
      setInternalValue("");
    }

    // Call onClear callback if provided
    onClear?.();

    // Call onChange with empty value
    if (onChange) {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      };
      onChange(syntheticEvent);
    }
  };

  // Determine if we should show the clear button
  const shouldShowClear =
    showClearButton && currentValue && currentValue.length > 0;

  const mergedIcons = {
    isActive: true,
    leftIcon: icons.leftIcon || {
      isActive: true,
      type: "lucid",
      content: "Search",
    },
    rightIcon: shouldShowClear
      ? {
          isActive: true,
          type: "lucid",
          content: "X",
          onClick: handleClear,
          title: "Clear search",
          classname: "inputSearch_clearButton",
        }
      : icons.rightIcon,
  };

  return (
    <InputGeneric
      ref={ref}
      type="text"
      icons={mergedIcons}
      value={isControlled ? value : internalValue}
      onChange={handleChange}
      {...restProps}
    />
  );
});

Input_search.propTypes = {
  showClearButton: PropTypes.bool,
  onClear: PropTypes.func,
  icons: PropTypes.shape({
    isActive: PropTypes.bool,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
  }),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

Input_search.displayName = "Input_search";

export default Input_search;
