import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { icons } from "lucide-react";
import "./_styles/form_signin.css";

const Form_signin = forwardRef(function Form_signin(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["form_signin"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const formElement = <form ref={ref} className={rootClassName}></form>;

  return formElement;
});

Form_signin.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

Form_signin.displayName = "Form_signin";

export default Form_signin;
