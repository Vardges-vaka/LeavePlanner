import { forwardRef, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { icons } from "lucide-react";
import "./_styles/textAreaGeneric.css";

const TextAreaGeneric = forwardRef(function TextAreaGeneric(props, ref) {
  const { className = "" } = props;
  const { rows = 1 } = props;
  const rootClassName = useMemo(() => {
    const classes = ["textAreaGeneric"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  const textAreaElement = <textarea ref={ref} className={rootClassName} rows={rows}></textarea>;

  return textAreaElement;
});

TextAreaGeneric.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

TextAreaGeneric.displayName = "TextAreaGeneric";

export default TextAreaGeneric;
