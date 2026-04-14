import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { icons } from "lucide-react";
import "./_styles/selectGeneric.css";

const SelectGeneric = forwardRef(function SelectGeneric(props, ref) {
  const { className = "" } = props;
  const { options = [] } = props;
  const rootClassName = useMemo(() => {
    const classes = ["selectGeneric"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const selectElement = <select ref={ref} className={rootClassName}></select>;

  return selectElement;
});

SelectGeneric.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

SelectGeneric.displayName = "SelectGeneric";

export default SelectGeneric;
