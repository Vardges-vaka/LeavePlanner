import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { icons } from "lucide-react";
import ButtonGenericLoader from "./ButtonGenericLoader.jsx";
import ButtonGenericTooltip from "./ButtonGenericTooltip.jsx";
import "./_styles/buttonGeneric.css";

/* ═══════════════════════════════════════════════════════════════
 *  ButtonGeneric  —  Shared stateless button component
 * ═══════════════════════════════════════════════════════════════
 *
 *  LOCATION
 *    frontEnd/src/00_components/00_buttons/ButtonGeneric.jsx
 *
 *  PURPOSE
 *    A single, reusable <button> element whose appearance and
 *    behaviour are 100 % driven by props.  It holds no business
 *    logic — the parent component owns all state and handlers.
 *
 *  VERSIONS  (visual variants)
 *    "primary"   – high-emphasis actions (confirm, submit, save)
 *    "secondary" – medium-emphasis actions (cancel, go back, dismiss)
 *    "normal"    – default / neutral actions (general navigation)
 *
 *  SIZES
 *    "xs" | "s" | "m" | "l" | "xl" | "xxl"
 *    Each size scales padding, font-size, border-radius, icon
 *    dimensions, and the loading spinner proportionally.
 *
 *  ICON SYSTEM  (dual)
 *    1. Lucide-react by name string:
 *       icon={{ left: { name: "ArrowLeft" } }}
 *       The component imports { icons } from "lucide-react" and
 *       resolves the React component at runtime.
 *    2. Custom image by src object:
 *       icon={{ left: { img: { src: "/icon.svg", alt: "Go" } } }}
 *       Renders a plain <img> tag.
 *    Either type can be placed on the left side, right side, or
 *    both sides independently.
 *
 *  LOADING STATE
 *    When loading={true} the button:
 *      - Overlays a spinning ring (ButtonGenericLoader) centred
 *        on top of the content.
 *      - Fades the content to opacity 0.3 so the spinner is
 *        clearly visible.
 *      - Automatically becomes disabled (unclickable).
 *
 *  TOOLTIP
 *    Pass tooltip="Some hint" and a custom-styled tooltip appears
 *    above the button on hover / keyboard focus.  Uses the
 *    internal ButtonGenericTooltip sub-component.
 *
 *  THEME SUPPORT
 *    All colours reference CSS custom properties defined in
 *    App.css under :root (light) and [data-theme="dark"] (dark).
 *    The button transitions colours over 0.25 s so theme toggles
 *    look smooth.
 *
 *  CLASSNAME CONVENTION
 *    Root:        buttonGeneric
 *    Modifiers:   buttonGeneric-primary, buttonGeneric-m, etc.
 *    Children:    buttonGeneric_content, buttonGeneric_iconLeft, …
 *    A custom className prop is appended to the end of the class
 *    string, never replacing the defaults.
 *
 *  DATA ATTRIBUTES
 *    Any prop whose key starts with "data_" (e.g. data_userId)
 *    is converted to an HTML data-* attribute (data-userid) and
 *    spread onto the <button>.  Read back with e.target.dataset.
 *
 *  FORWARDED REF
 *    Wrapped with React.forwardRef so parent code can obtain
 *    a reference to the underlying <button> DOM node for focus
 *    management, scroll-into-view, measurements, etc.
 *
 *  ACCESSIBILITY
 *    - :focus-visible ring on keyboard navigation (hidden on
 *      mouse click).
 *    - aria-label prop for icon-only buttons.
 *    - aria-busy set when loading.
 *    - role="status" on the spinner.
 *    - role="tooltip" on the tooltip.
 *
 *  INTERNAL SUB-COMPONENTS  (not exported via barrel)
 *    ButtonGenericLoader.jsx   – spinning ring, adapts to size/version
 *    ButtonGenericTooltip.jsx  – themed tooltip, fade-in animation
 *
 *  BARREL EXPORT
 *    Only ButtonGeneric is exported from _buttons.index.js.
 * ═══════════════════════════════════════════════════════════════ */

const extractDataAttrs = (allProps) => {
  const attrs = {};
  for (const key in allProps) {
    if (key.startsWith("data_")) {
      attrs[key.replace("data_", "data-")] = allProps[key];
    }
  }
  return attrs;
};

const renderIcon = (iconConfig, sizeClass) => {
  if (!iconConfig) return null;

  if (iconConfig.name) {
    const LucideIcon = icons[iconConfig.name];
    if (!LucideIcon) {
      console.warn(
        `[ButtonGeneric] Lucide icon "${iconConfig.name}" not found.`,
      );
      return null;
    }
    return <LucideIcon aria-hidden="true" />;
  }

  if (iconConfig.img) {
    const { src, alt = "", width, height } = iconConfig.img;
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        aria-hidden={!alt}
      />
    );
  }

  return null;
};

