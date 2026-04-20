# Togglers Library

This folder contains toggle-state components including standard toggle switches and group layouts capable of unifying checkboxes and togglers under cohesive APIs.

## RadioButtons

`RadioButtons` acts as a highly unified wrapper group that can host either standard `Checkbox` inputs or `TogglerGeneric` switches. It safely coordinates Single Choice or Multiple Choice logic recursively, providing a direct replacement for traditional group forms while retaining modern styling options.

### Features
- **Dual Component Handling**: Easily toggle between `Checkbox` grids or complex `TogglerGeneric` arrays dynamically.
- **Controlled vs Uncontrolled**: Works as entirely self-maintained (uncontrolled) arrays or standard controlled states.
- **Synthetic Event Return**: Replicates natural input functionality. Triggers an `onChange` passing a full `e.target` populated with your `.value` string (or Array if multiple), `name`, and inherited `.dataset` metadata.
- **Pass-through Injection**: Automatically distributes `color`, `colors`, `innerContent`, and custom data attributes organically across all children options perfectly.

### Base Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` (Required) | `Array` | `[]` | Array of object options formatting `{ label: "Label", value: "value" }` |
| `layout` | `string` | `"vertical"` | `"vertical"` or `"horizontal"` alignment mode |
| `multiple` | `boolean` | `false` | When `true`, handles values as Arrays instead of single strings |
| `type` | `object` | `{ component: "checkbox" }` | Switch internal engine ` { component: "checkbox" | "toggler", shape?: "oval" | "rectangular" }`|
| `value` | `any` | - | Controlled state. Array of values if multiple, string if single. |
| `defaultValue` | `any` | - | Form defaults when running uncontrolled |
| `onChange` | `function` | - | Event handler. Pull from `e.target.value` |
| `disabled` | `boolean` | `false` | Locks the entire component group |

### Standard Checkbox Group Usage
Creates a vertical array of traditional checkboxes working exclusively in Single Choice mode logic (acting explicitly as Radio Buttons).
```jsx
<RadioButtons
  options={[
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3", disabled: true },
  ]}
  value={val}
  onChange={(e) => setVal(e.target.value)}
  color="#ec4899"
  name="my-radios"
/>
```

### Advanced Toggler Group Usage
Replaces Checkboxes with TogglerGeneric instances, supporting deep structural label bindings and custom `innerContent` layouts. If `multiple` is explicitly enabled, it becomes a checkbox array handling selection overlaps.
```jsx
<RadioButtons
  layout="horizontal"
  multiple={true}
  type={{ component: "toggler", shape: "rectangular" }}
  colors={{ bg: "#8b5cf6", txt: "white" }}
  innerContent={{ on: "ON", off: "OFF" }}
  options={[
      { value: "apple", label: { text: "Apple", position: "before" } },
      { value: "banana", label: { text: "Banana", position: "before" } },
  ]}
  value={arrayVal}
  onChange={(e) => setArrayVal(e.target.value)} // Returns ["apple", "banana"]
  data_group_trigger="my_custom_id"
/>
```

---
