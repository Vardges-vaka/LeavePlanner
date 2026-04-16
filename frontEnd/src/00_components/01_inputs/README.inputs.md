# Input Components Documentation

A comprehensive collection of reusable, accessible, and theme-aware input components built with React.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Components](#components)
  - [InputGeneric](#inputgeneric)
  - [Input_text](#input_text)
  - [Input_email](#input_email)
  - [Input_psw](#input_psw)
  - [Input_number](#input_number)
  - [Input_url](#input_url)
  - [Input_tel](#input_tel)
  - [Input_date](#input_date)
  - [Input_search](#input_search)
  - [Input_range](#input_range)
  - [Input_file](#input_file)
  - [Checkbox](#checkbox)
- [Common Features](#common-features)
- [Theming](#theming)
- [Best Practices](#best-practices)

---

## Overview

This directory contains a complete set of form input components designed for modern web applications. All components are:

- **Accessible**: Built with WCAG guidelines in mind
- **Theme-aware**: Automatically adapt to light/dark mode
- **Customizable**: Extensive prop support for various use cases
- **Consistent**: Shared design language across all components
- **Type-safe**: PropTypes validation for all props

---

## Architecture

### Component Hierarchy

```
InputGeneric (Base Component)
├── Input_text
├── Input_email
├── Input_psw
├── Input_number
├── Input_url
├── Input_tel
└── Input_date

Standalone Components
├── Input_search (with clear button)
├── Input_range (slider)
├── Input_file (upload with progress)
└── Checkbox (custom styled)
```

### Design Principles

1. **Composition over Inheritance**: Most inputs extend `InputGeneric`
2. **Controlled Components**: Support both controlled and uncontrolled modes
3. **Minimal Internal State**: Keep state management simple
4. **CSS Variables**: All styling uses theme variables from `App.css`

---

## Components

### InputGeneric

**Base component** for all standard text-based inputs. Provides the structural foundation with labels, icons, validation states, and size variations.

#### Features

- Floating/adjacent label positioning
- Left and right icon support (Lucide or custom images)
- Validation states (error, success, warning)
- Multiple sizes (xs, s, m, l, xl, xxl)
- Full width option
- Disabled and readonly states

#### Props

| Prop         | Type    | Default  | Description                                                                 |
| ------------ | ------- | -------- | --------------------------------------------------------------------------- |
| `label`      | object  | `{}`     | Label configuration with text, position, classname, onClick, onHover, title |
| `icons`      | object  | `{}`     | Icon configuration for left and right icons                                 |
| `size`       | string  | `"m"`    | Size variant: xs, s, m, l, xl, xxl                                          |
| `fullWidth`  | boolean | `false`  | Expand to 100% width                                                        |
| `validation` | string  | -        | Validation state: error, success, warning                                   |
| `type`       | string  | `"text"` | HTML input type                                                             |
| `disabled`   | boolean | `false`  | Disable the input                                                           |
| `readOnly`   | boolean | `false`  | Make input read-only                                                        |

#### Label Configuration

```javascript
label={{
  text: "Username",
  position: "top-left", // top-left, top-right, bottom-left, bottom-right, before, after
  classname: "custom-class",
  onClick: handleClick,
  onHover: handleHover,
  title: "Tooltip text"
}}
```

#### Icon Configuration

```javascript
icons={{
  isActive: true,
  leftIcon: {
    isActive: true,
    type: "lucid", // or "img"
    content: "User", // Lucide icon name or image URL
    onClick: handleClick,
    onHover: handleHover,
    title: "Icon tooltip",
    classname: "custom-icon-class"
  },
  rightIcon: { /* same structure */ }
}}
```

#### Usage Example

```jsx
<InputGeneric
  label={{ text: "Username" }}
  icons={{
    isActive: true,
    leftIcon: {
      isActive: true,
      type: "lucid",
      content: "User",
    },
  }}
  size="m"
  validation="success"
  placeholder="Enter username"
/>
```

---

### Input_text

Standard single-line text input. Direct wrapper over `InputGeneric` with `type="text"`.

#### Use Cases

- Username fields
- Name inputs
- General text entry
- Search queries (use Input_search for better UX)

#### Usage Example

```jsx
<Input_text label={{ text: "Full Name" }} placeholder="John Doe" size="m" />
```

---

### Input_email

Email input with built-in validation and default Mail icon.

#### Features

- HTML5 email validation
- Default Mail icon on the left
- Email-specific keyboard on mobile devices

#### Usage Example

```jsx
<Input_email
  label={{ text: "Email Address" }}
  placeholder="user@example.com"
  validation="success"
/>
```

---

### Input_psw

Password input with visibility toggle functionality.

#### Features

- Built-in show/hide password toggle
- Default Lock icon on the left
- Eye/EyeOff icon on the right
- Automatic type switching (password ↔ text)

#### Usage Example

```jsx
<Input_psw label={{ text: "Password" }} placeholder="Enter password" size="m" />
```

---

### Input_number

Numeric input with optional spinner controls.

#### Features

- Number-only input
- Optional up/down spinners
- Step support
- Min/max validation

#### Props

| Prop           | Type    | Default | Description                 |
| -------------- | ------- | ------- | --------------------------- |
| `showSpinners` | boolean | `false` | Show native number spinners |
| `min`          | number  | -       | Minimum value               |
| `max`          | number  | -       | Maximum value               |
| `step`         | number  | -       | Increment step              |

#### Usage Example

```jsx
<Input_number
  label={{ text: "Age" }}
  placeholder="25"
  min={0}
  max={120}
  showSpinners={false}
/>
```

---

### Input_url

URL input with default Link icon and HTML5 URL validation.

#### Features

- URL validation
- Default Link icon
- Proper URL keyboard on mobile

#### Usage Example

```jsx
<Input_url label={{ text: "Website" }} placeholder="https://example.com" />
```

---

### Input_tel

Telephone input with contact type variants.

#### Features

- Three contact types: phone, whatsapp, telegram
- Type-specific icons
- Tel-specific keyboard on mobile

#### Props

| Prop          | Type   | Default   | Description                             |
| ------------- | ------ | --------- | --------------------------------------- |
| `contactType` | string | `"phone"` | Contact type: phone, whatsapp, telegram |

#### Icon Mapping

- **phone**: Phone icon
- **whatsapp**: MessageCircle icon
- **telegram**: Send icon

#### Usage Example

```jsx
// Phone
<Input_tel
  label={{ text: "Phone Number" }}
  contactType="phone"
  placeholder="+1 (555) 123-4567"
/>

// WhatsApp
<Input_tel
  label={{ text: "WhatsApp" }}
  contactType="whatsapp"
  placeholder="+1 (555) 123-4567"
/>

// Telegram
<Input_tel
  label={{ text: "Telegram" }}
  contactType="telegram"
  placeholder="@username"
/>
```

---

### Input_date

Versatile date/time input supporting multiple formats.

#### Features

- Five date/time types
- Type-specific icons
- Native date/time pickers

#### Props

| Prop       | Type   | Default  | Description                                   |
| ---------- | ------ | -------- | --------------------------------------------- |
| `dateType` | string | `"date"` | Type: date, time, datetime-local, month, week |

#### Date Type Mapping

| Type             | Icon          | Format           | Use Case              |
| ---------------- | ------------- | ---------------- | --------------------- |
| `date`           | Calendar      | YYYY-MM-DD       | Birth date, deadlines |
| `time`           | Clock         | HH:MM            | Appointment times     |
| `datetime-local` | CalendarClock | YYYY-MM-DDTHH:MM | Event scheduling      |
| `month`          | CalendarDays  | YYYY-MM          | Monthly reports       |
| `week`           | CalendarRange | YYYY-Www         | Sprint planning       |

#### Usage Example

```jsx
// Date picker
<Input_date
  label={{ text: "Birth Date" }}
  dateType="date"
/>

// Time picker
<Input_date
  label={{ text: "Appointment Time" }}
  dateType="time"
/>

// Date & Time
<Input_date
  label={{ text: "Event Start" }}
  dateType="datetime-local"
/>
```

---

### Input_search

Search input with automatic clear button and optimized UX.

#### Features

- Automatic clear (X) button when text is present
- Search icon on the left
- Controlled and uncontrolled modes
- Optional clear callback

#### Props

| Prop              | Type     | Default | Description                         |
| ----------------- | -------- | ------- | ----------------------------------- |
| `showClearButton` | boolean  | `true`  | Show clear button when text present |
| `onClear`         | function | -       | Callback when clear button clicked  |

#### Usage Example

```jsx
<Input_search
  label={{ text: "Search" }}
  placeholder="Search..."
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  onClear={() => console.log("Cleared!")}
/>
```

---

### Input_range

Range slider with value display and customizable range.

#### Features

- Visual track fill
- Value display (top or inline)
- Min/max labels
- Custom min/max/step
- Validation states
- Multiple sizes

#### Props

| Prop            | Type    | Default | Description                 |
| --------------- | ------- | ------- | --------------------------- |
| `min`           | number  | `0`     | Minimum value               |
| `max`           | number  | `100`   | Maximum value               |
| `step`          | number  | `1`     | Increment step              |
| `showValue`     | boolean | `true`  | Show current value          |
| `valuePosition` | string  | `"top"` | Value position: top, inline |
| `showMinMax`    | boolean | `true`  | Show min/max labels         |

#### Usage Example

```jsx
// Basic slider
<Input_range
  label="Volume"
  min={0}
  max={100}
  defaultValue={50}
/>

// Temperature slider
<Input_range
  label="Temperature (°C)"
  min={-20}
  max={40}
  step={5}
  defaultValue={20}
  valuePosition="inline"
/>

// Rating slider
<Input_range
  label="Rating"
  min={0}
  max={5}
  step={0.5}
  defaultValue={3.5}
/>
```

---

### Input_file

File upload component with automatic progress simulation.

#### Features

- Two modes: button and dropzone
- Automatic progress simulation (0% → 100%)
- Drag and drop support (dropzone mode)
- Multiple file support
- File type restrictions
- Size validation
- File list with progress bars

#### Props

| Prop       | Type     | Default    | Description                            |
| ---------- | -------- | ---------- | -------------------------------------- |
| `mode`     | string   | `"button"` | Upload mode: button, dropzone          |
| `multiple` | boolean  | `false`    | Allow multiple files                   |
| `accept`   | string   | -          | Accepted file types (e.g., "image/\*") |
| `maxSize`  | number   | -          | Max file size in bytes                 |
| `onChange` | function | -          | Called when files complete upload      |

#### Usage Example

```jsx
// Button mode
<Input_file
  label="Upload Document"
  mode="button"
  onChange={(files) => console.log("Uploaded:", files)}
/>

// Dropzone mode with restrictions
<Input_file
  label="Upload Images"
  mode="dropzone"
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
  onChange={(files) => console.log("Images:", files)}
/>

// Resume upload
<Input_file
  label="Resume"
  mode="dropzone"
  accept=".pdf,.doc,.docx"
  onChange={(files) => console.log("Resume:", files)}
/>
```

---

### Checkbox

Custom-styled checkbox with indeterminate state support.

#### Features

- Custom checkmark design
- Indeterminate state (dash icon)
- Label positioning (left/right)
- Multiple sizes
- Validation states
- Controlled and uncontrolled modes

#### Props

| Prop             | Type    | Default   | Description                 |
| ---------------- | ------- | --------- | --------------------------- |
| `label`          | string  | -         | Label text                  |
| `labelPosition`  | string  | `"right"` | Label position: left, right |
| `indeterminate`  | boolean | `false`   | Show indeterminate state    |
| `checked`        | boolean | -         | Controlled checked state    |
| `defaultChecked` | boolean | `false`   | Uncontrolled default state  |

#### Usage Example

```jsx
// Basic checkbox
<Checkbox
  label="Accept terms and conditions"
  defaultChecked={false}
/>

// Controlled checkbox
<Checkbox
  label="Remember me"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>

// Indeterminate (select all)
<Checkbox
  label="Select All"
  indeterminate={someSelected}
  checked={allSelected}
  onChange={handleSelectAll}
/>

// Validation states
<Checkbox
  label="Required field"
  validation="error"
/>
```

---

## Common Features

### Sizes

All components support multiple size variants:

| Size | Use Case                     |
| ---- | ---------------------------- |
| `xs` | Compact UIs, mobile          |
| `s`  | Dense forms                  |
| `m`  | Default, most common         |
| `l`  | Prominent inputs             |
| `xl` | Hero sections, landing pages |

### Validation States

Three validation states with color coding:

| State     | Color  | Use Case                       |
| --------- | ------ | ------------------------------ |
| `success` | Green  | Valid input, successful action |
| `error`   | Red    | Invalid input, required field  |
| `warning` | Orange | Caution, non-critical issue    |

### Disabled State

All components support `disabled` prop:

- Reduced opacity
- No pointer events
- Grayed out appearance
- Maintains accessibility

---

## Theming

All components use CSS variables from `App.css` for theming. This enables:

- **Automatic dark mode**: Components adapt to theme changes
- **Consistent styling**: Shared color palette
- **Easy customization**: Change variables globally

### Theme Variables Structure

```css
:root {
  /* Input Generic */
  --input-gen-bg: #ffffff;
  --input-gen-border: #d1d5db;
  --input-gen-text: #111827;
  /* ... */

  /* Checkbox */
  --checkbox-bg: #ffffff;
  --checkbox-border: #d1d5db;
  /* ... */

  /* Range Slider */
  --range-track-bg: #e5e7eb;
  --range-thumb-bg: #ffffff;
  /* ... */

  /* File Input */
  --file-button-bg: #ffffff;
  --file-dropzone-bg: #f9fafb;
  /* ... */
}

[data-theme="dark"] {
  /* Dark mode overrides */
}
```

---

## Best Practices

### 1. Use Appropriate Input Types

```jsx
// ✅ Good
<Input_email label={{ text: "Email" }} />
<Input_tel label={{ text: "Phone" }} contactType="phone" />
<Input_date label={{ text: "Birth Date" }} dateType="date" />

// ❌ Bad
<Input_text type="email" /> // Use Input_email instead
<Input_text type="tel" />   // Use Input_tel instead
```

### 2. Provide Clear Labels

```jsx
// ✅ Good
<Input_text label={{ text: "Full Name" }} placeholder="John Doe" />

// ❌ Bad
<Input_text placeholder="Name" /> // No label
```

### 3. Use Validation States

```jsx
// ✅ Good
<Input_email
  label={{ text: "Email" }}
  validation={emailError ? "error" : "success"}
  value={email}
/>

// ❌ Bad
<Input_email value={email} /> // No validation feedback
```

### 4. Handle Controlled Components Properly

```jsx
// ✅ Good - Controlled
const [value, setValue] = useState("");
<Input_text
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// ✅ Good - Uncontrolled
<Input_text defaultValue="initial" />

// ❌ Bad - Mixed
<Input_text
  value={value}
  // Missing onChange - input won't update
/>
```

### 5. Use Appropriate Sizes

```jsx
// ✅ Good
<Input_text size="s" /> // Compact form
<Input_text size="m" /> // Standard form
<Input_text size="l" /> // Prominent CTA

// ❌ Bad
<Input_text size="xl" /> // In a dense form
```

### 6. Leverage Contact Types

```jsx
// ✅ Good
<Input_tel contactType="whatsapp" label={{ text: "WhatsApp" }} />
<Input_tel contactType="telegram" label={{ text: "Telegram" }} />

// ❌ Bad
<Input_tel label={{ text: "WhatsApp" }} /> // Generic phone icon
```

### 7. Use File Upload Appropriately

```jsx
// ✅ Good - Dropzone for multiple files
<Input_file
  mode="dropzone"
  multiple
  accept="image/*"
  label="Upload Photos"
/>

// ✅ Good - Button for single file
<Input_file
  mode="button"
  accept=".pdf"
  label="Upload Resume"
/>

// ❌ Bad - Button for many files
<Input_file mode="button" multiple /> // Use dropzone instead
```

### 8. Accessibility

```jsx
// ✅ Good
<Input_text
  id="username"
  label={{ text: "Username" }}
  aria-required="true"
/>

// ✅ Good
<Checkbox
  id="terms"
  label="I accept the terms"
/>

// ❌ Bad
<Input_text /> // No label or id
```

---

## File Structure

```
01_inputs/
├── InputGeneric.jsx          # Base component
├── Input_text.jsx            # Text input
├── Input_email.jsx           # Email input
├── Input_psw.jsx             # Password input
├── Input_number.jsx          # Number input
├── Input_url.jsx             # URL input
├── Input_tel.jsx             # Telephone input
├── Input_date.jsx            # Date/time input
├── Input_search.jsx          # Search input
├── Input_range.jsx           # Range slider
├── Input_file.jsx            # File upload
├── Checkbox.jsx              # Checkbox
├── _inputs.index.js          # Export barrel
├── README.inputs.md          # This file
└── _styles/
    ├── inputGeneric.css      # Base styles
    ├── checkbox.css          # Checkbox styles
    ├── input_range.css       # Range slider styles
    └── input_file.css        # File upload styles
```

---

## Import Examples

```javascript
// Import specific components
import {
  Input_text,
  Input_email,
  Checkbox,
} from "./00_components/_components.index.js";

// Or from inputs directly
import { Input_text } from "./00_components/01_inputs/_inputs.index.js";
```

---

## Testing

All components have comprehensive test files in:

```
frontEnd/src/05_pages/__test/comps/input/
```

Each test file demonstrates:

- Basic usage
- Size variations
- Validation states
- Disabled states
- Real-world examples

---

## Browser Support

All components are tested and work in:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Contributing

When adding new input components:

1. Extend `InputGeneric` if it's a text-based input
2. Create standalone component for unique functionality
3. Add CSS variables to `App.css` (light and dark themes)
4. Create comprehensive test file
5. Update this README
6. Follow existing naming conventions

---

## License

Part of the LeavePlanner project.
