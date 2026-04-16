import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { icons } from "lucide-react";
import "./_styles/form_forgotPsw.css";

const Form_forgotPsw = forwardRef(function Form_forgotPsw(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["form_forgotPsw"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const formElement = <form ref={ref} className={rootClassName}></form>;

  return formElement;
});

Form_forgotPsw.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

Form_forgotPsw.displayName = "Form_forgotPsw";

export default Form_forgotPsw;
