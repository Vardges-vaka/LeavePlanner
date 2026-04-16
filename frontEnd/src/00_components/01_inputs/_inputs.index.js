/**
 * Input Components - Barrel Export
 *
 * This file exports all input components for easy importing throughout the application.
 *
 * @module inputs
 *
 * @example
 * // Import specific components
 * import { Input_text, Input_email, Checkbox } from './00_components/01_inputs/_inputs.index.js';
 *
 * @example
 * // Import all components
 * import * as Inputs from './00_components/01_inputs/_inputs.index.js';
 *
 * @example
 * // Use in component
 * function MyForm() {
 *   return (
 *     <>
 *       <Input_text label={{ text: "Name" }} />
 *       <Input_email label={{ text: "Email" }} />
 *       <Checkbox label="Subscribe" />
 *     </>
 *   );
 * }
 */

// Base component - used by all text-based inputs
export { default as InputGeneric } from "./InputGeneric.jsx";

// Text-based input components
export { default as Input_text } from "./Input_text.jsx";
export { default as Input_psw } from "./Input_psw.jsx";
export { default as Input_email } from "./Input_email.jsx";
export { default as Input_number } from "./Input_number.jsx";
export { default as Input_date } from "./Input_date.jsx";
export { default as Input_url } from "./Input_url.jsx";
export { default as Input_tel } from "./Input_tel.jsx";

// Specialized input components
export { default as Input_search } from "./Input_search.jsx";
export { default as Input_range } from "./Input_range.jsx";
export { default as Input_file } from "./Input_file.jsx";
export { default as Checkbox } from "./Checkbox.jsx";
