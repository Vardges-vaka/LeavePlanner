import { Input_date } from "../../../../00_components/_components.index.js";

const InputDate = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
      }}>
      {/* Date Types */}
      <div>
        <h3>Date Types</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_date label={{ text: "Date (default)" }} />
          <Input_date label={{ text: "Time" }} dateType="time" />
          <Input_date
            label={{ text: "Date & Time" }}
            dateType="datetime-local"
          />
          <Input_date label={{ text: "Month" }} dateType="month" />
          <Input_date label={{ text: "Week" }} dateType="week" />
        </div>
      </div>

      {/* Basic date input */}
      <div>
        <h3>Basic Date Input</h3>
        <Input_date label={{ text: "Select Date" }} />
      </div>

      {/* Different sizes */}
      <div>
        <h3>Different Sizes (Date)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_date
            label={{ text: "Extra Small" }}
            size="xs"
            dateType="date"
          />
          <Input_date label={{ text: "Small" }} size="s" dateType="date" />
          <Input_date
            label={{ text: "Medium (default)" }}
            size="m"
            dateType="date"
          />
          <Input_date label={{ text: "Large" }} size="l" dateType="date" />
          <Input_date
            label={{ text: "Extra Large" }}
            size="xl"
            dateType="date"
          />
        </div>
      </div>

      {/* Validation states */}
      <div>
        <h3>Validation States (DateTime)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_date
            label={{ text: "Success State" }}
            validation="success"
            dateType="datetime-local"
            defaultValue="2024-03-15T14:30"
          />
          <Input_date
            label={{ text: "Error State" }}
            validation="error"
            dateType="datetime-local"
          />
          <Input_date
            label={{ text: "Warning State" }}
            validation="warning"
            dateType="datetime-local"
          />
        </div>
      </div>

      {/* Full width */}
      <div>
        <h3>Full Width</h3>
        <Input_date
          label={{ text: "Appointment Date" }}
          dateType="date"
          fullWidth
        />
      </div>

      {/* Disabled and ReadOnly */}
      <div>
        <h3>Disabled & ReadOnly</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_date
            label={{ text: "Disabled" }}
            disabled
            dateType="date"
            defaultValue="2024-03-15"
          />
          <Input_date
            label={{ text: "ReadOnly" }}
            readOnly
            dateType="date"
            defaultValue="2024-03-20"
          />
        </div>
      </div>

      {/* Different label positions */}
      <div>
        <h3>Label Positions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_date
            label={{ text: "Top Left (default)", position: "top-left" }}
            dateType="date"
          />
          <Input_date
            label={{ text: "Top Right", position: "top-right" }}
            dateType="date"
          />
          <Input_date
            label={{ text: "Before", position: "before" }}
            dateType="date"
          />
          <Input_date
            label={{ text: "After", position: "after" }}
            dateType="date"
          />
        </div>
      </div>

      {/* Time variations */}
      <div>
        <h3>Time Variations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_date
            label={{ text: "Start Time" }}
            dateType="time"
            defaultValue="09:00"
          />
          <Input_date
            label={{ text: "End Time" }}
            dateType="time"
            defaultValue="17:00"
          />
          <Input_date
            label={{ text: "Meeting Time" }}
            dateType="time"
            size="l"
          />
        </div>
      </div>

      {/* Month and Week variations */}
      <div>
        <h3>Month & Week Variations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_date
            label={{ text: "Birth Month" }}
            dateType="month"
            defaultValue="1990-05"
          />
          <Input_date
            label={{ text: "Project Week" }}
            dateType="week"
            defaultValue="2024-W12"
          />
        </div>
      </div>

      {/* Custom icons */}
      <div>
        <h3>Custom Icons</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_date
            label={{ text: "With Custom Icon" }}
            dateType="date"
            icons={{
              isActive: true,
              leftIcon: {
                isActive: true,
                type: "lucid",
                content: "CalendarCheck",
              },
            }}
          />
          <Input_date
            label={{ text: "With Right Icon" }}
            dateType="datetime-local"
            icons={{
              isActive: true,
              leftIcon: {
                isActive: true,
                type: "lucid",
                content: "CalendarClock",
              },
              rightIcon: {
                isActive: true,
                type: "lucid",
                content: "Check",
                title: "Confirmed",
              },
            }}
          />
        </div>
      </div>

      {/* Real-world examples */}
      <div>
        <h3>Real-World Examples</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input_date
            label={{ text: "Date of Birth" }}
            dateType="date"
            fullWidth
          />
          <Input_date
            label={{ text: "Appointment Time" }}
            dateType="datetime-local"
            fullWidth
          />
          <Input_date
            label={{ text: "Work Hours Start" }}
            dateType="time"
            fullWidth
          />
          <Input_date
            label={{ text: "Project Month" }}
            dateType="month"
            fullWidth
          />
          <Input_date
            label={{ text: "Sprint Week" }}
            dateType="week"
            fullWidth
          />
        </div>
      </div>

      {/* Date ranges example */}
      <div>
        <h3>Date Range Example</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Input_date label={{ text: "Start Date" }} dateType="date" />
          <Input_date label={{ text: "End Date" }} dateType="date" />
        </div>
      </div>

      {/* Time range example */}
      <div>
        <h3>Time Range Example</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Input_date
            label={{ text: "From" }}
            dateType="time"
            defaultValue="09:00"
          />
          <Input_date
            label={{ text: "To" }}
            dateType="time"
            defaultValue="17:00"
          />
        </div>
      </div>

      {/* Without label */}
      <div>
        <h3>Without Label</h3>
        <Input_date dateType="date" />
      </div>
    </div>
  );
};

export default InputDate;
