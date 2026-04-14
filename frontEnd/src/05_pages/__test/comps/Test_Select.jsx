import { useState, useCallback, useRef } from "react";
import { SelectGeneric } from "../../../00_components/_components.index.js";
import "../styles/test_Select.css";

const Test_Select = () => {
  return (
    <div>
      <h1 className="testPage_heading">Select Showcase</h1>
      <SelectGeneric />
    </div>
  );
};

export default Test_Select;
