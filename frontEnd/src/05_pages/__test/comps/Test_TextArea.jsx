import { useState } from "react";
import { TextAreaGeneric } from "../../../00_components/_components.index.js";
import "../styles/test_TextArea.css";

const Test_TextArea = () => {
  const [value, setValue] = useState("");

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    marginBottom: "3rem",
    padding: "1.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    // backgroundColor: "#ffffff",
  };

  const groupStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    alignItems: "flex-end",
  };

  return (
    <div style={{ maxWidth: "800px", padding: "1rem" }}>
      <h1 className="testPage_heading" style={{ marginBottom: "2rem" }}>
        TextArea Showcase
      </h1>

      {/* 1. SIZES */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem", color: "#374151" }}>1. Sizes</h2>
        <div style={groupStyle}>
          <TextAreaGeneric size="xs" label={{ text: "Extra Small (xs)" }} placeholder="Size xs" />
          <TextAreaGeneric size="s" label={{ text: "Small (s)" }} placeholder="Size s" />
          <TextAreaGeneric size="m" label={{ text: "Medium (m) - Default" }} placeholder="Size m" />
          <TextAreaGeneric size="l" label={{ text: "Large (l)" }} placeholder="Size l" />
          <TextAreaGeneric size="xl" label={{ text: "Extra Large (xl)" }} placeholder="Size xl" />
          <TextAreaGeneric size="xxl" label={{ text: "Double Extra Large (xxl)" }} placeholder="Size xxl" />
        </div>
      </section>

      {/* 2. VALIDATION STATES */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem", color: "#374151" }}>2. Validation States</h2>
        <div style={groupStyle}>
          <TextAreaGeneric label={{ text: "Default (None)" }} placeholder="No validation passed" />
          <TextAreaGeneric validation="success" label={{ text: "Success" }} placeholder="Looks good!" value="Valid input" readOnly />
          <TextAreaGeneric validation="warning" label={{ text: "Warning" }} placeholder="Be careful" />
          <TextAreaGeneric validation="error" label={{ text: "Error" }} placeholder="Something went wrong" />
        </div>
      </section>

      {/* 3. RESIZE OPTIONS */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem", color: "#374151" }}>3. Resize Modes</h2>
        <div style={groupStyle}>
          <TextAreaGeneric resize="vertical" label={{ text: "Vertical (Default)" }} placeholder="Can only resize up/down" />
          <TextAreaGeneric resize="horizontal" label={{ text: "Horizontal" }} placeholder="Can only resize left/right" />
          <TextAreaGeneric resize="both" label={{ text: "Both" }} placeholder="Can resize both ways" />
          <TextAreaGeneric resize="none" label={{ text: "None" }} placeholder="Cannot be resized" />
        </div>
      </section>

      {/* 4. LABEL POSITIONS */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem", color: "#374151" }}>4. Label Positions</h2>
        <div style={groupStyle}>
          <TextAreaGeneric label={{ text: "Top-Left", position: "top-left" }} placeholder="Label is top-left" />
          <TextAreaGeneric label={{ text: "Top-Right", position: "top-right" }} placeholder="Label is top-right" />
          <TextAreaGeneric label={{ text: "Bottom-Left", position: "bottom-left" }} placeholder="Label is bottom-left" />
          <TextAreaGeneric label={{ text: "Bottom-Right", position: "bottom-right" }} placeholder="Label is bottom-right" />
          <TextAreaGeneric label={{ text: "Before", position: "before" }} placeholder="Label is before" />
          <TextAreaGeneric label={{ text: "After", position: "after" }} placeholder="Label is after" />
        </div>
      </section>

      {/* 5. STATES (Controlled, Disabled, ReadOnly) */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem", color: "#374151" }}>5. Special States</h2>
        <div style={groupStyle}>
          <TextAreaGeneric disabled label={{ text: "Disabled State" }} placeholder="This is disabled" value="Cannot edit me" />
          <TextAreaGeneric readOnly label={{ text: "Read-Only State" }} placeholder="This is read-only" value="Can select but not edit" />
          <TextAreaGeneric
            label={{ text: `Controlled Input (${value.length}/50)` }}
            placeholder="Type something..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={50}
          />
        </div>
      </section>

      {/* 6. FULL WIDTH */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem", color: "#374151" }}>6. Full Width</h2>
        <TextAreaGeneric fullWidth label={{ text: "Full Width Textarea" }} placeholder="This takes up the full width of its container" />
      </section>
    </div>
  );
};

export default Test_TextArea;
