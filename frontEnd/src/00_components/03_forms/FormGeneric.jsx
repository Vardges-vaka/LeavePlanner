import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { icons } from "lucide-react";
import "./_styles/formGeneric.css";

const FormGeneric = forwardRef(function FormGeneric(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["formGeneric"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const formElement = <form ref={ref} className={rootClassName}></form>;

  return formElement;
});

FormGeneric.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

FormGeneric.displayName = "FormGeneric";

export default FormGeneric;
