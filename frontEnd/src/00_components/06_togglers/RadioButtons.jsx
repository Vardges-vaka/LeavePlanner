import { forwardRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import Checkbox from "../01_inputs/Checkbox.jsx";
import TogglerGeneric from "./TogglerGeneric.jsx";
import "./_styles/radioButtons.css";

// Helper: Extracts data-* attributes from props object
const extractDataAttrs = (allProps) => {
  const attrs = {};
  for (const key in allProps) {
    if (key.startsWith("data_")) {
      attrs[key.replace("data_", "data-")] = allProps[key];
    }
  }
  return attrs;
};

/**
 * RadioButtons - A unified group component for mutually exclusive or multiple selections
 * utilizing either Checkbox or TogglerGeneric components.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.options - Array of option objects `{ label, value, ...overrides }`
 * @param {string} [props.layout="vertical"] - Layout direction: "vertical" or "horizontal"
 * @param {Object} [props.type] - Defines the internal component. `{ component: "checkbox" }` or `{ component: "toggler", shape: "oval" }`
 * @param {boolean} [props.multiple=false] - If true, acts as a checkbox group allowing array values.
 * @param {any} [props.value] - Controlled value. String for single, Array for multiple.
 * @param {any} [props.defaultValue] - Uncontrolled default value.
 * @param {Function} [props.onChange] - Handled synthetic event -> `e.target.value`
 * @param {boolean} [props.disabled=false] - Disables the entire group.
 * @param {string} [props.className] - Additional wrapper classes.
 * @param {string} [props.name] - Native name prop for the group.
 *
 * // Shared pass-through props to all children:
 * @param {string} [props.size="m"]
 * @param {string} [props.color] - Color for Checkboxes
 * @param {Object} [props.colors] - Colors for Togglers
 * @param {Object} [props.innerContent] - Inner content for Togglers
 * @param {string} [props.validation] - Global validation state
 */
const RadioButtons = forwardRef(function RadioButtons(props, ref) {
  const {
    options = [],
    layout = "vertical",
    type = { component: "checkbox" },
    multiple = false,
    value,
    defaultValue,
    onChange,
    disabled = false,
    className = "",
    name,
    size = "m",
    color,
    colors,
    innerContent,
    validation,
    ...restProps
  } = props;

  const dataAttrs = useMemo(() => extractDataAttrs(restProps), [restProps]);

  // Determine initial state
  const getInitialState = () => {
    if (defaultValue !== undefined) return defaultValue;
    return multiple ? [] : undefined;
  };

  const [internalValue, setInternalValue] = useState(getInitialState());
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const isOptionChecked = (optionValue) => {
    if (multiple) {
      if (!Array.isArray(currentValue)) return false;
      return currentValue.includes(optionValue);
    }
    return currentValue === optionValue;
  };

  const handleChange = (optionValue, e) => {
    if (disabled) return;

    let newValue;
    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      if (currentArray.includes(optionValue)) {
        newValue = currentArray.filter((v) => v !== optionValue);
      } else {
        newValue = [...currentArray, optionValue];
      }
    } else {
      newValue = optionValue;
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onChange) {
      // Create synthetic event
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          name: name,
          value: newValue,
          dataset: { ...dataAttrs },
        },
      };
      onChange(syntheticEvent);
    }
  };

  const wrapperClasses = useMemo(() => {
    const classes = ["radioButtons_wrapper"];
    if (layout === "horizontal") classes.push("radioButtons-horizontal");
    else classes.push("radioButtons-vertical");
    if (disabled) classes.push("radioButtons_wrapper-disabled");
    if (className) classes.push(className);
    return classes.join(" ");
  }, [layout, disabled, className]);

  return (
    <div className={wrapperClasses} ref={ref} {...dataAttrs}>
      {options.map((option, index) => {
        const {
          value: optValue,
          label: optLabel,
          disabled: optDisabled,
          ...optOverrides
        } = option;

        const checked = isOptionChecked(optValue);
        const itemDisabled = disabled || optDisabled;
        const itemKey = optValue !== undefined ? optValue : index;

        // Toggler Routing
        if (type?.component === "toggler") {
          return (
            <TogglerGeneric
              key={itemKey}
              name={name}
              checked={checked}
              onChange={(e) => handleChange(optValue, e)}
              disabled={itemDisabled}
              label={typeof optLabel === "string" ? { text: optLabel } : optLabel}
              shape={type.shape || "oval"}
              size={size}
              colors={colors}
              innerContent={innerContent}
              validation={validation}
              {...optOverrides}
            />
          );
        }

        // Default Checkbox Routing
        return (
          <Checkbox
            key={itemKey}
            name={name}
            checked={checked}
            onChange={(e) => handleChange(optValue, e)}
            disabled={itemDisabled}
            label={typeof optLabel === "string" ? optLabel : optLabel?.text}
            size={size}
            color={color}
            validation={validation}
            {...optOverrides}
          />
        );
      })}
    </div>
  );
});

RadioButtons.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      disabled: PropTypes.bool,
    })
  ).isRequired,
  layout: PropTypes.oneOf(["vertical", "horizontal"]),
  type: PropTypes.shape({
    component: PropTypes.oneOf(["checkbox", "toggler"]).isRequired,
    shape: PropTypes.oneOf(["oval", "rectangular"]),
  }),
  multiple: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  colors: PropTypes.object,
  innerContent: PropTypes.object,
  validation: PropTypes.string,
};

RadioButtons.displayName = "RadioButtons";

export default RadioButtons;