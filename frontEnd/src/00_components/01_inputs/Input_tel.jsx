import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import InputGeneric from "./InputGeneric.jsx";
import { icons } from "lucide-react";
import "./_styles/input_text.css";

const Input_text = forwardRef(function Input_text(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["input_text"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const inputElement = <input ref={ref} className={rootClassName}></input>;

  return inputElement;
});

Input_text.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

Input_text.displayName = "Input_text";

export default Input_text;
/*
Input_text
Input_psw
Input_email
Input_number
Input_date
Input_url
Input_tel

Input_search
Input_range 
Input_file
Input_checkbox

*/
