import { Input_search } from "../../../../00_components/_components.index.js";
import { useState } from "react";

const InputSearch = () => {
  const [controlledValue, setControlledValue] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
      }}>
      {/* Basic search input */}
      <div>
        <h3>Basic Search Input</h3>
        <Input_search label={{ text: "Search" }} placeholder="Search..." />
      </div>

      {/* With clear button (default) */}
      <div>
        <h3>With Clear Button (Default)</h3>
        <Input_search
          label={{ text: "Search Products" }}
          placeholder="Type to search..."
          defaultValue="laptop"
        />
      </div>

      {/* Without clear button */}
      <div>
        <h3>Without Clear Button</h3>
        <Input_search
          label={{ text: "Search" }}
          placeholder="Search..."
          showClearButton={false}
          defaultValue="test"
        />
      </div>

      {/* Controlled input with state */}
      <div>
        <h3>Controlled Input with State</h3>
        <Input_search
          label={{ text: "Controlled Search" }}
          placeholder="Search..."
          value={controlledValue}
          onChange={(e) => setControlledValue(e.target.value)}
          onClear={() => console.log("Search cleared!")}
        />
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
          Current value: "{controlledValue}"
        </p>
      </div>

      {/* Different sizes */}
      <div>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_search
            label={{ text: "Extra Small" }}
            placeholder="Search..."
            size="xs"
          />
          <Input_search
            label={{ text: "Small" }}
            placeholder="Search..."
            size="s"
          />
          <Input_search
            label={{ text: "Medium (default)" }}
            placeholder="Search..."
            size="m"
          />
          <Input_search
            label={{ text: "Large" }}
            placeholder="Search..."
            size="l"
          />
          <Input_search
            label={{ text: "Extra Large" }}
            placeholder="Search..."
            size="xl"
          />
        </div>
      </div>

      {/* Validation states */}
      <div>
        <h3>Validation States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_search
            label={{ text: "Success State" }}
            placeholder="Search..."
            validation="success"
            defaultValue="Found results"
          />
          <Input_search
            label={{ text: "Error State" }}
            placeholder="Search..."
            validation="error"
            defaultValue="No results"
          />
          <Input_search
            label={{ text: "Warning State" }}
            placeholder="Search..."
            validation="warning"
            defaultValue="Limited results"
          />
        </div>
      </div>

      {/* Full width */}
      <div>
        <h3>Full Width</h3>
        <Input_search
          label={{ text: "Search Everything" }}
          placeholder="Search across all categories..."
          fullWidth
        />
      </div>

      {/* Disabled and ReadOnly */}
      <div>
        <h3>Disabled & ReadOnly</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_search
            label={{ text: "Disabled" }}
            placeholder="Search..."
            disabled
            defaultValue="Disabled search"
          />
          <Input_search
            label={{ text: "ReadOnly" }}
            placeholder="Search..."
            readOnly
            defaultValue="ReadOnly search"
          />
        </div>
      </div>

      {/* Different label positions */}
      <div>
        <h3>Label Positions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_search
            label={{ text: "Top Left (default)", position: "top-left" }}
            placeholder="Search..."
          />
          <Input_search
            label={{ text: "Top Right", position: "top-right" }}
            placeholder="Search..."
          />
          <Input_search
            label={{ text: "Before", position: "before" }}
            placeholder="Search..."
          />
          <Input_search
            label={{ text: "After", position: "after" }}
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Custom icons */}
      <div>
        <h3>Custom Icons</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_search
            label={{ text: "With Custom Search Icon" }}
            placeholder="Search..."
            icons={{
              isActive: true,
              leftIcon: {
                isActive: true,
                type: "lucid",
                content: "SearchCode",
              },
            }}
          />
          <Input_search
            label={{ text: "With Filter Icon" }}
            placeholder="Search and filter..."
            icons={{
              isActive: true,
              leftIcon: {
                isActive: true,
                type: "lucid",
                content: "SlidersHorizontal",
              },
            }}
            defaultValue="filtered"
          />
        </div>
      </div>

      {/* Real-world examples */}
      <div>
        <h3>Real-World Examples</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_search
            label={{ text: "Search Products" }}
            placeholder="Search for products..."
            fullWidth
          />
          <Input_search
            label={{ text: "Search Users" }}
            placeholder="Search by name or email..."
            fullWidth
          />
          <Input_search
            label={{ text: "Search Documents" }}
            placeholder="Search files and folders..."
            fullWidth
          />
          <Input_search
            label={{ text: "Global Search" }}
            placeholder="Search everything..."
            size="l"
            fullWidth
          />
        </div>
      </div>

      {/* Search with callback */}
      <div>
        <h3>Search with Callbacks</h3>
        <Input_search
          label={{ text: "Search with Events" }}
          placeholder="Type and clear to see console logs..."
          onChange={(e) => console.log("Search changed:", e.target.value)}
          onClear={() => console.log("Search cleared!")}
          onFocus={() => console.log("Search focused")}
          onBlur={() => console.log("Search blurred")}
        />
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
          Check console for event logs
        </p>
      </div>

      {/* Without label */}
      <div>
        <h3>Without Label</h3>
        <Input_search placeholder="Quick search..." />
      </div>

      {/* Search bar variations */}
      <div>
        <h3>Search Bar Variations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_search placeholder="Compact search..." size="s" />
          <Input_search placeholder="Standard search..." size="m" />
          <Input_search placeholder="Large search bar..." size="l" fullWidth />
        </div>
      </div>
    </div>
  );
};

export default InputSearch;
