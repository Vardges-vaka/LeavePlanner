import PropTypes from "prop-types";
import "./_styles/day_night_toggle_02.css";

/**
 * @file Day_Night_Toggle_02.jsx
 * @description Pill / rectangular slider toggle that animates between a
 * night scene (black sky, stars, moon craters) and a day scene (blue sky,
 * white clouds, orange sun knob).
 *
 * This component is **controlled** — it holds no internal state.  The parent
 * is responsible for reading/writing the theme value (see ThemeContext /
 * useThemeContext).
 *
 * @module Day_Night_Toggle_02
 *
 *  * Animated day/night slider toggle with stars → clouds transition.
 *
 * @component
 *
 * @param {object}   props
 * @param {Function}  props.onClick     - Called on every checkbox change.
 *                                       Should call `toggleTheme()` from
 *                                       `useThemeContext`.
 * @param {boolean}   props.isDark      - Current theme state.
 *                                       `true`  → night scene (dark mode).
 *                                       `false` → day scene (light mode).
 *                                       Note: the checkbox `checked` prop is
 *                                       intentionally inverted (`!isDark`) so
 *                                       the visual "on" position corresponds
 *                                       to day/light mode.
 * @param {string}   [props.size="S"]   - Size token.
 *                                       One of: "XS" | "S" | "M" | "L" | "XL" | "XXL".
 *                                       Controls track width/height, knob size,
 *                                       and translateX distance via CSS classes
 *                                       defined in `day_night_toggle_02.css`.
 *                                       Size table (track W × H — knob — slide):
 *                                         XS  48 × 22 — 10px — 26px
 *                                         S   58 × 26 — 14px — 32px  ← default
 *                                         M   88 × 40 — 28px — 48px
 *                                         L  110 × 48 — 36px — 62px
 *                                         XL 132 × 58 — 46px — 74px
 *                                        XXL 154 × 68 — 56px — 86px
 * @param {string}   [props.shape="rect"] - Track shape.
 *                                        "rect" → 8 px border-radius (default).
 *                                        "oval" → fully pill-shaped (999 px).
 * @param {string}   [props.id]           - Base value for the checkbox `id` /
 *                                         label `htmlFor`.  Defaults to
 *                                         `"dayNightToggle02"`.
 * @param {string}   [props.className]    - Extra class(es) appended to wrapper
 *                                         and label for one-off overrides.
 *
 * @example
 * const { isDark, toggleTheme } = useThemeContext();
 *
 * ! Default (small, rectangular):
 * <Day_Night_Toggle_02 onClick={toggleTheme} isDark={isDark} />
 *
 * ! Large, oval:
 * <Day_Night_Toggle_02 onClick={toggleTheme} isDark={isDark} size="L" shape="oval" />
 */

const Day_Night_Toggle_02 = ({
  onClick,
  isDark,
  className,
  id,
  size = "S",
  shape = "rect",
}) => {
  const inputId = id || "dayNightToggle02";
  const containerClassName = `dayNightToggle02_cnt ${className ? className : ""}`;
  const labelClassName = [
    "dayNightToggle02_label",
    `${size}_dayNightToggle02_label`,
    `dayNightToggle02--${shape}`,
    "switch",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      <label
        htmlFor={inputId}
        className={labelClassName}
        aria-label="Toggle dark mode">
        <input
          type="checkbox"
          id={inputId}
          checked={!isDark}
          onChange={() => onClick()}
        />
        <span className="slider">
          <div className="moons-hole">
            <div className="moon-hole"></div>
            <div className="moon-hole"></div>
            <div className="moon-hole"></div>
          </div>
          <div className="black-clouds">
            <div className="black-cloud"></div>
            <div className="black-cloud"></div>
            <div className="black-cloud"></div>
          </div>
          <div className="clouds">
            <div className="cloud"></div>
            <div className="cloud"></div>
            <div className="cloud"></div>
            <div className="cloud"></div>
            <div className="cloud"></div>
            <div className="cloud"></div>
            <div className="cloud"></div>
          </div>
          <div className="stars">
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
            <svg className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
          </div>
        </span>
      </label>
    </div>
  );
};

Day_Night_Toggle_02.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.oneOf(["XS", "S", "M", "L", "XL", "XXL"]),
  shape: PropTypes.oneOf(["rect", "oval"]),
};

Day_Night_Toggle_02.defaultProps = {
  className: "",
  id: "dayNightToggle02",
  size: "S",
  shape: "rect",
};

Day_Night_Toggle_02.displayName = "Day_Night_Toggle_02";

export default Day_Night_Toggle_02;
