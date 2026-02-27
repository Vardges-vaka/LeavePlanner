import PropTypes from "prop-types";
import "./_styles/day_night_toggle_01.css";

/**
 * @file Day_Night_Toggle_01.jsx
 * @description Circular sun / moon icon toggle for switching between light and
 * dark themes.  The icon morphs between a full circle (sun) and a crescent
 * (moon) using an SVG mask; six satellite dots animate in/out to represent
 * sun rays.
 *
 * This component is **controlled** — it holds no internal state.  The parent
 * is responsible for reading/writing the theme value (see ThemeContext /
 * useThemeContext).
 *
 * @module Day_Night_Toggle_01
 *
 *  * Circular day/night toggle rendered as an animated SVG icon inside a
 * circular button.
 *
 * @component
 *
 * @param {object}  props
 * @param {Function} props.onClick   - Called when the checkbox changes.
 *                                    Should call `toggleTheme()` from
 *                                    `useThemeContext`.
 * @param {boolean}  props.isDark    - Current theme state.  `true` → moon
 *                                    (dark mode); `false` → sun (light mode).
 * @param {string}  [props.size="M"] - Visual size token.
 *                                    One of: "XS" | "S" | "M" | "L" | "XL" | "XXL".
 *                                    Each token maps to a fixed px size defined
 *                                    in `day_night_toggle_01.css`.
 * @param {string}  [props.id]       - Base value for the checkbox `id` /
 *                                    label `htmlFor`.  Defaults to
 *                                    `"dayNightToggle01"`.  The resolved id is
 *                                    `{id}_{size}` to avoid collisions when
 *                                    multiple instances share a page.
 * @param {string}  [props.className] - Extra class(es) appended to every
 *                                    generated class string, useful for
 *                                    one-off positioning overrides.
 *
 * @example
 * ! Inside ThemeToggler or any component wrapped by ThemeProvider:
 * const { isDark, toggleTheme } = useThemeContext();
 * <Day_Night_Toggle_01 onClick={toggleTheme} isDark={isDark} size="L" />
 */

const Day_Night_Toggle_01 = ({
  onClick,
  isDark,
  className,
  id,
  size = "M",
}) => {
  const input_id = `${id ? id : "dayNightToggle01"}_${size ? size : "M"}`;
  const cnt_className = `dayNightToggle01_cnt ${className ? className : ""}`;
  const label_className = `${size ? size : "M"}_dayNightToggle01_label sunMoonToggler ${className ? className : ""}`;
  const input_className = `dayNightToggle01_input ${className ? className : ""}`;

  return (
    <div className={cnt_className}>
      <label
        htmlFor={input_id}
        className={label_className}
        aria-label="Toggle dark mode">
        <input
          type="checkbox"
          id={input_id}
          className={input_className}
          checked={isDark}
          onChange={() => onClick()}
        />
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="currentColor"
          // id={`SVG_${size ? size : "M"}`}
          className={`SVG_${size ? size : "M"}`}
          stroke="none">
          <mask id="moon-mask">
            <rect x="0" y="0" width="20" height="20" fill="white"></rect>
            <circle cx="11" cy="3" r="8" fill="black"></circle>
          </mask>
          <circle
            className="sunMoon"
            cx="10"
            cy="10"
            r="8"
            mask="url(#moon-mask)"></circle>
          <g>
            <circle className="sunDot sunDot1" cx="18" cy="10" r="1.5"></circle>
            <circle
              className="sunDot sunDot2"
              cx="14"
              cy="16.928"
              r="1.5"></circle>
            <circle
              className="sunDot sunDot3"
              cx="6"
              cy="16.928"
              r="1.5"></circle>
            <circle className="sunDot sunDot4" cx="2" cy="10" r="1.5"></circle>
            <circle
              className="sunDot sunDot5"
              cx="6"
              cy="3.1718"
              r="1.5"></circle>
            <circle
              className="sunDot sunDot6"
              cx="14"
              cy="3.1718"
              r="1.5"></circle>
          </g>
        </svg>
      </label>
    </div>
  );
};

Day_Night_Toggle_01.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.oneOf(["XS", "S", "M", "L", "XL", "XXL"]),
};

Day_Night_Toggle_01.defaultProps = {
  className: "",
  id: "dayNightToggle01",
  size: "M",
};
Day_Night_Toggle_01.displayName = "Day_Night_Toggle_01";

export default Day_Night_Toggle_01;
