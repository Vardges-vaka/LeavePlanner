import { Checkbox } from "../../../../00_components/_components.index.js";
import { useState } from "react";

const InputCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
      }}>
      {/* Basic checkbox */}
      <div>
        <h3>Basic Checkbox</h3>
        <Checkbox label="Accept terms and conditions" />
      </div>

      {/* Controlled checkbox */}
      <div>
        <h3>Controlled Checkbox</h3>
        <Checkbox
          label="Controlled checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
          Current state: {isChecked ? "Checked" : "Unchecked"}
        </p>
      </div>

      {/* Indeterminate state */}
      <div>
        <h3>Indeterminate State</h3>
        <Checkbox
          label="Select all items"
          indeterminate={isIndeterminate}
          checked={!isIndeterminate}
          onChange={(e) => {
            setIsIndeterminate(false);
          }}
        />
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
          Indeterminate: {isIndeterminate ? "Yes" : "No"}
        </p>
      </div>

      {/* Different sizes */}
      <div>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox label="Extra Small" size="xs" defaultChecked />
          <Checkbox label="Small" size="s" defaultChecked />
          <Checkbox label="Medium (default)" size="m" defaultChecked />
          <Checkbox label="Large" size="l" defaultChecked />
          <Checkbox label="Extra Large" size="xl" defaultChecked />
        </div>
      </div>

      {/* Validation states */}
      <div>
        <h3>Validation States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox
            label="Success - Terms accepted"
            validation="success"
            defaultChecked
          />
          <Checkbox label="Error - Required field" validation="error" />
          <Checkbox
            label="Warning - Please review"
            validation="warning"
            defaultChecked
          />
        </div>
      </div>

      {/* Label positions */}
      <div>
        <h3>Label Positions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox
            label="Label on right (default)"
            labelPosition="right"
            defaultChecked
          />
          <Checkbox label="Label on left" labelPosition="left" defaultChecked />
        </div>
      </div>

      {/* Disabled state */}
      <div>
        <h3>Disabled State</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox label="Disabled unchecked" disabled />
          <Checkbox label="Disabled checked" disabled defaultChecked />
          <Checkbox label="Disabled indeterminate" disabled indeterminate />
        </div>
      </div>

      {/* Without label */}
      <div>
        <h3>Without Label</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Checkbox />
          <Checkbox defaultChecked />
          <Checkbox indeterminate />
        </div>
      </div>

      {/* Custom Colors */}
      <div>
        <h3>Custom Colors</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <Checkbox defaultChecked label="Red" color="#ef4444" />
          <Checkbox defaultChecked label="Green" color="#10b981" />
          <Checkbox indeterminate label="Purple Indeterminate" color="#8b5cf6" />
          <Checkbox defaultChecked label="Tomato Named" color="tomato" />
        </div>
      </div>

      {/* Real-world examples */}
      <div>
        <h3>Real-World Examples</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox label="Remember me" size="s" />
          <Checkbox label="I agree to the terms and conditions" />
          <Checkbox label="Subscribe to newsletter" />
          <Checkbox label="Enable notifications" defaultChecked />
          <Checkbox label="Keep me logged in" defaultChecked />
        </div>
      </div>

      {/* Checkbox group example */}
      <div>
        <h3>Checkbox Group Example</h3>
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}>
          <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: "600" }}>
            Select your interests
          </h4>
          <Checkbox label="Technology" />
          <Checkbox label="Design" />
          <Checkbox label="Business" />
          <Checkbox label="Marketing" />
          <Checkbox label="Development" defaultChecked />
        </div>
      </div>

      {/* Nested checkboxes */}
      <div>
        <h3>Nested Checkboxes (Parent-Child)</h3>
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}>
          <Checkbox label="Select All" indeterminate size="l" />
          <div
            style={{
              paddingLeft: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}>
            <Checkbox label="Option 1" defaultChecked />
            <Checkbox label="Option 2" />
            <Checkbox label="Option 3" defaultChecked />
          </div>
        </div>
      </div>

      {/* Different validation states with sizes */}
      <div>
        <h3>Validation States with Different Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox
            label="Small success"
            size="s"
            validation="success"
            defaultChecked
          />
          <Checkbox label="Medium error" size="m" validation="error" />
          <Checkbox
            label="Large warning"
            size="l"
            validation="warning"
            defaultChecked
          />
        </div>
      </div>

      {/* Interactive example */}
      <div>
        <h3>Interactive Example</h3>
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}>
          <Checkbox
            label="Click me to toggle"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <Checkbox
            label="This one is linked to the first"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default InputCheckbox;
