import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { icons } from "lucide-react";
import "./_styles/togglerGeneric.css";

const TogglerGeneric = forwardRef(function TogglerGeneric(props, ref) {
  const { className = "" } = props;

  const rootClassName = useMemo(() => {
    const classes = ["togglerGeneric"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const togglerElement = <div ref={ref} className={rootClassName}></div>;

  return togglerElement;
});

TogglerGeneric.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

TogglerGeneric.displayName = "TogglerGeneric";

export default TogglerGeneric;
