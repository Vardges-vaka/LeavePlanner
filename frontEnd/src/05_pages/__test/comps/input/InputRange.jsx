import { Input_range } from "../../../../00_components/_components.index.js";
import { useState } from "react";

const InputRange = () => {
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(75);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
        maxWidth: "800px",
      }}>
      {/* Basic range slider */}
      <div>
        <h3>Basic Range Slider</h3>
        <Input_range label="Volume" />
      </div>

      {/* Controlled slider */}
      <div>
        <h3>Controlled Slider</h3>
        <Input_range
          label="Volume Control"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
          Current volume: {volume}%
        </p>
      </div>

      {/* Value positions */}
      <div>
        <h3>Value Display Positions</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_range
            label="Value on Top"
            valuePosition="top"
            defaultValue={60}
          />
          <Input_range
            label="Value Inline"
            valuePosition="inline"
            defaultValue={40}
          />
          <Input_range
            label="No Value Display"
            showValue={false}
            defaultValue={80}
          />
        </div>
      </div>

      {/* Different sizes */}
      <div>
        <h3>Different Sizes</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_range label="Extra Small" size="xs" defaultValue={20} />
          <Input_range label="Small" size="s" defaultValue={40} />
          <Input_range label="Medium (default)" size="m" defaultValue={60} />
          <Input_range label="Large" size="l" defaultValue={80} />
          <Input_range label="Extra Large" size="xl" defaultValue={100} />
        </div>
      </div>

      {/* Custom min/max/step */}
      <div>
        <h3>Custom Min/Max/Step</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_range
            label="Temperature (°C)"
            min={-20}
            max={40}
            step={5}
            defaultValue={20}
          />
          <Input_range
            label="Price Range ($)"
            min={0}
            max={1000}
            step={50}
            defaultValue={500}
          />
          <Input_range
            label="Rating"
            min={0}
            max={5}
            step={0.5}
            defaultValue={3.5}
          />
        </div>
      </div>

      {/* Validation states */}
      <div>
        <h3>Validation States</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_range
            label="Success - Optimal Level"
            validation="success"
            defaultValue={75}
          />
          <Input_range
            label="Error - Too Low"
            validation="error"
            defaultValue={15}
          />
          <Input_range
            label="Warning - Approaching Limit"
            validation="warning"
            defaultValue={90}
          />
        </div>
      </div>

      {/* Without min/max labels */}
      <div>
        <h3>Without Min/Max Labels</h3>
        <Input_range
          label="Clean Slider"
          showMinMax={false}
          defaultValue={50}
        />
      </div>

      {/* Disabled state */}
      <div>
        <h3>Disabled State</h3>
        <Input_range label="Disabled Slider" disabled defaultValue={60} />
      </div>

      {/* Real-world examples */}
      <div>
        <h3>Real-World Examples</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_range
            label="Volume"
            min={0}
            max={100}
            defaultValue={50}
            valuePosition="inline"
          />
          <Input_range
            label="Brightness"
            min={0}
            max={100}
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            valuePosition="inline"
          />
          <Input_range
            label="Font Size (px)"
            min={12}
            max={32}
            step={2}
            defaultValue={16}
          />
          <Input_range
            label="Zoom Level (%)"
            min={50}
            max={200}
            step={10}
            defaultValue={100}
          />
        </div>
      </div>

      {/* Multiple sliders group */}
      <div>
        <h3>Slider Group (Audio Mixer)</h3>
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}>
          <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: "600" }}>
            Audio Mixer
          </h4>
          <Input_range label="Master Volume" defaultValue={80} size="l" />
          <Input_range label="Music" defaultValue={70} />
          <Input_range label="Effects" defaultValue={60} />
          <Input_range label="Voice" defaultValue={90} />
        </div>
      </div>

      {/* Color temperature example */}
      <div>
        <h3>Color Temperature</h3>
        <Input_range
          label="Warmth"
          min={2700}
          max={6500}
          step={100}
          defaultValue={4000}
          valuePosition="inline"
        />
      </div>

      {/* Progress indicator style */}
      <div>
        <h3>Progress Indicator Style</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_range
            label="Download Progress"
            min={0}
            max={100}
            defaultValue={65}
            validation="success"
            showMinMax={false}
          />
          <Input_range
            label="Upload Progress"
            min={0}
            max={100}
            defaultValue={35}
            showMinMax={false}
          />
        </div>
      </div>

      {/* Without label */}
      <div>
        <h3>Without Label</h3>
        <Input_range defaultValue={50} />
      </div>
    </div>
  );
};

export default InputRange;
