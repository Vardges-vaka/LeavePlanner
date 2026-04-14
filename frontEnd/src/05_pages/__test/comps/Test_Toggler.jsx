import { useState, useCallback, useRef } from "react";
import { TogglerGeneric } from "../../../00_components/_components.index.js";
import "../styles/test_Toggler.css";

const Test_Toggler = () => {
  return (
    <div>
      <h1 className="testPage_heading">TextArea Showcase</h1>
      <TogglerGeneric />
    </div>
  );
};

export default Test_Toggler;
