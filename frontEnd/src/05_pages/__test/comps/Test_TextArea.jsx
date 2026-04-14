import { useState, useCallback, useRef } from "react";
import { TextAreaGeneric } from "../../../00_components/_components.index.js";
import "../styles/test_TextArea.css";

const Test_TextArea = () => {
  return (
    <div>
      <h1 className="testPage_heading">TextArea Showcase</h1>
      <TextAreaGeneric />
    </div>
  );
};

export default Test_TextArea;
