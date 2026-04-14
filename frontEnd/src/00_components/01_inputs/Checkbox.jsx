import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import InputGeneric from "./InputGeneric.jsx";
import { icons } from "lucide-react";
import "./_styles/checkbox.css";

const Checkbox = forwardRef(function Checkbox(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["checkbox"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const inputElement = <input ref={ref} className={rootClassName}></input>;

  return inputElement;
});

Checkbox.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
/*



Input_search
Input_range 
Input_file
Input_checkbox

*/
