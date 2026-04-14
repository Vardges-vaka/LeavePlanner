import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import InputGeneric from "./InputGeneric.jsx";
import { icons } from "lucide-react";
import "./_styles/input_file.css";

const Input_file = forwardRef(function Input_file(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["input_file"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const inputElement = <input ref={ref} className={rootClassName}></input>;

  return inputElement;
});

Input_file.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

Input_file.displayName = "Input_file";

export default Input_file;
/*



Input_search
Input_range 
Input_file


*/
