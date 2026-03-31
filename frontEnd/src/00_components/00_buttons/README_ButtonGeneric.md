# ButtonGeneric

A fully **stateless, prop-driven** button component for the LeavePlanner frontend.
Every aspect of its appearance and behaviour is controlled via props — it holds
zero business logic.

---

## Location

```
frontEnd/src/00_components/00_buttons/
├── ButtonGeneric.jsx           ← Main component (public)
├── ButtonGenericLoader.jsx     ← Spinning ring sub-component (internal)
├── ButtonGenericTooltip.jsx    ← Custom tooltip sub-component (internal)
├── buttonGeneric.css           ← All button styles
├── buttonGenericLoader.css     ← Spinner keyframes & size scaling
├── buttonGenericTooltip.css    ← Tooltip positioning & animation
├── _buttons.index.js           ← Barrel file — only exports ButtonGeneric
└── README.md                   ← This file
```

Only `ButtonGeneric` is exported through the barrel file.  The loader and
tooltip are implementation details consumed internally.

---

## Import

```jsx
// Via the barrel (recommended)
import { ButtonGeneric } from "../00_components/_components.index.js";

// Direct import
import ButtonGeneric from "../00_components/00_buttons/ButtonGeneric.jsx";
```

---

## Quick start

```jsx
<ButtonGeneric text="Save" version="primary" onClick={handleSave} />
```

---

## Props reference

### Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Label text rendered inside the button. Omit for icon-only buttons (combine with `ariaLabel` for accessibility). |
| `icon` | `object` | — | Icon configuration with optional `left` and `right` slots. See [Icon system](#icon-system) below. |

### Visual variant

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `version` | `"primary"` \| `"secondary"` \| `"normal"` | `"normal"` | Controls the colour scheme. **primary** = solid indigo background with white text, for confirmations and submissions. **secondary** = transparent background with indigo border and text, for cancellations and going back. **normal** = neutral colours, the default general-purpose button. |
| `size` | `"xs"` \| `"s"` \| `"m"` \| `"l"` \| `"xl"` \| `"xxl"` | `"m"` | Proportionally scales padding, font-size, border-radius, icon dimensions, and the loading spinner. |

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fullWidth` | `bool` | `false` | When `true` the button stretches to `width: 100%` of its parent container. Useful for mobile layouts and form submit rows. |

### State

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `bool` | `false` | Enables the loading overlay: a centred spinner appears on top of the content (faded to opacity 0.3) and the button becomes disabled automatically. |
| `disabled` | `bool` | `false` | Manually disables the button (reduced opacity, `cursor: not-allowed`). Also applied implicitly when `loading` is `true`. |

### Tooltip

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tooltip` | `string` | — | When provided, a custom-styled tooltip appears above the button on hover and keyboard focus, and hides on leave / blur. Theme-aware (light/dark). |

### Events

| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `func` | Fires when the button is clicked. Blocked when disabled or loading. |
| `onMouseEnter` | `func` | Fires on mouse enter. Also used internally to show the tooltip, but the consumer's handler is still called. |
| `onMouseLeave` | `func` | Fires on mouse leave. Also used internally to hide the tooltip. |
| `onFocus` | `func` | Fires on keyboard focus. Also used internally to show the tooltip. |
| `onBlur` | `func` | Fires on blur. Also used internally to hide the tooltip. |

### HTML attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"button"` \| `"submit"` \| `"reset"` | `"button"` | HTML button `type` attribute. Defaults to `"button"` to prevent accidental form submissions. Set to `"submit"` inside `<form>` elements. |
| `className` | `string` | `""` | One or more extra CSS classes **appended** to the built-in className string. Never replaces the defaults. |
| `ariaLabel` | `string` | — | Accessible label read by screen readers. **Required** for icon-only buttons that have no visible text. |
| `tabIndex` | `number` | — | Overrides the default tab order. Usually not needed. |
| `id` | `string` | — | Standard HTML `id` attribute for label association or programmatic lookup. |

### data_* attributes

Any prop whose key starts with `data_` is automatically converted to an HTML
`data-*` attribute on the `<button>` element.

```jsx
<ButtonGeneric
  text="Delete"
  data_userId="abc123"
  data_action="delete"
  onClick={(e) => {
    console.log(e.target.dataset.userid);  // "abc123"
    console.log(e.target.dataset.action);  // "delete"
  }}
/>
```

> **Note:** HTML dataset keys are always lowercased, so `data_userId` becomes
> `data-userid` in the DOM, accessible as `e.target.dataset.userid`.

### Ref forwarding

The component is wrapped with `React.forwardRef`, so you can attach a ref to
access the underlying `<button>` DOM node:

```jsx
const btnRef = useRef(null);

<ButtonGeneric ref={btnRef} text="Focus me" />

// Later...
btnRef.current.focus();
```

---

## Icon system

The `icon` prop is an object with two optional slots: `left` and `right`.
Each slot accepts **one** of two formats:

### 1. Lucide-react icon by name

Pass the PascalCase name of any icon from the `lucide-react` package:

```jsx
icon={{ left: { name: "ArrowLeft" } }}
```

The component resolves it at runtime via `icons[name]` from `lucide-react`.
If the name is not found, a console warning is printed and nothing renders.

### 2. Custom image by src

Pass an object describing an `<img>` tag:

```jsx
icon={{ left: { img: { src: "/icons/logo.svg", alt: "Logo", width: 16, height: 16 } } }}
```

| Key | Type | Required | Description |
|-----|------|----------|-------------|
| `src` | `string` | Yes | Image URL or path. |
| `alt` | `string` | No | Alt text. When empty, `aria-hidden` is set. |
| `width` | `number` | No | Explicit width (px). Size is also controlled by CSS via the parent size class. |
| `height` | `number` | No | Explicit height (px). |

### Combined example

```jsx
<ButtonGeneric
  text="Navigate"
  icon={{
    left:  { name: "ArrowLeft" },
    right: { img: { src: "/icons/external.svg", alt: "External link" } },
  }}
/>
```

---

## Versions in detail

### primary

For high-emphasis, affirmative actions: **confirm, save, submit, accept, create**.

```jsx
<ButtonGeneric text="Confirm" version="primary" onClick={handleConfirm} />
```

Light theme: solid indigo background (`#4f46e5`), white text.
Dark theme: slightly lighter indigo (`#6366f1`), white text.

### secondary

For medium-emphasis, dismissive actions: **cancel, go back, dismiss, close**.

```jsx
<ButtonGeneric text="Cancel" version="secondary" onClick={handleCancel} />
```

Light theme: transparent background, indigo border and text.
Dark theme: transparent background, lighter indigo border and text.

### normal

The **default** general-purpose button for neutral actions.

```jsx
<ButtonGeneric text="Details" onClick={handleDetails} />
```

Light theme: white background, grey border, dark text.
Dark theme: dark slate background, medium border, light text.

---

## Sizes

| Key | Font | Padding | Radius | Icon | Use case |
|-----|------|---------|--------|------|----------|
| `xs` | 11 px | 4 px 8 px | 4 px | 12 px | Compact toolbars, table row actions |
| `s` | 13 px | 6 px 12 px | 5 px | 14 px | Secondary actions, inline controls |
| `m` | 15 px | 8 px 16 px | 6 px | 16 px | **Default.** Most buttons in the app. |
| `l` | 17 px | 10 px 20 px | 7 px | 20 px | Form submit buttons, prominent CTAs |
| `xl` | 19 px | 12 px 24 px | 8 px | 24 px | Hero sections, landing page CTAs |
| `xxl` | 22 px | 14 px 28 px | 9 px | 28 px | Full-bleed mobile actions |

---

## Loading state

When `loading={true}`:

1. A spinning ring (`ButtonGenericLoader`) is absolutely positioned in the
   centre of the button.
2. The content (text + icons) fades to `opacity: 0.3` so the spinner is
   clearly visible while the button dimensions stay stable.
3. The button is automatically `disabled` — clicks are blocked and the cursor
   changes to `default`.

```jsx
<ButtonGeneric text="Saving..." version="primary" loading={true} />
```

The spinner inherits both the `size` and `version` of the parent button so its
dimensions and colour always match.

---

## Tooltip

Pass a `tooltip` string and a styled tooltip appears above the button on
hover and keyboard focus:

```jsx
<ButtonGeneric
  text="Archive"
  tooltip="Move to the archive folder"
  icon={{ left: { name: "Archive" } }}
/>
```

- Positioned absolutely, centred above the button with a small caret arrow.
- Fades in over 180 ms.
- Theme-aware via `--btn-tooltip-bg` and `--btn-tooltip-text` CSS variables.

---

## Theme support

All colours are driven by CSS custom properties in `frontEnd/src/App.css`.
The button declares `transition` on `background-color`, `color`,
`border-color`, and `box-shadow` with a 0.25 s ease, matching the global
body transition — so toggling between light and dark mode is seamless.

### Variables per version (abbreviated)

| Variable pattern | Example |
|------------------|---------|
| `--btn-{version}-bg` | `--btn-primary-bg` |
| `--btn-{version}-text` | `--btn-primary-text` |
| `--btn-{version}-border` | `--btn-primary-border` |
| `--btn-{version}-hover-bg` | `--btn-primary-hover-bg` |
| `--btn-{version}-hover-border` | `--btn-primary-hover-border` |
| `--btn-{version}-active-bg` | `--btn-primary-active-bg` |
| `--btn-{version}-spinner` | `--btn-primary-spinner` |
| `--btn-{version}-focus-ring` | `--btn-primary-focus-ring` |
| `--btn-tooltip-bg` | — |
| `--btn-tooltip-text` | — |

Each variable has both a `:root` (light) and `[data-theme="dark"]` value.

---

## className convention

| Class | Role |
|-------|------|
| `buttonGeneric` | Root element |
| `buttonGeneric-primary` | Version modifier |
| `buttonGeneric-m` | Size modifier |
| `buttonGeneric-loading` | Loading state |
| `buttonGeneric-disabled` | Disabled state |
| `buttonGeneric-fullWidth` | Full-width mode |
| `buttonGeneric_content` | Inner flex wrapper for text + icons |
| `buttonGeneric_iconLeft` | Left icon wrapper |
| `buttonGeneric_iconRight` | Right icon wrapper |
| `buttonGeneric_text` | Text `<span>` |
| `buttonGeneric_loaderOverlay` | Absolutely positioned spinner container |
| `buttonGeneric_tooltipWrap` | Relative wrapper added when tooltip is present |

Separator rules:
- **Hyphen (`-`)** for modifiers (version, size, state).
- **Single underscore (`_`)** for child elements.
- **No double underscores (`__`)** anywhere.

---

## Accessibility

| Feature | Implementation |
|---------|----------------|
| Keyboard focus ring | `:focus-visible` outline (hidden on mouse click) |
| Screen reader label | `ariaLabel` prop → `aria-label` on `<button>` |
| Loading announcement | `aria-busy={true}` when loading |
| Spinner role | `role="status"` + `aria-label="Loading"` on spinner |
| Tooltip role | `role="tooltip"` on tooltip element |
| Icon hiding | `aria-hidden="true"` on decorative icons |

---

## Full usage examples

```jsx
// Text only — defaults to version="normal", size="m"
<ButtonGeneric text="Cancel" onClick={handleCancel} />

// Primary with a left lucide icon
<ButtonGeneric
  text="Confirm"
  version="primary"
  size="l"
  icon={{ left: { name: "Check" } }}
  onClick={handleConfirm}
/>

// Icon-only button (ariaLabel required)
<ButtonGeneric
  version="secondary"
  icon={{ left: { name: "X" } }}
  ariaLabel="Close"
  onClick={handleClose}
/>

// Both icons, different types per side
<ButtonGeneric
  text="Navigate"
  icon={{
    left:  { name: "ArrowLeft" },
    right: { img: { src: "/icons/external.svg", alt: "External" } },
  }}
/>

// Loading state
<ButtonGeneric
  text="Saving..."
  version="primary"
  loading={true}
  onClick={handleSave}
/>

// Full width inside a form
<ButtonGeneric
  text="Submit Application"
  version="primary"
  size="l"
  type="submit"
  fullWidth={true}
/>

// Tooltip
<ButtonGeneric
  text="Archive"
  tooltip="Move to archive folder"
  icon={{ left: { name: "Archive" } }}
/>

// data_* attributes for event metadata
<ButtonGeneric
  text="Delete"
  version="secondary"
  data_userId="abc123"
  data_action="delete"
  onClick={(e) => {
    const { userid, action } = e.target.dataset;
  }}
/>

// Forwarding a ref for programmatic focus
const btnRef = useRef(null);
<ButtonGeneric ref={btnRef} text="Focus me" />
```

---

## Internal sub-components

### ButtonGenericLoader

Renders a CSS-animated spinning ring.  Receives `size` and `version` from the
parent button to match dimensions and colour via modifier classes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs"` – `"xxl"` | `"m"` | Scales the ring width and height. |
| `version` | `"primary"` \| `"secondary"` \| `"normal"` | `"normal"` | Determines ring colour via `--btn-{version}-spinner`. |

### ButtonGenericTooltip

Renders a themed tooltip with a caret arrow and a fade-in animation.
Visibility is 100 % controlled by the parent — no internal state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Tooltip content. Returns `null` when falsy. |
| `visible` | `bool` | `false` | When `true` the tooltip fades in. |

Neither sub-component is exported through the barrel file.  They are
consumed only by `ButtonGeneric.jsx`.
