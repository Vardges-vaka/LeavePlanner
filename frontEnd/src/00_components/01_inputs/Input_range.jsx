import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import InputGeneric from "./InputGeneric.jsx";
import { icons } from "lucide-react";
import "./_styles/input_range.css";

const Input_range = forwardRef(function Input_range(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["input_range"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const inputElement = <input ref={ref} className={rootClassName}></input>;

  return inputElement;
});

Input_range.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

Input_range.displayName = "Input_range";

export default Input_range;

