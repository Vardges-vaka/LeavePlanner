import { useState } from "react";
import {
  Header_public,
  Footer_public,
  ButtonGeneric,
} from "../../00_components/_components.index.js";
import {
  Test_Button,
  Test_Input,
  Test_Form,
  Test_TextArea,
  Test_Modal,
  Test_Select,
  Test_Toggler,
  Test_RadioButtons
} from "./comps/_comps.index.js";
import "./styles/test.css";

const Test = () => {
  const [testingState, setTestingState] = useState("button");

  const handleTestingStateChange = (state) => {
    setTestingState(state);
  };
  const renderComponent = () => {
    switch (testingState) {
      case "button":
        return <Test_Button />;
      case "input":
        return <Test_Input />;
      case "form":
        return <Test_Form />;
      case "textArea":
        return <Test_TextArea />;
      case "modal":
        return <Test_Modal />;
      case "select":
        return <Test_Select />;
      case "toggler":
        return <Test_Toggler />;
      case "radioButtons":
        return <Test_RadioButtons />;
      default:
        return <Test_Button />;
    }
  };

  return (
    <>
      <Header_public />
      <div className="testPage">
        <div className="testPage_controls">
          <ButtonGeneric
            text="Button"
            onClick={() => handleTestingStateChange("button")}
          />
          <ButtonGeneric
            text="Input"
            onClick={() => handleTestingStateChange("input")}
          />

          <ButtonGeneric
            text="TextArea"
            onClick={() => handleTestingStateChange("textArea")}
          />
   
          <ButtonGeneric
            text="Select"
            onClick={() => handleTestingStateChange("select")}
          />
          <ButtonGeneric
            text="Toggler"
            onClick={() => handleTestingStateChange("toggler")}
          />    
          <ButtonGeneric
            text="RadioButtons"
            onClick={() => handleTestingStateChange("radioButtons")}
          />
          <ButtonGeneric
            text="Modal"
            onClick={() => handleTestingStateChange("modal")}
          />      <ButtonGeneric
            text="Form"
            onClick={() => handleTestingStateChange("form")}
          />
        </div>

        {renderComponent()}
      </div>
      <Footer_public />
    </>
  );



};
/*

*/
export default Test;
