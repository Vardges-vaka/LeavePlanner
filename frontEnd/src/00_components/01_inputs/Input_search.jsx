import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import InputGeneric from "./InputGeneric.jsx";
import { icons } from "lucide-react";
import "./_styles/input_search.css";

const Input_search = forwardRef(function Input_search(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["input_search"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const inputElement = <input ref={ref} className={rootClassName}></input>;

  return inputElement;
});

Input_search.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

Input_search.displayName = "Input_search";

export default Input_search;

