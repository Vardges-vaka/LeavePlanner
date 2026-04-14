import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { icons } from "lucide-react";
import "./_styles/modalGeneric.css";

const ModalGeneric = forwardRef(function ModalGeneric(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["modalGeneric"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const modalElement = <div ref={ref} className={rootClassName}></div>;

  return modalElement;
});

ModalGeneric.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

ModalGeneric.displayName = "ModalGeneric";

export default ModalGeneric;
