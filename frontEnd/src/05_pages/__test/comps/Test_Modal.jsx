import { useState, useCallback, useRef } from "react";
import { ModalGeneric } from "../../../00_components/_components.index.js";
import "../styles/test_Modal.css";

const Test_Modal = () => {
  return (
    <div>
      <h1 className="testPage_heading">Modal Showcase</h1>
      <ModalGeneric />
    </div>
  );
};

export default Test_Modal;
