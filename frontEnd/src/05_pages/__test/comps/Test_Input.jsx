import { useState } from "react";
import { 
  InputGeneric ,
  Input_text,
  Input_psw,
  Input_email,
  Input_number
} from "../../../00_components/_components.index.js";
import { ButtonGeneric } from "../../../00_components/_components.index.js";
import "../styles/test_Input.css";

const Test_Input = () => {
  const [activeTab, setActiveTab] = useState("text");

  return (
    <div>
      <h1 className="testPage_heading">Input Showcase</h1>
      
      {/* Navigation Panel */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
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
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem', maxWidth: '400px' }}>
        
        {/* TEXT INPUTS TAB */}
        {activeTab === "text" && (
          <>
            <Input_text 
              label={{ text: "Default (Top Left)", position: "top-left" }}
              placeholder="Default input"
            />

            <Input_text 
              label={{ text: "With Icons", position: "top-left" }}
              placeholder="Search..."
              icons={{
                isActive: true,
                leftIcon: { isActive: true, type: "lucid", content: "search" },
              }}
            />

            <Input_text 
              label={{ text: "Testing Missing Icon (Check Console!)", position: "top-left" }}
              placeholder="Invalid icon name given"
              icons={{
                isActive: true,
                leftIcon: { isActive: true, type: "lucid", content: "user" },
              }}
            />
          </>
        )}

        {/* PASSWORD INPUTS TAB */}
        {activeTab === "psw" && (
          <>
            <Input_psw 
              label={{ text: "Standard Password"}}
              placeholder="Enter your password"
            />
          </>
        )}

        {/* EMAIL INPUTS TAB */}
        {activeTab === "email" && (
          <>
            <Input_email 
              label={{ text: "Email Address" }}
              placeholder="john@example.com"
            />

            <Input_email 
              label={{ text: "Work Email" }}
              placeholder="jane@company.com"
              validation="success"
            />
          </>
        )}

        {/* NUMBER INPUTS TAB */}
        {activeTab === "number" && (
          <>
            <Input_number 
              label={{ text: "Age" }}
              placeholder="e.g. 25"
            />

            <Input_number 
              label={{ text: "Price (with custom right icon)" }}
              placeholder="100"
              defaultValue="100"
              icons={{
                isActive: true,
                rightIcon: { isActive: true, type: "lucid", content: "DollarSign" }
              }}
            />

            <Input_number 
              label={{ text: "Temperature" }}
              placeholder="0"
              size="l"
            />
          </>
        )}

      </div>
    </div>
  );
};

export default Test_Input;