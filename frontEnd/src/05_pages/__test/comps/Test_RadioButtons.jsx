import { useState } from "react";
import { RadioButtons } from "../../../00_components/_components.index.js";
import "../styles/test_Toggler.css"; // Reuse existing test layout styles if suitable

const Test_RadioButtons = () => {
  const [singleValue, setSingleValue] = useState("option2");
  const [multiValue, setMultiValue] = useState(["option1", "option3"]);
  const [togglerValue, setTogglerValue] = useState("apple");

  const checkboxOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2 (Default)" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4 (Disabled)", disabled: true },
  ];

  const togglerOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    marginBottom: "3rem",
    padding: "1.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
  };

  return (
    <div>
      <h1 className="testPage_heading">RadioButtons Showcase</h1>

      <section style={sectionStyle}>
        <h2>1. Default Checkboxes (Vertical, Single Choice)</h2>
        <div>
          <RadioButtons
            options={checkboxOptions}
            value={singleValue}
            onChange={(e) => setSingleValue(e.target.value)}
            name="demo-single"
          />
          <p style={{ marginTop: "1rem" }}>Selected: {singleValue}</p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>2. Horizontal Checkboxes (Multiple Choice, custom color)</h2>
        <div>
          <RadioButtons
            options={checkboxOptions}
            layout="horizontal"
            multiple={true}
            value={multiValue}
            onChange={(e) => setMultiValue(e.target.value)}
            color="#ec4899"
          />
          <p style={{ marginTop: "1rem" }}>Selected: {JSON.stringify(multiValue)}</p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>3. Toggler Type (Single Choice, Horizontal)</h2>
        <div>
          <RadioButtons
            options={togglerOptions}
            layout="horizontal"
            type={{ component: "toggler" }}
            value={togglerValue}
            onChange={(e) => setTogglerValue(e.target.value)}
            colors={{ bg: "#8b5cf6" }}
          />
          <p style={{ marginTop: "1rem" }}>Selected: {togglerValue}</p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>4. Toggler Type (Multiple Choice, Rectangular, Left Labels)</h2>
        <div>
          <RadioButtons
            options={togglerOptions.map(o => ({
              ...o, 
              label: { text: o.label, position: "before" }
            }))}
            multiple={true}
            layout="vertical"
            type={{ component: "toggler", shape: "rectangular" }}
            colors={{ bg: "#10b981", txt: "white" }}
            innerContent={{ on: "ON", off: "OFF" }}
          />
          <p style={{ marginTop: "1rem", color: "gray" }}>Uncontrolled Multiple Choice togglers</p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>5. Dataset Passing</h2>
        <div>
          <RadioButtons
            options={[{ value: "data-test", label: "Check console on click" }]}
            data_custom_id="test-123"
            onChange={(e) => console.log("Dataset extracted:", e.target.dataset)}
          />
        </div>
      </section>
    </div>
  );
};

export default Test_RadioButtons;