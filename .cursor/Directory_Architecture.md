# Frontend Directory Architecture (LeavePlanner)

This document is the **single source of truth** for the frontend feature/page directory architecture used in `frontEnd/src/05_pages/`. Every developer (human or AI) must follow these conventions when creating, editing, or reviewing page directories.

---

## Table of Contents

1. [Placeholder Legend](#1-placeholder-legend)
2. [Canonical Directory & File Layout](#2-canonical-directory--file-layout)
3. [Directory Creation Rules (Required vs Optional)](#3-directory-creation-rules-required-vs-optional)
4. [Barrel / Index Files](#4-barrel--index-files)
5. [Component Naming & File Structure (`01_XXX_comps`)](#5-component-naming--file-structure-01_xxx_comps)
6. [CSS & ClassName Conventions](#6-css--classname-conventions)
7. [Hooks Directory & The 4-File Split (`03_XXX_hooks`)](#7-hooks-directory--the-4-file-split-03_xxx_hooks)
8. [The `compProps` Pattern (Props Distribution)](#8-the-compprops-pattern-props-distribution)
9. [Translation (`t`) Passing Rule](#9-translation-t-passing-rule)
10. [Helpers Directory (`02_XXX_helpers`)](#10-helpers-directory-02_xxx_helpers)
11. [Validation / Constants / Memo / Tests (`04`–`07`)](#11-validation--constants--memo--tests-0407)
12. [Debug Config File (`XXX.config.js`)](#12-debug-config-file-xxxconfigjs)
13. [Advanced: Multi-Feature Hook Directories](#13-advanced-multi-feature-hook-directories)
14. [Naming Reference Table](#14-naming-reference-table)
15. [Full Concrete Example (Contact Page)](#15-full-concrete-example-contact-page)
16. [Development Workflow Summary](#16-development-workflow-summary)

---

## 1) Placeholder Legend

Throughout this document, placeholder names represent real names you will substitute when creating a page.

| Placeholder | Meaning                                                                | Real Example                       |
| ----------- | ---------------------------------------------------------------------- | ---------------------------------- |
| **`XXX`**   | The parent page / feature name (the main component and directory name) | `Contact`                          |
| **`YYY`**   | A component name inside the parent page                                | `ContactForm`                      |
| **`ZZZ`**   | A child component of a component (`YYY`)                               | `SubmitButton`                     |
| **`AAA`**   | A CSS class name (the local descriptor after the prefix)               | `header`, `field`, `buttonPrimary` |

**Rule:** When you create a real page, replace **every** placeholder consistently. If the page is called `Contact`, then `XXX` = `Contact` everywhere — in folder names, file names, hook names, class names, props names, and barrel files.

---

## 2) Canonical Directory & File Layout

Below is the **complete** template for a page directory. Every page in `frontEnd/src/05_pages/` must follow this shape.

```text
frontEnd/src/05_pages/XXX/
│
├── XXX.jsx                        # Main Parent Component (the page entry point)
├── XXX.config.js                  # Debug flags & page-level configuration
│
├── _styles/                       # ALL CSS files for ALL components in this directory
│   ├── xxx.css                    # CSS for the parent component XXX.jsx
│   ├── xxx_YYY.css                # CSS for a component XXX_YYY.jsx
│   └── xxx_YYY_ZZZ.css            # CSS for a child component XXX_YYY_ZZZ.jsx
│
├── 01_XXX_comps/                  # UI components composed by XXX.jsx
│   ├── _XXX_comps.index.js        # Barrel file — re-exports all components
│   ├── XXX_YYY.jsx                # A component (e.g. Contact_ContactForm.jsx)
│   └── XXX_childComps/            # Child components used BY components in 01_XXX_comps
│       ├── _XXX_childComps.index.js
│       └── XXX_YYY_ZZZ.jsx        # A child component (e.g. Contact_ContactForm_SubmitButton.jsx)
│
├── 02_XXX_helpers/                # Pure helper functions (formatters, transformers, utilities)
│   └── _XXX_helpers.index.js      # Barrel file
│
├── 03_XXX_hooks/                  # Hooks — the page-level logic layer
│   ├── _XXX_hooks.index.js        # Barrel file
│   ├── useXXX_states.js           # All useState declarations → returns { states, setters }
│   ├── useXXX_handlers.js         # Event handlers → returns { handlers }
│   ├── useXXX_apiHelpers.js       # API call wrappers → returns { apiHelpers }
│   └── useXXX.js                  # Main hook — assembles the above, returns everything
│
├── 04_XXX_vld/                    # Validation & sanitization functions
│   └── _XXX_vld.index.js          # Barrel file
│
├── 05_XXX_cnst/                   # Constants
│   └── _XXX_cnst.index.js         # Barrel file
│
├── 06_XXX_memo/                   # React.memo comparison functions & memo helpers
│   └── _XXX_memo.index.js         # Barrel file
│
└── 07_XXX_test/                   # Tests
    └── _XXX_test.index.js         # Barrel file
```

---

## 3) Directory Creation Rules (Required vs Optional)

Not all directories need content, but certain ones must **always exist** with at least their barrel file.

| Directory         | Must Always Exist? | Must Have Content?                                                                                         |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `_styles/`        | **Yes**            | Yes — at minimum `xxx.css` for the parent component                                                        |
| `01_XXX_comps/`   | **Yes**            | Yes — the page always has at least one component                                                           |
| `02_XXX_helpers/` | **Yes**            | No — create the dir + barrel file even if empty                                                            |
| `03_XXX_hooks/`   | **Yes**            | No — create the dir + barrel file. Only add the 4 hook files if the page needs state/logic (see Section 7) |
| `04_XXX_vld/`     | **Yes**            | No — create the dir + barrel file even if empty                                                            |
| `05_XXX_cnst/`    | **Yes**            | No — create the dir + barrel file even if empty                                                            |
| `06_XXX_memo/`    | **Yes**            | No — create the dir + barrel file even if empty                                                            |
| `07_XXX_test/`    | **Yes**            | No — create the dir + barrel file even if empty                                                            |

**Key rule:** All 8 directories (`_styles`, `01`–`07`) plus their barrel/index files must be created when scaffolding any new page, regardless of whether the page currently uses them. This guarantees a predictable structure across the entire codebase.

**Hooks exception:** The 4 hook files (`useXXX_states.js`, `useXXX_handlers.js`, `useXXX_apiHelpers.js`, `useXXX.js`) are only created inside `03_XXX_hooks/` when the page actually needs state, handlers, or API calls. A simple display-only page only needs the empty `03_XXX_hooks/` directory with its `_XXX_hooks.index.js` barrel file.

---

## 4) Barrel / Index Files

Every sub-directory has exactly **one barrel file** that re-exports everything from that directory. This is the only import path that external code should use.

### Naming pattern

```text
_XXX_<bucket>.index.js
```

- Starts with `_` (underscore prefix — this sorts it to the top of the directory listing)
- `XXX` is the page name
- `<bucket>` is the directory purpose: `comps`, `childComps`, `helpers`, `hooks`, `vld`, `cnst`, `memo`, `test`
- Ends with `.index.js`

### Complete list per page

```text
01_XXX_comps/_XXX_comps.index.js
01_XXX_comps/XXX_childComps/_XXX_childComps.index.js
02_XXX_helpers/_XXX_helpers.index.js
03_XXX_hooks/_XXX_hooks.index.js
04_XXX_vld/_XXX_vld.index.js
05_XXX_cnst/_XXX_cnst.index.js
06_XXX_memo/_XXX_memo.index.js
07_XXX_test/_XXX_test.index.js
```

### Barrel file content example

```js
// _Contact_comps.index.js
export { default as Contact_ContactForm } from "./Contact_ContactForm.jsx";
export { default as Contact_InfoSidebar } from "./Contact_InfoSidebar.jsx";
```

### Import rule

All external imports from a sub-directory **must** go through the barrel file:

```js
// ✅ Correct — import from the barrel
import { Contact_ContactForm } from "./01_Contact_comps/_Contact_comps.index.js";

// ❌ Wrong — importing directly from the component file
import Contact_ContactForm from "./01_Contact_comps/Contact_ContactForm.jsx";
```

---

## 5) Component Naming & File Structure (`01_XXX_comps`)

### 5.1 Rule: all components of the parent page go here

Every UI component that `XXX.jsx` renders must live inside `01_XXX_comps/`. No component file should sit loose next to `XXX.jsx`.

### 5.2 Component file naming (MANDATORY prefix)

Every component file inside `01_XXX_comps/` must be prefixed with the parent page name:

```text
XXX_YYY.jsx
```

| Part  | Meaning                     | Case       |
| ----- | --------------------------- | ---------- |
| `XXX` | Parent page/feature name    | PascalCase |
| `_`   | Single underscore separator | —          |
| `YYY` | The component's own name    | PascalCase |

**Real examples (parent = `Contact`):**

```text
Contact_ContactForm.jsx
Contact_InfoSidebar.jsx
Contact_MapSection.jsx
```

This prefix makes it instantly clear which page owns the component, even if you see the filename in search results, import statements, or DevTools.

### 5.3 Child components (`XXX_childComps/`)

When a component (`XXX_YYY.jsx`) needs its own smaller sub-components, they go into:

```text
01_XXX_comps/XXX_childComps/
```

Child component file naming adds a third segment:

```text
XXX_YYY_ZZZ.jsx
```

| Part  | Meaning                            |
| ----- | ---------------------------------- |
| `XXX` | Parent page name                   |
| `YYY` | The component that uses this child |
| `ZZZ` | The child component's own name     |

**Real examples (parent = `Contact`, component = `ContactForm`):**

```text
Contact_ContactForm_SubmitButton.jsx
Contact_ContactForm_Field.jsx
Contact_ContactForm_MessageField.jsx
```

### 5.4 Component function name inside the file

The exported function name matches the **full file name** (without `.jsx`):

```jsx
// File: Contact_ContactForm.jsx
const Contact_ContactForm = ({ states, handlers, t, childProps }) => {
  return <div className="contact_ContactForm">...</div>;
};

export default Contact_ContactForm;
```

---

## 6) CSS & ClassName Conventions

### 6.1 One CSS file per component — stored in `_styles/`

All CSS files for every component in the page live in the centralized `_styles/` directory. There is exactly **one CSS file per UI component**.

### 6.2 CSS file naming

The CSS file name is derived from the component's **full prefixed name**, converted to **lowerCamelCase**:

| Component File     | CSS File          |
| ------------------ | ----------------- |
| `XXX.jsx` (parent) | `xxx.css`         |
| `XXX_YYY.jsx`      | `xxx_YYY.css`     |
| `XXX_YYY_ZZZ.jsx`  | `xxx_YYY_ZZZ.css` |

**Real examples (parent = `Contact`):**

| Component File                         | CSS File                               |
| -------------------------------------- | -------------------------------------- |
| `Contact.jsx`                          | `contact.css`                          |
| `Contact_ContactForm.jsx`              | `contact_ContactForm.css`              |
| `Contact_ContactForm_SubmitButton.jsx` | `contact_ContactForm_SubmitButton.css` |

### 6.3 CSS import location

Each component imports **its own** CSS file from `_styles/`:

```jsx
// Inside Contact_ContactForm.jsx
import "../_styles/contact_ContactForm.css";
```

For the parent component:

```jsx
// Inside Contact.jsx
import "./_styles/contact.css";
```

### 6.4 Root element rule

The root element of every component **must be a `<div>`** with a `className` that uniquely identifies the component.

The root className is built from the **full component hierarchy** using underscores:

| Component                              | Root className                     |
| -------------------------------------- | ---------------------------------- |
| `Contact.jsx` (parent)                 | `contact`                          |
| `Contact_ContactForm.jsx`              | `contact_ContactForm`              |
| `Contact_ContactForm_SubmitButton.jsx` | `contact_ContactForm_SubmitButton` |

```jsx
// Contact_ContactForm.jsx
const Contact_ContactForm = (props) => {
  return <div className="contact_ContactForm">...</div>;
};
```

### 6.5 ClassName convention for internal elements

All classNames inside a component must start with the **component's root className**, followed by **one underscore** (`_`), then the local element descriptor.

**Pattern:**

```text
XXX_YYY_ZZZ_AAA
│    │    │    └── AAA = local element class name (camelCase)
│    │    └────── ZZZ = child component name (if applicable)
│    └─────────── YYY = component name
└──────────────── XXX = parent page name (lowerCamelCase at the start)
```

**Real examples inside `Contact_ContactForm.jsx`:**

```text
✅ Good:
  contact_ContactForm              (root)
  contact_ContactForm_header
  contact_ContactForm_field
  contact_ContactForm_error
  contact_ContactForm_buttonPrimary

❌ Avoid:
  contactForm_header               (missing the page prefix)
  contact_ContactForm__header      (double underscore)
  contact__ContactForm_header      (double underscore)
  form_field                       (generic, no lineage)
```

**Real examples inside `Contact_ContactForm_SubmitButton.jsx`:**

```text
✅ Good:
  contact_ContactForm_SubmitButton              (root)
  contact_ContactForm_SubmitButton_label
  contact_ContactForm_SubmitButton_icon

❌ Avoid:
  submitButton_label               (missing lineage)
```

### 6.6 Single underscore rule

Only **one underscore** (`_`) is used as a separator between segments. Never use double underscores (`__`). This is intentionally different from BEM convention to keep names shorter and consistent.

### 6.7 Why this convention?

- Every className in the entire app is guaranteed **globally unique** because it carries its full component lineage.
- You can search for any className and immediately know which page, component, and child it belongs to.
- No CSS collisions between pages or components — ever.

---

## 7) Hooks Directory & The 4-File Split (`03_XXX_hooks`)

### 7.1 When to create hook files

- The `03_XXX_hooks/` directory and its barrel file `_XXX_hooks.index.js` must **always** exist.
- The 4 hook files below are only created when the page actually needs state, handlers, or API calls.
- A purely presentational page (e.g., a static "About" page that only passes translations) can skip the 4 hook files and just have the empty directory + barrel.

### 7.2 The 4-file split

When hooks are needed, create exactly these 4 files:

#### File 1: `useXXX_states.js`

**Purpose:** Declare all `useState` (and optionally `useReducer`) calls for the page.

**Returns:** Exactly two objects — `states` and `setters`.

```js
import { useState } from "react";

export const useContact_states = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return {
    states: { form, sending, submitted },
    setters: { setForm, setSending, setSubmitted },
  };
};
```

**Rules:**

- No side effects. Only state declarations.
- No parameters. This hook is self-contained.

#### File 2: `useXXX_apiHelpers.js`

**Purpose:** Import base API call functions from `frontEnd/src/02_api/api_calls/_api_calls.index.js` and wrap them into page-specific API helper functions.

**Returns:** `{ apiHelpers: { ... } }`

```js
import { sendContactMessage } from "../../../../02_api/api_calls/_api_calls.index.js";

export const useContact_apiHelpers = (states, setters) => {
  const submitContactForm = async () => {
    setters.setSending(true);
    const result = await sendContactMessage(states.form);
    setters.setSending(false);
    return result;
  };

  return { apiHelpers: { submitContactForm } };
};
```

**Rules:**

- Typically does **not** take parameters, but **can** receive `states`, `setters`, or other dependencies when the API helpers need them (e.g., to read current state or update loading flags).
- Document in a comment why parameters are needed if you pass them.

#### File 3: `useXXX_handlers.js`

**Purpose:** Define all event handlers and action functions that the UI will call (onClick, onSubmit, onChange, etc.).

**Receives:** Dependencies needed to build the handlers — typically `states`, `setters`, and optionally `apiHelpers`, `t`, etc.

**Returns:** `{ handlers: { ... } }`

```js
import { useCallback } from "react";

export const useContact_handlers = (states, setters, apiHelpers) => {
  const handleFieldUpdate = useCallback(
    (field, value) => {
      setters.setForm((prev) => ({ ...prev, [field]: value }));
    },
    [setters],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const result = await apiHelpers.submitContactForm();
      if (result.success) setters.setSubmitted(true);
    },
    [apiHelpers, setters],
  );

  return { handlers: { handleFieldUpdate, handleSubmit } };
};
```

**Rules:**

- All handlers should be wrapped with `useCallback` for performance.
- Parameter list is flexible — pass whatever this hook needs. Just be consistent within the page.

#### File 4: `useXXX.js` (The Main Hook)

**Purpose:** The single orchestrator. It calls the 3 hooks above, runs any `useEffect` logic, builds the `compProps` objects, and returns the final shape consumed by `XXX.jsx`.

**Returns:** `{ t, [tCommon, tOther...], states, handlers, compProps }`

```js
import { useTranslation } from "react-i18next";
import { useContact_states } from "./useContact_states.js";
import { useContact_handlers } from "./useContact_handlers.js";
import { useContact_apiHelpers } from "./useContact_apiHelpers.js";

export const useContact = () => {
  const { t } = useTranslation("contact");
  const { t: tCommon } = useTranslation("common");
  const { states, setters } = useContact_states();
  const { apiHelpers } = useContact_apiHelpers(states, setters);
  const { handlers } = useContact_handlers(states, setters, apiHelpers);

  // --- Build per-component props objects (see Section 8) ---

  const Contact_ContactForm_SubmitButton_props = {
    states: { sending: states.sending },
    handlers: { handleSubmit: handlers.handleSubmit },
  };

  const Contact_ContactForm_props = {
    states: {
      form: states.form,
      sending: states.sending,
      submitted: states.submitted,
    },
    handlers: {
      handleFieldUpdate: handlers.handleFieldUpdate,
      handleSubmit: handlers.handleSubmit,
    },
    t,
    tCommon,
    childProps: { Contact_ContactForm_SubmitButton_props },
  };

  const Contact_InfoSidebar_props = {
    t,
  };

  return {
    t,
    tCommon,
    states,
    handlers,
    compProps: {
      Contact_ContactForm_props,
      Contact_InfoSidebar_props,
    },
  };
};
```

See **Section 8** for full `compProps` rules.

### 7.3 Hook naming convention

The main hook and its sub-hooks all follow:

```text
use<PageName>.js           → useContact.js
use<PageName>_states.js    → useContact_states.js
use<PageName>_handlers.js  → useContact_handlers.js
use<PageName>_apiHelpers.js → useContact_apiHelpers.js
```

`<PageName>` = the exact directory/page name in PascalCase.

For the **advanced multi-feature case** (separate hook directories per feature), see **Section 13**.

---

## 8) The `compProps` Pattern (Props Distribution)

This is the **core pattern** for distributing data from the main hook down to components and their children.

### 8.1 Concept

Instead of passing loose props directly from the parent component, the main hook pre-builds a **named props object** for every component and child component. This keeps `XXX.jsx` clean and makes the data flow explicit and traceable.

### 8.2 Naming convention

```text
XXX_YYY_props          → props for a component
XXX_YYY_ZZZ_props      → props for a child component
```

**Real examples:**

```text
Contact_ContactForm_props
Contact_ContactForm_SubmitButton_props
Contact_ContactForm_MessageField_props
Contact_InfoSidebar_props
```

### 8.3 Props object structure

#### Component props (one level of children)

```js
const Contact_ContactForm_props = {
  states, // only the states this component needs
  handlers, // only the handlers this component needs
  t, // translation function(s)
  childProps: {
    Contact_ContactForm_SubmitButton_props,
    Contact_ContactForm_MessageField_props,
  },
};
```

#### Child component props (leaf level — no further children)

```js
const Contact_ContactForm_SubmitButton_props = {
  states: { sending: states.sending },
  handlers: { handleSubmit: handlers.handleSubmit },
};
```

#### What goes inside `childProps`

`childProps` is an object whose **keys** are the full child prop names (`XXX_YYY_ZZZ_props`), and whose values are the pre-built props objects for those children. The parent component (`XXX_YYY.jsx`) receives `childProps` and passes each entry down to the corresponding child component.

### 8.4 How the parent component (`XXX.jsx`) uses `compProps`

```jsx
import { useContact } from "./03_Contact_hooks/_Contact_hooks.index.js";
import {
  Contact_ContactForm,
  Contact_InfoSidebar,
} from "./01_Contact_comps/_Contact_comps.index.js";
import "./_styles/contact.css";

const Contact = () => {
  const { t, tCommon, states, handlers, compProps } = useContact();

  return (
    <div className="contact">
      <Contact_ContactForm {...compProps.Contact_ContactForm_props} />
      <Contact_InfoSidebar {...compProps.Contact_InfoSidebar_props} />
    </div>
  );
};

export default Contact;
```

### 8.5 How a component (`XXX_YYY.jsx`) passes `childProps` down

```jsx
import "../_styles/contact_ContactForm.css";
import {
  Contact_ContactForm_SubmitButton,
  Contact_ContactForm_MessageField,
} from "./XXX_childComps/_Contact_childComps.index.js";

const Contact_ContactForm = ({ states, handlers, t, tCommon, childProps }) => {
  return (
    <div className="contact_ContactForm">
      <Contact_ContactForm_MessageField
        {...childProps.Contact_ContactForm_MessageField_props}
      />
      <Contact_ContactForm_SubmitButton
        {...childProps.Contact_ContactForm_SubmitButton_props}
      />
    </div>
  );
};

export default Contact_ContactForm;
```

### 8.6 Why this pattern?

- **Single source of truth:** All prop assembly happens in the main hook. Components never reach back into global state.
- **Traceability:** Every prop can be traced from the hook, through the parent, down to the exact child that consumes it.
- **Selective passing:** Each component only receives the exact `states` and `handlers` it needs — not the entire page state. This is important for performance with `React.memo`.

---

## 9) Translation (`t`) Passing Rule

- If the page uses the 4-hook structure, all translation functions are extracted in the **main hook** (`useXXX.js`) using `useTranslation`.
- If the page does **not** use the 4-hook structure, import the translation function(s) in the **parent component** (`XXX.jsx`) instead.
- If the page needs multiple translation namespaces, extract them all in the main hook:

```js
const { t } = useTranslation("contact");
const { t: tCommon } = useTranslation("common");
const { t: tValidation } = useTranslation("validation");
```

- All translation functions (`t`, `tCommon`, `tValidation`, etc.) are passed **down through props** from the main hook or parent component → components → child components.
- Components **never** call `useTranslation` themselves. Translation is always received via props.

---

## 10) Helpers Directory (`02_XXX_helpers`)

**Purpose:** Pure helper functions — formatters, transformers, data mappers, small utilities specific to this page.

**Rules:**

- This directory + barrel file must **always** exist, even if empty.
- Helpers are **pure functions** (no hooks, no state, no side effects).
- Export everything from `_XXX_helpers.index.js`.

**Example:**

```js
// 02_Contact_helpers/formatContactData.js
export const formatContactData = (form) => ({
  fullName: form.name.trim(),
  email: form.email.toLowerCase().trim(),
  message: form.message.trim(),
});
```

---

## 11) Validation / Constants / Memo / Tests (`04`–`07`)

These 4 directories follow the same pattern: **always create the directory + barrel file**, add content only when needed.

### `04_XXX_vld/`

- Validation and sanitization functions.
- Example: `validateContactForm.js` — checks required fields, email format, etc.

### `05_XXX_cnst/`

- Constants specific to this page.
- Example: `CONTACT_FORM_FIELDS.js` — field definitions, dropdown options, etc.

### `06_XXX_memo/`

- Custom comparison functions for `React.memo`.
- These are the `areEqual` functions passed as the second argument to `React.memo(Component, areEqual)`.
- Example: `Contact_ContactForm_compare.js`

### `07_XXX_test/`

- Test files for this page's components, hooks, helpers, etc.

### Barrel file pattern (same for all)

```text
_XXX_vld.index.js
_XXX_cnst.index.js
_XXX_memo.index.js
_XXX_test.index.js
```

---

## 12) Debug Config File (`XXX.config.js`)

Every page directory has a `XXX.config.js` file at its root. This file defines **debug flags** that gate `console.log` calls in each layer.

### Canonical flags

```js
// Contact.config.js
export const Contact_UI_debug = false; // toggle console logs in UI components
export const Contact_Hooks_debug = false; // toggle console logs in hooks
export const Contact_VLD_debug = false; // toggle console logs in validation functions
export const Contact_API_debug = false; // toggle console logs in API helper functions
export const Contact_Memo_debug = false; // toggle console logs in memo comparison functions
```

### Usage

Each layer imports its own flag and wraps `console.log` calls with it:

```js
// Inside useContact_handlers.js
import { Contact_Hooks_debug } from "../Contact.config.js";

export const useContact_handlers = (states, setters) => {
  const handleSubmit = () => {
    if (Contact_Hooks_debug) console.log("handleSubmit called", states.form);
    // ... handler logic
  };

  return { handlers: { handleSubmit } };
};
```

### Rule

- **All flags default to `false`** in committed code.
- Developers turn them to `true` locally during debugging, then set back to `false` before committing.

---

## 13) Advanced: Multi-Feature Hook Directories

### When to use

When a single page directory contains **multiple large, independent features**, each with its own complex state/logic, you may create **separate hook directories per feature** instead of using the single `03_XXX_hooks/`.

### Example scenario

The `Contact` page has two independent complex sections: the contact form and a live chat widget. Each has its own states, handlers, and API calls.

### Structure

```text
frontEnd/src/05_pages/Contact/
├── 03_Contact_hooks/              # still exists — for page-level hooks if needed
│   └── _Contact_hooks.index.js
│
├── 03_ContactForm_hooks/          # separate hook dir for the ContactForm feature
│   ├── _ContactForm_hooks.index.js
│   ├── useContactForm_states.js
│   ├── useContactForm_handlers.js
│   ├── useContactForm_apiHelpers.js
│   └── useContactForm.js
│
└── 03_LiveChat_hooks/             # separate hook dir for the LiveChat feature
    ├── _LiveChat_hooks.index.js
    ├── useLiveChat_states.js
    ├── useLiveChat_handlers.js
    ├── useLiveChat_apiHelpers.js
    └── useLiveChat.js
```

### Rules for multi-feature hooks

1. **Directory naming:** `03_<FeatureName>_hooks/` — the `03_` prefix stays, the feature name replaces the page name.
2. **Hook naming:** `use<FeatureName>.js` — matches the feature directory, not the page.
3. **Barrel file:** `_<FeatureName>_hooks.index.js` — same pattern.
4. **Import location:** Feature hooks are imported **directly in the component** that uses them, not in the parent page component.
5. The original `03_XXX_hooks/` directory still exists for any page-level orchestration hooks (or remains empty with just its barrel file).

### When NOT to use

If the page has only one logical feature (even if it has many components), use the standard single `03_XXX_hooks/` directory. The multi-feature split is only for genuinely independent feature scopes within one page.

---

## 14) Naming Reference Table

A quick-reference for all naming conventions in one place.

| Element                        | Convention                     | Example                                  |
| ------------------------------ | ------------------------------ | ---------------------------------------- |
| **Page directory**             | PascalCase                     | `Contact/`                               |
| **Parent component file**      | PascalCase, matches dir name   | `Contact.jsx`                            |
| **Component file**             | `XXX_YYY.jsx` (PascalCase)     | `Contact_ContactForm.jsx`                |
| **Child component file**       | `XXX_YYY_ZZZ.jsx` (PascalCase) | `Contact_ContactForm_SubmitButton.jsx`   |
| **CSS file (parent)**          | lowerCamelCase                 | `contact.css`                            |
| **CSS file (component)**       | `xxx_YYY.css`                  | `contact_ContactForm.css`                |
| **CSS file (child)**           | `xxx_YYY_ZZZ.css`              | `contact_ContactForm_SubmitButton.css`   |
| **Root className (parent)**    | lowerCamelCase                 | `contact`                                |
| **Root className (component)** | `xxx_YYY`                      | `contact_ContactForm`                    |
| **Root className (child)**     | `xxx_YYY_ZZZ`                  | `contact_ContactForm_SubmitButton`       |
| **Internal className**         | `root_AAA`                     | `contact_ContactForm_field`              |
| **Barrel file**                | `_XXX_<bucket>.index.js`       | `_Contact_comps.index.js`                |
| **Main hook**                  | `useXXX.js`                    | `useContact.js`                          |
| **State hook**                 | `useXXX_states.js`             | `useContact_states.js`                   |
| **Handler hook**               | `useXXX_handlers.js`           | `useContact_handlers.js`                 |
| **API helper hook**            | `useXXX_apiHelpers.js`         | `useContact_apiHelpers.js`               |
| **Props object (component)**   | `XXX_YYY_props`                | `Contact_ContactForm_props`              |
| **Props object (child)**       | `XXX_YYY_ZZZ_props`            | `Contact_ContactForm_SubmitButton_props` |
| **Config file**                | `XXX.config.js`                | `Contact.config.js`                      |
| **Debug flag**                 | `XXX_<Layer>_debug`            | `Contact_UI_debug`                       |
| **Variables / functions**      | camelCase                      | `handleSubmit`, `formatContactData`      |
| **Constants / env vars**       | UPPER_SNAKE_CASE               | `CONTACT_FORM_FIELDS`                    |

---

## 15) Full Concrete Example (Contact Page)

Below is a complete, realistic example showing every convention applied to a `Contact` page with two components and one child component.

### 15.1 Directory tree

```text
frontEnd/src/05_pages/Contact/
├── Contact.jsx
├── Contact.config.js
│
├── _styles/
│   ├── contact.css
│   ├── contact_ContactForm.css
│   ├── contact_ContactForm_SubmitButton.css
│   └── contact_InfoSidebar.css
│
├── 01_Contact_comps/
│   ├── _Contact_comps.index.js
│   ├── Contact_ContactForm.jsx
│   ├── Contact_InfoSidebar.jsx
│   └── Contact_childComps/
│       ├── _Contact_childComps.index.js
│       └── Contact_ContactForm_SubmitButton.jsx
│
├── 02_Contact_helpers/
│   └── _Contact_helpers.index.js
│
├── 03_Contact_hooks/
│   ├── _Contact_hooks.index.js
│   ├── useContact_states.js
│   ├── useContact_handlers.js
│   ├── useContact_apiHelpers.js
│   └── useContact.js
│
├── 04_Contact_vld/
│   └── _Contact_vld.index.js
│
├── 05_Contact_cnst/
│   └── _Contact_cnst.index.js
│
├── 06_Contact_memo/
│   └── _Contact_memo.index.js
│
└── 07_Contact_test/
    └── _Contact_test.index.js
```

### 15.2 `Contact.jsx` (parent component)

```jsx
import { useContact } from "./03_Contact_hooks/_Contact_hooks.index.js";
import {
  Contact_ContactForm,
  Contact_InfoSidebar,
} from "./01_Contact_comps/_Contact_comps.index.js";
import "./_styles/contact.css";

const Contact = () => {
  const { t, tCommon, states, handlers, compProps } = useContact();

  return (
    <div className="contact">
      <h1 className="contact_title">{t("title")}</h1>
      <p className="contact_subtitle">{t("subtitle")}</p>

      <div className="contact_grid">
        <Contact_ContactForm {...compProps.Contact_ContactForm_props} />
        <Contact_InfoSidebar {...compProps.Contact_InfoSidebar_props} />
      </div>
    </div>
  );
};

export default Contact;
```

### 15.3 `useContact.js` (main hook)

```js
import { useTranslation } from "react-i18next";
import { useContact_states } from "./useContact_states.js";
import { useContact_handlers } from "./useContact_handlers.js";
import { useContact_apiHelpers } from "./useContact_apiHelpers.js";

export const useContact = () => {
  const { t } = useTranslation("contact");
  const { t: tCommon } = useTranslation("common");
  const { states, setters } = useContact_states();
  const { apiHelpers } = useContact_apiHelpers(states, setters);
  const { handlers } = useContact_handlers(states, setters, apiHelpers);

  // --- child component props ---
  const Contact_ContactForm_SubmitButton_props = {
    states: { sending: states.sending },
    handlers: { handleSubmit: handlers.handleSubmit },
    tCommon,
  };

  // --- component props ---
  const Contact_ContactForm_props = {
    states: {
      form: states.form,
      sending: states.sending,
      submitted: states.submitted,
    },
    handlers: {
      handleFieldUpdate: handlers.handleFieldUpdate,
      handleSubmit: handlers.handleSubmit,
    },
    t,
    tCommon,
    childProps: {
      Contact_ContactForm_SubmitButton_props,
    },
  };

  const Contact_InfoSidebar_props = {
    t,
  };

  return {
    t,
    tCommon,
    states,
    handlers,
    compProps: {
      Contact_ContactForm_props,
      Contact_InfoSidebar_props,
    },
  };
};
```

### 15.4 `Contact_ContactForm.jsx` (component)

```jsx
import "../_styles/contact_ContactForm.css";
import { Contact_ContactForm_SubmitButton } from "./Contact_childComps/_Contact_childComps.index.js";

const Contact_ContactForm = ({ states, handlers, t, tCommon, childProps }) => {
  return (
    <div className="contact_ContactForm">
      <div className="contact_ContactForm_field">
        <label className="contact_ContactForm_label">{t("nameLabel")}</label>
        <input
          className="contact_ContactForm_input"
          type="text"
          value={states.form.name}
          onChange={(e) => handlers.handleFieldUpdate("name", e.target.value)}
          required
        />
      </div>

      <Contact_ContactForm_SubmitButton
        {...childProps.Contact_ContactForm_SubmitButton_props}
      />
    </div>
  );
};

export default Contact_ContactForm;
```

### 15.5 `Contact_ContactForm_SubmitButton.jsx` (child component)

```jsx
import "../../_styles/contact_ContactForm_SubmitButton.css";

const Contact_ContactForm_SubmitButton = ({ states, handlers, tCommon }) => {
  return (
    <div className="contact_ContactForm_SubmitButton">
      <button
        className="contact_ContactForm_SubmitButton_btn"
        type="submit"
        disabled={states.sending}
        onClick={handlers.handleSubmit}>
        {states.sending ? tCommon("sending") : tCommon("send")}
      </button>
    </div>
  );
};

export default Contact_ContactForm_SubmitButton;
```

---

## 16) Development Workflow Summary

1. **Scaffold first:** When creating a new page, create the full directory tree (all 8 sub-directories + barrel files + `XXX.config.js` + `XXX.jsx`) before writing any logic.
2. **Barrel everything:** Every sub-directory has exactly one barrel file. All external imports go through it.
3. **Prefix everything:** Component filenames, CSS filenames, classNames, and props objects all carry the full component lineage (`XXX_YYY_ZZZ`).
4. **Hook split:** Use the 4-file split when the page has state/logic. Skip the 4 files (but keep the empty dir + barrel) for purely presentational pages.
5. **Props flow down:** Build `compProps` in the main hook. Components receive exactly what they need — no more.
6. **Translations from hook:** All `useTranslation` calls happen in the main hook. Components receive `t`, `tCommon`, etc. via props.
7. **Debug via config:** Use `XXX.config.js` flags to toggle console logs per layer. Default all flags to `false`.
8. **Multi-feature split:** For complex pages with independent features, create separate `03_<Feature>_hooks/` directories. Keep the standard `03_XXX_hooks/` for page-level coordination.
