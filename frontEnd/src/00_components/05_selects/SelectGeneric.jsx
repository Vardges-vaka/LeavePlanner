import { forwardRef, useState, useCallback, useMemo, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { icons, ChevronDown } from "lucide-react";
import "./_styles/selectGeneric.css";

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

// Helper: Renders an icon (Lucide or image) as either a static span or clickable button
const renderIcon = (iconConfig, isOptionIcon = false) => {
  if (!iconConfig || !iconConfig.isActive || !iconConfig.content) return null;

  const content = (
    <>
      {iconConfig.type === "lucid" ? (
        (() => {
          const iconName =
            iconConfig.content.charAt(0).toUpperCase() +
            iconConfig.content.slice(1);
          const LucideIcon = icons[iconName];
          if (!LucideIcon) {
            setTimeout(
              () =>
                alert(`[SelectGeneric] Lucide icon "${iconName}" not found.`),
              0,
            );
            return null;
          }
          return <LucideIcon aria-hidden="true" />;
        })()
      ) : (
        <img
          src={iconConfig.content}
          alt={iconConfig.title || ""}
          aria-hidden={!iconConfig.title}
        />
      )}
    </>
  );

  if (iconConfig.onClick) {
    return (
      <button
        type="button"
        className={`${isOptionIcon ? "selectGeneric_optionIconButton" : "selectGeneric_iconButton"} ${iconConfig.classname || ""}`}
        onClick={(e) => {
          e.stopPropagation(); // don't close select when clicking an icon inside
          iconConfig.onClick(e);
        }}
        onMouseEnter={iconConfig.onHover}
        title={iconConfig.title}
        tabIndex="-1">
        {content}
      </button>
    );
  }

  return (
    <span
      className={`${isOptionIcon ? "selectGeneric_optionIcon" : "selectGeneric_iconStatic"} ${iconConfig.classname || ""}`}
      onMouseEnter={iconConfig.onHover}
      title={iconConfig.title}>
      {content}
    </span>
  );
};

/**
 * SelectGeneric - Custom dropdown component matching InputGeneric styles
 * 
 * @param {Object} props - Component props
 * @param {string} [props.data_*] - Custom data attribute (ex: data_user="123" -> data-user="123", accessible via e.target.dataset.user)
 * @param {React.Ref} ref - Forwarded ref to the hidden native input element
 */
const SelectGeneric = forwardRef(function SelectGeneric(props, ref) {
  const {
    label = {
      text: "",
      position: "top-left",
      classname: "",
      onClick: false,
      onHover: false,
      title: "",
    },
    icons: iconsConfig = {
      isActive: false,
      leftIcon: null,
      rightIcon: null,
    },
    options = [],
    size = "m",
    fullWidth = false,
    validation,
    className = "",
    id,
    disabled = false,
    onChange,
    onFocus,
    onBlur,
    placeholder = "Select an option...",
    value,
    defaultValue,
    name,
    ...restProps
  } = props;

  const dataAttrs = useMemo(() => extractDataAttrs(restProps), [restProps]);

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  const containerRef = useRef(null);

  const controlledValue = value !== undefined ? value : internalValue;

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === controlledValue),
    [options, controlledValue],
  );

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        if (isFocused) {
          setIsFocused(false);
          onBlur?.();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFocused, onBlur]);

  const handleFocus = useCallback(
    (e) => {
      if (!disabled) {
        setIsFocused(true);
        onFocus?.(e);
      }
    },
    [disabled, onFocus],
  );

  const handleToggle = (e) => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    if (!isFocused) {
      handleFocus(e);
    }
  };

  const handleSelect = (option, e) => {
    if (option.disabled || disabled) return;
    
    if (value === undefined) {
      setInternalValue(option.value);
    }

    // Build a dataset object that mimics the DOMStringMap from dataAttrs
    const mockDataset = {};
    for (const key in dataAttrs) {
      // "data-user-id" -> "userId"
      const camelKey = key
        .replace(/^data-/, "")
        .replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      mockDataset[camelKey] = dataAttrs[key];
    }

    const syntheticEvent = {
      ...e,
      target: {
        value: option.value,
        name: name,
        dataset: mockDataset,
      },
    };

    onChange?.(syntheticEvent);
    setIsOpen(false);
  };

  const rootClassName = useMemo(() => {
    const classes = ["selectGeneric_wrapper", `selectGeneric-${size}`];

    if (label && label.text) {
      classes.push(`selectGeneric-label-${label.position || "top-left"}`);
    }

    if (fullWidth) classes.push("selectGeneric-fullWidth");
    if (disabled) classes.push("selectGeneric-wrapper-disabled");
    if (className) classes.push(className);

    return classes.join(" ");
  }, [size, fullWidth, disabled, className, label]);

  const containerClass = useMemo(() => {
    const classes = ["selectGeneric_container"];
    if (isFocused || isOpen) classes.push("selectGeneric_container-focused");
    if (validation) classes.push(`selectGeneric_container-${validation}`);
    if (disabled) classes.push("selectGeneric_container-disabled");
    return classes.join(" ");
  }, [isFocused, isOpen, validation, disabled]);

  const leftIconElement =
    iconsConfig?.isActive && iconsConfig.leftIcon
      ? renderIcon(iconsConfig.leftIcon)
      : null;

  // Render a default chevron if no right icon is specifically disabled or substituted
  let rightIconElement = null;
  if (iconsConfig?.isActive && iconsConfig.rightIcon) {
    rightIconElement = renderIcon(iconsConfig.rightIcon);
  } else if (!iconsConfig || iconsConfig.isActive !== false) {
    // If icons config isn't explicitly disabled, show default chevron
    rightIconElement = (
      <span className="selectGeneric_iconStatic" style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>
        <ChevronDown aria-hidden="true" />
      </span>
    );
  }

  const displayElement = (
    <div 
      className={containerClass}
      onClick={handleToggle}
      tabIndex={disabled ? -1 : 0}
      onFocus={handleFocus}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      {...dataAttrs}
    >
      {leftIconElement && (
        <div className="selectGeneric_leftIconWrapper">{leftIconElement}</div>
      )}
      
      <div className="selectGeneric_input" id={id}>
         {selectedOption ? (
           <span>{selectedOption.text}</span>
         ) : (
           <span className="selectGeneric_placeholder">{placeholder}</span>
         )}
      </div>

      {rightIconElement && (
        <div className="selectGeneric_rightIconWrapper">{rightIconElement}</div>
      )}

      {/* Hidden native input for form submissions and ref forwarding */}
      {name && (
        <input ref={ref} type="hidden" name={name} value={controlledValue || ""} />
      )}
      {!name && <input ref={ref} type="hidden" value={controlledValue || ""} />}
    </div>
  );

  if (label && label.text) {
    const labelClick =
      typeof label.onClick === "function" ? label.onClick : undefined;
    const labelHover =
      typeof label.onHover === "function" ? label.onHover : undefined;

    return (
      <div className={rootClassName} ref={containerRef}>
        {["top-left", "top-right", "before"].includes(
          label.position || "top-left",
        ) && (
          <label
            htmlFor={id}
            className={`selectGeneric_label ${label.classname || ""}`}
            onClick={labelClick}
            onMouseEnter={labelHover}
            title={label.title}>
            {label.text}
          </label>
        )}

        <div style={{ position: "relative", width: "100%" }}>
          {displayElement}
          
          {isOpen && !disabled && (
            <ul className="selectGeneric_menu" role="listbox">
              {options.length > 0 ? options.map((opt) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={controlledValue === opt.value}
                  className={`selectGeneric_option ${controlledValue === opt.value ? 'selectGeneric_option-active' : ''} ${opt.disabled ? 'selectGeneric_option-disabled' : ''}`}
                  onClick={(e) => handleSelect(opt, e)}
                >
                  <div className="selectGeneric_option-content">
                    {opt.leftIcon && <span className="selectGeneric_optionIcon">{opt.leftIcon}</span>}
                    <span>{opt.text}</span>
                  </div>
                  {opt.rightIcon && <span className="selectGeneric_optionIcon" onClick={(e) => e.stopPropagation()}>{opt.rightIcon}</span>}
                </li>
              )) : (
                <li className="selectGeneric_option selectGeneric_option-disabled">No options available</li>
              )}
            </ul>
          )}
        </div>

        {["bottom-left", "bottom-right", "after"].includes(label.position) && (
          <label
            htmlFor={id}
            className={`selectGeneric_label ${label.classname || ""}`}
            onClick={labelClick}
            onMouseEnter={labelHover}
            title={label.title}>
            {label.text}
          </label>
        )}
      </div>
    );
  }

  return (
    <div className={rootClassName} ref={containerRef}>
      <div style={{ position: "relative", width: "100%" }}>
        {displayElement}
        
        {isOpen && !disabled && (
          <ul className="selectGeneric_menu" role="listbox">
            {options.length > 0 ? options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={controlledValue === opt.value}
                className={`selectGeneric_option ${controlledValue === opt.value ? 'selectGeneric_option-active' : ''} ${opt.disabled ? 'selectGeneric_option-disabled' : ''}`}
                onClick={(e) => handleSelect(opt, e)}
              >
                <div className="selectGeneric_option-content">
                  {opt.leftIcon && <span className="selectGeneric_optionIcon">{opt.leftIcon}</span>}
                  <span>{opt.text}</span>
                </div>
                {opt.rightIcon && <span className="selectGeneric_optionIcon" onClick={(e) => e.stopPropagation()}>{opt.rightIcon}</span>}
              </li>
            )) : (
              <li className="selectGeneric_option selectGeneric_option-disabled">No options available</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
});

const labelPropType = PropTypes.shape({
  text: PropTypes.string,
  position: PropTypes.oneOf([
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "before",
    "after",
  ]),
  classname: PropTypes.string,
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onHover: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  title: PropTypes.string,
});

const iconPropType = PropTypes.shape({
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  title: PropTypes.string,
  classname: PropTypes.string,
  type: PropTypes.oneOf(["lucid", "img"]),
  content: PropTypes.string,
});

const optionPropType = PropTypes.shape({
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
});

SelectGeneric.propTypes = {
  label: labelPropType,
  icons: PropTypes.shape({
    isActive: PropTypes.bool,
    leftIcon: iconPropType,
    rightIcon: iconPropType,
  }),
  options: PropTypes.arrayOf(optionPropType),
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl", "xxl"]),
  fullWidth: PropTypes.bool,
  validation: PropTypes.oneOf(["error", "success", "warning"]),
  className: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
};

SelectGeneric.displayName = "SelectGeneric";

export default SelectGeneric;