const ButtonGeneric = forwardRef(function ButtonGeneric(props, ref) {
  const {
    // Label text rendered inside the button.
    // Omit entirely for icon-only buttons (pair with ariaLabel).
    text,

    // Icon configuration object with optional "left" and "right" slots.
    // Each slot accepts EITHER { name: "LucideIconName" } for a
    // lucide-react icon OR { img: { src, alt, width?, height? } }
    // for a custom <img> tag — never both on the same slot.
    icon,

    // Visual variant that controls colour scheme.
    //   "primary"   → solid indigo bg, white text  (confirm / submit)
    //   "secondary" → transparent bg, indigo border (cancel / back)
    //   "normal"    → neutral bg and border         (general use)
    version = "normal",

    // Scales padding, font-size, border-radius, icon size, and
    // the loading spinner.  One of: "xs" | "s" | "m" | "l" | "xl" | "xxl".
    size = "m",

    // When true the button stretches to width: 100 % of its parent
    // container — useful for mobile layouts and form submit rows.
    fullWidth = false,

    // Enables the loading overlay: a centred spinner appears on top
    // of the content (opacity 0.3) and the button becomes disabled
    // automatically so clicks are blocked.
    loading = false,

    // Manually disables the button (reduced opacity, cursor: not-allowed).
    // Also applied implicitly when loading is true.
    disabled = false,

    // If provided, a custom styled tooltip renders above the button
    // on mouseenter and keyboard focus, and hides on leave / blur.
    tooltip,

    // Standard DOM event handlers — forwarded directly to the
    // underlying <button> element.  onMouseEnter / onMouseLeave /
    // onFocus / onBlur are also used internally to toggle the
    // tooltip, but the consumer's handler is still called.
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,

    // HTML button type attribute.  Defaults to "button" to avoid
    // accidental form submissions; set to "submit" inside forms.
    type = "button",

    // One or more extra CSS classes appended to the built-in
    // className string.  Never replaces the defaults.
    className = "",

    // Accessible label read by screen readers.  Required when
    // the button has no visible text (icon-only buttons).
    ariaLabel,

    // Override the default tab order.  Usually not needed; use
    // only when you need to pull the button out of normal flow.
    tabIndex,

    // HTML id attribute — handy for label association or
    // programmatic element lookup.
    id,
  } = props;

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = useCallback(
    (e) => {
      if (tooltip) setTooltipVisible(true);
      onMouseEnter?.(e);
    },
    [tooltip, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e) => {
      if (tooltip) setTooltipVisible(false);
      onMouseLeave?.(e);
    },
    [tooltip, onMouseLeave],
  );

  const handleFocus = useCallback(
    (e) => {
      if (tooltip) setTooltipVisible(true);
      onFocus?.(e);
    },
    [tooltip, onFocus],
  );

  const handleBlur = useCallback(
    (e) => {
      if (tooltip) setTooltipVisible(false);
      onBlur?.(e);
    },
    [tooltip, onBlur],
  );

  const dataAttrs = useMemo(() => extractDataAttrs(props), [props]);

  const leftIcon = icon?.left ? renderIcon(icon.left, size) : null;
  const rightIcon = icon?.right ? renderIcon(icon.right, size) : null;

  const rootClassName = useMemo(() => {
    const classes = [
      "buttonGeneric",
      `buttonGeneric-${version}`,
      `buttonGeneric-${size}`,
    ];
    if (fullWidth) classes.push("buttonGeneric-fullWidth");
    if (loading) classes.push("buttonGeneric-loading");
    if (disabled || loading) classes.push("buttonGeneric-disabled");
    if (className) classes.push(className);
    return classes.join(" ");
  }, [version, size, fullWidth, loading, disabled, className]);

  const isDisabled = disabled || loading;

  const buttonElement = (
    <button
      ref={ref}
      type={type}
      className={rootClassName}
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      tabIndex={tabIndex}
      id={id}
      {...dataAttrs}>
      <span className="buttonGeneric_content">
        {leftIcon && <span className="buttonGeneric_iconLeft">{leftIcon}</span>}
        {text && <span className="buttonGeneric_text">{text}</span>}
        {rightIcon && (
          <span className="buttonGeneric_iconRight">{rightIcon}</span>
        )}
      </span>

      {loading && (
        <span className="buttonGeneric_loaderOverlay">
          <ButtonGenericLoader size={size} version={version} />
        </span>
      )}
    </button>
  );

  if (tooltip) {
    return (
      <span className="buttonGeneric_tooltipWrap">
        {buttonElement}
        <ButtonGenericTooltip text={tooltip} visible={tooltipVisible} />
      </span>
    );
  }

  return buttonElement;
});

ButtonGeneric.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.shape({
    left: PropTypes.shape({
      name: PropTypes.string,
      img: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    }),
    right: PropTypes.shape({
      name: PropTypes.string,
      img: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    }),
  }),

  version: PropTypes.oneOf(["primary", "secondary", "normal"]),
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl", "xxl"]),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  tabIndex: PropTypes.number,
  id: PropTypes.string,
};

ButtonGeneric.displayName = "ButtonGeneric";

export default ButtonGeneric;
