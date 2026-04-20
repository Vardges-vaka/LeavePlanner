import { useState } from "react";
import { User, Settings, Info, LogOut, Sun } from "lucide-react";
import { SelectGeneric } from "../../../00_components/_components.index.js";
import "../styles/test_Select.css";

const Test_Select = () => {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("2");

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    marginBottom: "3rem",
    padding: "1.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
  };

  const groupStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    alignItems: "flex-end",
  };

  const basicOptions = [
    { value: "1", text: "Option 1" },
    { value: "2", text: "Option 2" },
    { value: "3", text: "Option 3" },
  ];

  const iconOptions = [
    {
      value: "user",
      text: "User Profile",
      leftIcon: <User />,
    },
    {
      value: "settings",
      text: "Settings",
      leftIcon: <Settings />,
      rightIcon: (
        <Info 
          onClick={(e) => {
            e.stopPropagation();
            alert("Information icon clicked!");
          }} 
          onMouseEnter={() => console.log("Hovering info")}
          style={{ cursor: 'pointer' }}
        />
      ),
    },
    {
      value: "logout",
      text: "Logout (Disabled)",
      disabled: true,
      leftIcon: <LogOut />,
    },
    {
      value: "theme",
      text: "Theme",
      rightIcon: <Sun />,
    }
  ];

  return (
    <div style={{ maxWidth: "800px", padding: "1rem" }}>
      <h1 className="testPage_heading" style={{ marginBottom: "2rem" }}>
        Select Showcase
      </h1>

      {/* 1. SIZES */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem", color: "#374151" }}>1. Sizes</h2>
        <div style={groupStyle}>
          <SelectGeneric size="xs" label={{ text: "Extra Small (xs)" }} options={basicOptions} />
          <SelectGeneric size="s" label={{ text: "Small (s)" }} options={basicOptions} />
          <SelectGeneric size="m" label={{ text: "Medium (m) - Default" }} options={basicOptions} />
          <SelectGeneric size="l" label={{ text: "Large (l)" }} options={basicOptions} />
          <SelectGeneric size="xl" label={{ text: "Extra Large (xl)" }} options={basicOptions} />
          <SelectGeneric size="xxl" label={{ text: "Double Extra Large (xxl)" }} options={basicOptions} />
        </div>
      </section>

      {/* 2. VALIDATION STATES */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem", color: "#374151" }}>2. Validation States</h2>
        <div style={groupStyle}>
          <SelectGeneric label={{ text: "Default (None)" }} options={basicOptions} />
          <SelectGeneric validation="success" label={{ text: "Success" }} options={basicOptions} />
          <SelectGeneric validation="warning" label={{ text: "Warning" }} options={basicOptions} />
          <SelectGeneric validation="error" label={{ text: "Error" }} options={basicOptions} />
        </div>
      </section>

      {/* 3. SELECT ICONS & OPTION ICONS */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem", color: "#374151" }}>3. Icons & Capabilities</h2>
        <div style={groupStyle}>
          <SelectGeneric 
            label={{ text: "Select Box With Icons" }} 
            options={basicOptions} 
            icons={{
              isActive: true,
              leftIcon: { isActive: true, type: "lucid", content: "search" },
              rightIcon: { isActive: true, type: "lucid", content: "user" }
            }}
          />
          <SelectGeneric 
            label={{ text: "No Icons (No Dropdown Arrow)" }} 
            options={basicOptions} 
            icons={{ isActive: false }}
          />
          <SelectGeneric 
            label={{ text: "Options With Icons & Disabled" }} 
            options={iconOptions} 
          />
        </div>
      </section>

      {/* 4. LABEL POSITIONS */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem", color: "#374151" }}>4. Label Positions</h2>
        <div style={groupStyle}>
          <SelectGeneric label={{ text: "Top-Left", position: "top-left" }} options={basicOptions} />
          <SelectGeneric label={{ text: "Top-Right", position: "top-right" }} options={basicOptions} />
          <SelectGeneric label={{ text: "Bottom-Left", position: "bottom-left" }} options={basicOptions} />
          <SelectGeneric label={{ text: "Bottom-Right", position: "bottom-right" }} options={basicOptions} />
          <SelectGeneric label={{ text: "Before", position: "before" }} options={basicOptions} />
          <SelectGeneric label={{ text: "After", position: "after" }} options={basicOptions} />
        </div>
      </section>

      {/* 5. STATES (Controlled, Disabled) */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem", color: "#374151" }}>5. Special States</h2>
        <div style={groupStyle}>
          <SelectGeneric disabled label={{ text: "Disabled State" }} options={basicOptions} placeholder="Cannot open me" />
          <SelectGeneric
            label={{ text: `Controlled Input (Val: ${val2})` }}
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            options={basicOptions}
          />
        </div>
      </section>

      {/* 6. FULL WIDTH */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem", color: "#374151" }}>6. Full Width</h2>
        <SelectGeneric fullWidth label={{ text: "Full Width Select" }} options={basicOptions} />
      </section>
    </div>
  );
};

export default Test_Select;
