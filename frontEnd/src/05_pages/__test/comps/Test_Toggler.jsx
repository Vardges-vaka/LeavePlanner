import { useState } from "react";
import { Sun, Moon, Check, X, User } from "lucide-react";
import { TogglerGeneric } from "../../../00_components/_components.index.js";
import "../styles/test_Toggler.css";

const Test_Toggler = () => {
  const [val1, setVal1] = useState(false);
  const [val2, setVal2] = useState(true);

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
    gap: "2rem",
    alignItems: "flex-end",
  };

  return (
    <div>
      <h1 className="testPage_heading">TogglerGeneric Showcase</h1>

      <section style={sectionStyle}>
        <h2>1. Sizes</h2>
        <div style={groupStyle}>
          {["xs", "s", "m", "l", "xl", "xxl"].map((sz) => (
            <TogglerGeneric key={sz} size={sz} label={{ text: `Size ${sz}` }} defaultChecked />
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>2. Shapes & Icons/Text</h2>
        <div style={groupStyle}>
          <TogglerGeneric 
            label={{ text: "Oval (Default)" }} 
          />
          <TogglerGeneric 
            shape="rectangular" 
            label={{ text: "Rectangular" }} 
            defaultChecked
          />
          <TogglerGeneric 
            size="l"
            label={{ text: "Text Only" }} 
            innerContent={{ on: "ON", off: "OFF" }}
            defaultChecked 
          />
          <TogglerGeneric 
            shape="rectangular" 
            size="l"
            label={{ text: "Custom Structured Content" }} 
            innerContent={{ 
              on: { text: "YES", leftIcon: <Check /> }, 
              off: { text: "NO", rightIcon: <X /> } 
            }} 
          />
          <TogglerGeneric 
            size="xl"
            label={{ text: "Icons Only" }} 
            colors={{ bg: "black", txt: "white", icon: "#ef4444" }} 
            innerContent={{ 
              on: <User />, 
              off: <Moon />
            }} 
            defaultChecked 
          />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>3. Custom Colors & Structured Interfaces</h2>
        <div style={groupStyle}>
          <TogglerGeneric 
            colors={{ bg: "#ef4444" }} 
            label={{ text: "Bg: Red" }} 
            defaultChecked 
          />
          <TogglerGeneric 
            size="l"
            colors={{ bg: "blue", txt: "white" }} 
            innerContent={{ on: "longer text on", off: "Off longer text " }}
            label={{ text: "Bg: Blue, Txt: White" }} 
            defaultChecked 
          />
          <TogglerGeneric 
            colors={{ bg: "#10b981", icon: "#064e3b" }} 
            shape="rectangular"
            innerContent={{ 
              on: <Check />, 
              off: <X /> 
            }}
            label={{ text: "Bg: Green, Icon: Dark Green" }} 
            defaultChecked 
          />
          <TogglerGeneric 
            size="xl"
            colors={{ bg: "#6366f1", txt: "white", icon: "#fbbf24" }} 
            innerContent={{ 
              on: { leftIcon: <Sun />, text: "DAY" }, 
              off: { rightIcon: <Moon />, text: "NIGHT" } 
            }}
            label={{ text: "Icon + Text" }} 
            defaultChecked 
          />
          <TogglerGeneric 
            size="xl"
            colors={{ bg: "#8b5cf6", txt: "white", icon: "white" }} 
            innerContent={{ 
              on: { leftIcon: <User />, text: "ACCEPTED", rightIcon: <Check /> }, 
              off: { leftIcon: <X />, text: "DECLINED", rightIcon: <X /> } 
            }}
            label={{ text: "Icon + Text + Icon" }} 
            defaultChecked 
          />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>4. Label Positions (Default checks 'after')</h2>
        <div style={{ ...groupStyle, gap: "3rem" }}>
          <TogglerGeneric label={{ text: "Before", position: "before" }} />
          <TogglerGeneric label={{ text: "After (Default)", position: "after" }} />
          <TogglerGeneric label={{ text: "Top-Left", position: "top-left" }} />
          <TogglerGeneric label={{ text: "Bottom-Right", position: "bottom-right" }} />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>5. Validation & Disabled States</h2>
        <div style={groupStyle}>
          <TogglerGeneric label={{ text: "Error" }} validation="error" />
          <TogglerGeneric label={{ text: "Success" }} validation="success" />
          <TogglerGeneric label={{ text: "Disabled (Off)" }} disabled />
          <TogglerGeneric label={{ text: "Disabled (On)" }} disabled defaultChecked />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>6. Controlled & Dataset</h2>
        <div style={groupStyle}>
          <TogglerGeneric 
            label={{ text: `Controlled (Is Checked: ${val1})` }}
            checked={val1}
            onChange={(e) => {
              setVal1(e.target.checked);
              console.log("Dataset value:", e.target.dataset.testValue);
            }}
            data_test_value="DatasetWorks123"
          />
          <TogglerGeneric 
            label={{ text: `Controlled Reverse (${val2})` }}
            colors={{ bg: "#f59e0b" }}
            checked={val2}
            onChange={(e) => setVal2(e.target.checked)}
          />
        </div>
      </section>
    </div>
  );
};

export default Test_Toggler;
