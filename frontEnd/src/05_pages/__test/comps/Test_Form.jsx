import { useState, useCallback, useRef } from "react";
import { FormGeneric } from "../../../00_components/_components.index.js";
import "../styles/test_Form.css";

const Test_Form = () => {
  return (
    <div>
      <h1 className="testPage_heading">Form Showcase</h1>
      <FormGeneric />
    </div>
  );
};

export default Test_Form;
