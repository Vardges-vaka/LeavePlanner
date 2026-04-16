import { useState } from "react";
import { ButtonGeneric } from "../../../00_components/_components.index.js";
import "../styles/test_Input.css";
import {
  InputText,
  InputPsw,
  InputEmail,
  InputNumber,
  InputDate,
  InputUrl,
  InputTel,
  InputSearch,
  InputRange,
  InputFile,
  InputCheckbox,
} from "./input/_inputTests.index.js";

const Test_Input = () => {
  const [activeTab, setActiveTab] = useState("text");

  return (
    <div>
      <h1 className="testPage_heading">Input Showcase</h1>

      {/* Navigation Panel */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "1rem",
        }}>
        <ButtonGeneric
          text="Text Input"
          version={activeTab === "text" ? "primary" : "secondary"}
          onClick={() => setActiveTab("text")}
        />
        <ButtonGeneric
          text="Password Input"
          version={activeTab === "psw" ? "primary" : "secondary"}
          onClick={() => setActiveTab("psw")}
        />
        <ButtonGeneric
          text="Email Input"
          version={activeTab === "email" ? "primary" : "secondary"}
          onClick={() => setActiveTab("email")}
        />
        <ButtonGeneric
          text="Number Input"
          version={activeTab === "number" ? "primary" : "secondary"}
          onClick={() => setActiveTab("number")}
        />
        <ButtonGeneric
          text="URL Input"
          version={activeTab === "url" ? "primary" : "secondary"}
          onClick={() => setActiveTab("url")}
        />{" "}
        <ButtonGeneric
          text="Tel Input"
          version={activeTab === "tel" ? "primary" : "secondary"}
          onClick={() => setActiveTab("tel")}
        />
        <ButtonGeneric
          text="Date Input"
          version={activeTab === "date" ? "primary" : "secondary"}
          onClick={() => setActiveTab("date")}
        />
        <ButtonGeneric
          text="Search Input"
          version={activeTab === "search" ? "primary" : "secondary"}
          onClick={() => setActiveTab("search")}
        />
        <ButtonGeneric
          text="Checkbox Input"
          version={activeTab === "checkbox" ? "primary" : "secondary"}
          onClick={() => setActiveTab("checkbox")}
        />
        <ButtonGeneric
          text="File Input"
          version={activeTab === "file" ? "primary" : "secondary"}
          onClick={() => setActiveTab("file")}
        />
        <ButtonGeneric
          text="Range Input"
          version={activeTab === "range" ? "primary" : "secondary"}
          onClick={() => setActiveTab("range")}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: "1rem",
          maxWidth: "400px",
        }}>
        {activeTab === "text" && <InputText />}

        {activeTab === "psw" && <InputPsw />}

        {activeTab === "email" && <InputEmail />}

        {activeTab === "number" && <InputNumber />}

        {activeTab === "url" && <InputUrl />}

        {activeTab === "tel" && <InputTel />}

        {activeTab === "date" && <InputDate />}

        {activeTab === "search" && <InputSearch />}

        {activeTab === "range" && <InputRange />}

        {activeTab === "file" && <InputFile />}

        {activeTab === "checkbox" && <InputCheckbox />}
      </div>
    </div>
  );
};

export default Test_Input;
