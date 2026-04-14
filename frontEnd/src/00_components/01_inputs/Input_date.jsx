import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import InputGeneric from "./InputGeneric.jsx";
import { icons } from "lucide-react";
import "./_styles/input_date.css";

const Input_date = forwardRef(function Input_date(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["Input_date"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const inputElement = <input ref={ref} className={rootClassName}></input>;

  return inputElement;
});

Input_date.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

Input_date.displayName = "Input_date";

export default Input_date;
/*
Input_date
Input_psw
Input_email
Input_number
Input_date


Input_search
Input_range 
Input_file
Input_checkbox

*/
