import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { icons } from "lucide-react";
import "./_styles/form_signup.css";

const Form_signup = forwardRef(function Form_signup(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["form_signup"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const formElement = <form ref={ref} className={rootClassName}></form>;

  return formElement;
});

Form_signup.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

Form_signup.displayName = "Form_signup";

export default Form_signup;
