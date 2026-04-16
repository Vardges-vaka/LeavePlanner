import { Input_tel } from "../../../../00_components/_components.index.js";

const InputTel = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
      }}>
      {/* Contact Types */}
      <div>
        <h3>Contact Types</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_tel
            label={{ text: "Phone (default)" }}
            placeholder="+1 (555) 123-4567"
            // contactType="phone"
          />
          <Input_tel
            label={{ text: "WhatsApp" }}
            placeholder="+1 (555) 123-4567"
            contactType="whatsapp"
          />
          <Input_tel
            label={{ text: "Telegram" }}
            placeholder="+1 (555) 123-4567"
            contactType="telegram"
          />
        </div>
      </div>

      {/* Basic telephone input */}
      <div>
        <h3>Basic Telephone Input</h3>
        <Input_tel
          label={{ text: "Phone Number" }}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      {/* Different sizes with contact types */}
      <div>
        <h3>Different Sizes (WhatsApp)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_tel
            label={{ text: "Extra Small" }}
            placeholder="+1 (555) 123-4567"
            size="xs"
            contactType="whatsapp"
          />
          <Input_tel
            label={{ text: "Small" }}
            placeholder="+1 (555) 123-4567"
            size="s"
            contactType="whatsapp"
          />
          <Input_tel
            label={{ text: "Medium (default)" }}
            placeholder="+1 (555) 123-4567"
            size="m"
            contactType="whatsapp"
          />
          <Input_tel
            label={{ text: "Large" }}
            placeholder="+1 (555) 123-4567"
            size="l"
            contactType="whatsapp"
          />
          <Input_tel
            label={{ text: "Extra Large" }}
            placeholder="+1 (555) 123-4567"
            size="xl"
            contactType="whatsapp"
          />
        </div>
      </div>

      {/* Validation states */}
      <div>
        <h3>Validation States (Telegram)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_tel
            label={{ text: "Success State" }}
            placeholder="+1 (555) 123-4567"
            validation="success"
            defaultValue="+1 (555) 123-4567"
            contactType="telegram"
          />
          <Input_tel
            label={{ text: "Error State" }}
            placeholder="+1 (555) 123-4567"
            validation="error"
            defaultValue="invalid"
            contactType="telegram"
          />
          <Input_tel
            label={{ text: "Warning State" }}
            placeholder="+1 (555) 123-4567"
            validation="warning"
            defaultValue="+1 555"
            contactType="telegram"
          />
        </div>
      </div>

      {/* Full width */}
      <div>
        <h3>Full Width</h3>
        <Input_tel
          label={{ text: "Contact Number" }}
          placeholder="+1 (555) 123-4567"
          fullWidth
        />
      </div>

      {/* Disabled and ReadOnly */}
      <div>
        <h3>Disabled & ReadOnly</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_tel
            label={{ text: "Disabled" }}
            placeholder="+1 (555) 123-4567"
            disabled
            defaultValue="+1 (555) 123-4567"
          />
          <Input_tel
            label={{ text: "ReadOnly" }}
            placeholder="+1 (555) 123-4567"
            readOnly
            defaultValue="+1 (555) 987-6543"
          />
        </div>
      </div>

      {/* Different label positions */}
      <div>
        <h3>Label Positions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_tel
            label={{ text: "Top Left (default)", position: "top-left" }}
            placeholder="+1 (555) 123-4567"
          />
          <Input_tel
            label={{ text: "Top Right", position: "top-right" }}
            placeholder="+1 (555) 123-4567"
          />
          <Input_tel
            label={{ text: "Before", position: "before" }}
            placeholder="+1 (555) 123-4567"
          />
          <Input_tel
            label={{ text: "After", position: "after" }}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Custom icon (overrides contactType) */}
      <div>
        <h3>Custom Icons (Override contactType)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_tel
            label={{ text: "With Smartphone Icon" }}
            placeholder="+1 (555) 123-4567"
            contactType="whatsapp"
            icons={{
              isActive: true,
              leftIcon: {
                isActive: true,
                type: "lucid",
                content: "Smartphone",
              },
            }}
          />
          <Input_tel
            label={{ text: "With Right Icon" }}
            placeholder="+1 (555) 123-4567"
            contactType="telegram"
            icons={{
              isActive: true,
              leftIcon: {
                isActive: true,
                type: "lucid",
                content: "Phone",
              },
              rightIcon: {
                isActive: true,
                type: "lucid",
                content: "Check",
                title: "Verified",
              },
            }}
          />
        </div>
      </div>

      {/* Real-world examples */}
      <div>
        <h3>Real-World Examples</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_tel
            label={{ text: "Primary Phone" }}
            placeholder="+1 (555) 123-4567"
            contactType="phone"
            fullWidth
          />
          <Input_tel
            label={{ text: "WhatsApp Contact" }}
            placeholder="+1 (555) 123-4567"
            contactType="whatsapp"
            fullWidth
          />
          <Input_tel
            label={{ text: "Telegram Username" }}
            placeholder="@username or +1 (555) 123-4567"
            contactType="telegram"
            fullWidth
          />
        </div>
      </div>

      {/* Without label */}
      <div>
        <h3>Without Label</h3>
        <Input_tel placeholder="Enter phone number" />
      </div>
    </div>
  );
};

export default InputTel;
