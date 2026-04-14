import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import InputGeneric from "./InputGeneric.jsx";
import { icons } from "lucide-react";
import "./_styles/input_tel.css";

const Input_tel = forwardRef(function Input_tel(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["Input_tel"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const inputElement = <input ref={ref} className={rootClassName}></input>;

  return inputElement;
});

Input_tel.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

Input_tel.displayName = "Input_tel";

export default Input_tel;
/*



Input_search
Input_range 
Input_file
Input_checkbox

*/
