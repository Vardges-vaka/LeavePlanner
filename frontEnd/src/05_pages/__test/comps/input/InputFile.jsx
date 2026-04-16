import { Input_file } from "../../../../00_components/_components.index.js";

const InputFile = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
        maxWidth: "800px",
      }}>
      {/* Button Mode - Basic */}
      <div>
        <h3>Button Mode - Basic</h3>
        <Input_file
          label="Upload Document"
          mode="button"
          onChange={(files) => console.log("Uploaded files:", files)}
        />
      </div>

      {/* Dropzone Mode - Basic */}
      <div>
        <h3>Dropzone Mode - Basic</h3>
        <Input_file
          label="Upload Files"
          mode="dropzone"
          onChange={(files) => console.log("Uploaded files:", files)}
        />
      </div>

      {/* Multiple Files */}
      <div>
        <h3>Multiple Files - Button</h3>
        <Input_file
          label="Upload Multiple Documents"
          mode="button"
          multiple
          onChange={(files) => console.log("Multiple files:", files)}
        />
      </div>

      {/* Multiple Files - Dropzone */}
      <div>
        <h3>Multiple Files - Dropzone</h3>
        <Input_file
          label="Drag & Drop Multiple Files"
          mode="dropzone"
          multiple
          onChange={(files) => console.log("Multiple files:", files)}
        />
      </div>

      {/* With File Type Restrictions */}
      <div>
        <h3>File Type Restrictions</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_file
            label="Images Only"
            mode="dropzone"
            accept="image/*"
            onChange={(files) => console.log("Images:", files)}
          />
          <Input_file
            label="PDFs Only"
            mode="button"
            accept=".pdf"
            onChange={(files) => console.log("PDFs:", files)}
          />
          <Input_file
            label="Documents"
            mode="dropzone"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(files) => console.log("Documents:", files)}
          />
        </div>
      </div>

      {/* Different Sizes - Button */}
      <div>
        <h3>Different Sizes - Button Mode</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_file label="Extra Small" mode="button" size="xs" />
          <Input_file label="Small" mode="button" size="s" />
          <Input_file label="Medium (default)" mode="button" size="m" />
          <Input_file label="Large" mode="button" size="l" />
          <Input_file label="Extra Large" mode="button" size="xl" />
        </div>
      </div>

      {/* Different Sizes - Dropzone */}
      <div>
        <h3>Different Sizes - Dropzone Mode</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_file label="Small Dropzone" mode="dropzone" size="s" />
          <Input_file label="Medium Dropzone" mode="dropzone" size="m" />
          <Input_file label="Large Dropzone" mode="dropzone" size="l" />
        </div>
      </div>

      {/* Validation States - Button */}
      <div>
        <h3>Validation States - Button</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_file label="Success" mode="button" validation="success" />
          <Input_file
            label="Error - File too large"
            mode="button"
            validation="error"
          />
          <Input_file
            label="Warning - Check file type"
            mode="button"
            validation="warning"
          />
        </div>
      </div>

      {/* Validation States - Dropzone */}
      <div>
        <h3>Validation States - Dropzone</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_file
            label="Success Upload"
            mode="dropzone"
            validation="success"
          />
          <Input_file
            label="Error - Invalid file type"
            mode="dropzone"
            validation="error"
          />
          <Input_file label="Warning" mode="dropzone" validation="warning" />
        </div>
      </div>

      {/* Disabled State */}
      <div>
        <h3>Disabled State</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_file label="Disabled Button" mode="button" disabled />
          <Input_file label="Disabled Dropzone" mode="dropzone" disabled />
        </div>
      </div>

      {/* Real-world Examples */}
      <div>
        <h3>Real-World Examples</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_file
            label="Profile Picture"
            mode="button"
            accept="image/*"
            onChange={(files) => console.log("Profile pic:", files)}
          />
          <Input_file
            label="Resume Upload"
            mode="dropzone"
            accept=".pdf,.doc,.docx"
            onChange={(files) => console.log("Resume:", files)}
          />
          <Input_file
            label="Project Files"
            mode="dropzone"
            multiple
            onChange={(files) => console.log("Project files:", files)}
          />
        </div>
      </div>

      {/* With Max Size */}
      <div>
        <h3>With Max Size Validation (5MB)</h3>
        <Input_file
          label="Upload (Max 5MB)"
          mode="dropzone"
          maxSize={5 * 1024 * 1024}
          onChange={(files) => console.log("Valid files:", files)}
        />
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.875rem",
            color: "#6b7280",
          }}>
          Files larger than 5MB will be rejected (check console)
        </p>
      </div>

      {/* Without Label */}
      <div>
        <h3>Without Label</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Input_file mode="button" />
          <Input_file mode="dropzone" />
        </div>
      </div>

      {/* Progress Demo */}
      <div>
        <h3>Automatic Progress Simulation</h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            marginBottom: "1rem",
          }}>
          Upload a file to see automatic progress simulation (0% → 100%)
        </p>
        <Input_file
          label="Watch the Progress Bar"
          mode="dropzone"
          multiple
          onChange={(files) => console.log("Completed files:", files)}
        />
      </div>
    </div>
  );
};

export default InputFile;
