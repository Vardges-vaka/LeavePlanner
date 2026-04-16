import { Input_url } from "../../../../00_components/_components.index.js";

const InputUrl = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
      }}>
      {/* Basic URL input */}
      <div>
        <h3>Basic URL Input</h3>
        <Input_url
          label={{ text: "Website URL" }}
          placeholder="https://example.com"
        />
      </div>

      {/* Different sizes */}
      <div>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_url
            label={{ text: "Extra Small" }}
            placeholder="https://example.com"
            size="xs"
          />
          <Input_url
            label={{ text: "Small" }}
            placeholder="https://example.com"
            size="s"
          />
          <Input_url
            label={{ text: "Medium (default)" }}
            placeholder="https://example.com"
            size="m"
          />
          <Input_url
            label={{ text: "Large" }}
            placeholder="https://example.com"
            size="l"
          />
          <Input_url
            label={{ text: "Extra Large" }}
            placeholder="https://example.com"
            size="xl"
          />
        </div>
      </div>

      {/* Validation states */}
      <div>
        <h3>Validation States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_url
            label={{ text: "Success State" }}
            placeholder="https://example.com"
            validation="success"
            defaultValue="https://www.example.com"
          />
          <Input_url
            label={{ text: "Error State" }}
            placeholder="https://example.com"
            validation="error"
            defaultValue="not-a-valid-url"
          />
          <Input_url
            label={{ text: "Warning State" }}
            placeholder="https://example.com"
            validation="warning"
            defaultValue="example.com"
          />
        </div>
      </div>

      {/* Full width */}
      <div>
        <h3>Full Width</h3>
        <Input_url
          label={{ text: "Portfolio Website" }}
          placeholder="https://yourportfolio.com"
          fullWidth
        />
      </div>

      {/* Disabled and ReadOnly */}
      <div>
        <h3>Disabled & ReadOnly</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_url
            label={{ text: "Disabled" }}
            placeholder="https://example.com"
            disabled
            defaultValue="https://disabled-site.com"
          />
          <Input_url
            label={{ text: "ReadOnly" }}
            placeholder="https://example.com"
            readOnly
            defaultValue="https://readonly-site.com"
          />
        </div>
      </div>

      {/* Different label positions */}
      <div>
        <h3>Label Positions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_url
            label={{ text: "Top Left (default)", position: "top-left" }}
            placeholder="https://example.com"
          />
          <Input_url
            label={{ text: "Top Right", position: "top-right" }}
            placeholder="https://example.com"
          />
          <Input_url
            label={{ text: "Before", position: "before" }}
            placeholder="https://example.com"
          />
          <Input_url
            label={{ text: "After", position: "after" }}
            placeholder="https://example.com"
          />
        </div>
      </div>

      {/* Custom icon */}
      <div>
        <h3>Custom Icons</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_url
            label={{ text: "With Globe Icon" }}
            placeholder="https://example.com"
            icons={{
              isActive: true,
              leftIcon: {
                isActive: true,
                type: "lucid",
                content: "Globe",
              },
            }}
          />
          <Input_url
            label={{ text: "With Right Icon" }}
            placeholder="https://example.com"
            icons={{
              isActive: true,
              leftIcon: {
                isActive: true,
                type: "lucid",
                content: "Link",
              },
              rightIcon: {
                isActive: true,
                type: "lucid",
                content: "ExternalLink",
                title: "Open in new tab",
              },
            }}
          />
        </div>
      </div>

      {/* Without label */}
      <div>
        <h3>Without Label</h3>
        <Input_url placeholder="Enter website URL" />
      </div>
    </div>
  );
};

export default InputUrl;
