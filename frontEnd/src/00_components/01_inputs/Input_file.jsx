import { forwardRef, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { icons } from "lucide-react";
import "./_styles/input_file.css";

/* ═══════════════════════════════════════════════════════════════
 *  Input_file  —  File upload component
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE
 *    A file upload component with two modes: click-to-upload button
 *    and drag-and-drop zone. Automatically simulates upload progress.
 *
 *  FEATURES
 *    - Two modes: "button" (click to upload) and "dropzone" (drag & drop)
 *    - Automatic progress simulation
 *    - File name and size display
 *    - Multiple file support
 *    - All file types accepted by default
 *    - Size validation
 *    - Validation states (error, success, warning)
 *    - Disabled state
 *
 *  PROPS
 *    mode: ("button"|"dropzone") Upload mode (default: "button")
 *    label: (string) Label text
 *    onChange: (func) Called when files complete upload with file array
 *    accept: (string) Accepted file types (default: all files)
 *    multiple: (bool) Allow multiple files
 *    maxSize: (number) Max file size in bytes
 *    size: ("xs"|"s"|"m"|"l"|"xl") Component size
 *    validation: ("error"|"success"|"warning") Validation state
 *    disabled: (bool) Disabled state
 * ═══════════════════════════════════════════════════════════════ */

/**
 * Input_file - File upload component with automatic progress simulation.
 *
 * A comprehensive file upload component supporting both button-click and drag-and-drop modes.
 * Automatically simulates upload progress from 0% to 100% for each file. Displays file names,
 * sizes, and progress bars. Supports multiple files, file type restrictions, and size validation.
 *
 * The component manages files internally and calls onChange when each file reaches 100% completion.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.mode="button"] - Upload mode: "button" (click to upload) or "dropzone" (drag & drop)
 * @param {string} [props.label] - Label text displayed above the upload area
 * @param {Function} [props.onChange] - Callback when files complete upload, receives array of completed files
 * @param {string} [props.accept] - Accepted file types (e.g., "image/*", ".pdf,.doc,.docx")
 * @param {boolean} [props.multiple=false] - Allow multiple file selection
 * @param {number} [props.maxSize] - Maximum file size in bytes (files exceeding this are rejected)
 * @param {string} [props.size="m"] - Component size: "xs", "s", "m", "l", "xl"
 * @param {string} [props.validation] - Validation state: "error", "success", "warning"
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Input ID
 * @param {string} [props.name] - Input name attribute
 * @param {React.Ref} ref - Forwarded ref (note: ref is not used internally, input uses internal ref)
 *
 * @returns {JSX.Element} Rendered file upload component
 *
 * @example
 * // Button mode - single file
 * <Input_file
 *   label="Upload Document"
 *   mode="button"
 *   onChange={(files) => console.log("Uploaded:", files)}
 * />
 *
 * @example
 * // Dropzone mode - multiple images with size limit
 * <Input_file
 *   label="Upload Photos"
 *   mode="dropzone"
 *   accept="image/*"
 *   multiple
 *   maxSize={5 * 1024 * 1024}
 *   onChange={(files) => console.log("Images:", files)}
 * />
 *
 * @example
 * // Resume upload with file type restrictions
 * <Input_file
 *   label="Upload Resume"
 *   mode="dropzone"
 *   accept=".pdf,.doc,.docx"
 *   maxSize={10 * 1024 * 1024}
 *   onChange={(files) => handleResumeUpload(files)}
 * />
 */
const Input_file = forwardRef(function Input_file(props, ref) {
  const {
    mode = "button",
    label,
    onChange,
    accept,
    multiple = false,
    maxSize,
    size = "m",
    validation,
    disabled = false,
    className = "",
    id,
    name,
    ...restProps
  } = props;

  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const UploadIcon = icons.Upload;
  const FileIcon = icons.File;
  const XIcon = icons.X;

  /**
   * Effect: Simulates upload progress for all files.
   *
   * For each file with progress < 100%, creates an interval that increments
   * progress by 10% every 300ms. When a file reaches 100%, calls onChange
   * callback with all completed files.
   *
   * Cleanup: Clears all intervals when component unmounts or files change.
   */
  useEffect(() => {
    const intervals = [];

    files.forEach((file, index) => {
      if (file.progress < 100) {
        const interval = setInterval(() => {
          setFiles((prev) => {
            const updated = [...prev];
            if (updated[index].progress < 100) {
              updated[index] = {
                ...updated[index],
                progress: Math.min(updated[index].progress + 10, 100),
              };

              // Call onChange when file reaches 100%
              if (updated[index].progress === 100 && onChange) {
                setTimeout(
                  () => onChange(updated.filter((f) => f.progress === 100)),
                  0,
                );
              }
            }
            return updated;
          });
        }, 300);

        intervals.push(interval);
      }
    });

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [files, onChange]);

  /**
   * Handles file selection from input or drag-and-drop.
   * Validates file sizes against maxSize prop and filters out invalid files.
   * Creates file objects with name, size, and initial progress of 0%.
   *
   * @param {FileList} selectedFiles - Files selected by user
   */
  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);

    // Validate file sizes if maxSize is provided
    const validFiles = maxSize
      ? fileArray.filter((file) => {
          if (file.size > maxSize) {
            console.warn(
              `File ${file.name} exceeds max size of ${maxSize} bytes`,
            );
            return false;
          }
          return true;
        })
      : fileArray;

    if (validFiles.length > 0) {
      const newFiles = validFiles.map((file) => ({
        name: file.name,
        size: file.size,
        progress: 0,
      }));

      setFiles((prev) => (multiple ? [...prev, ...newFiles] : newFiles));
    }
  };

  /**
   * Handles file input change event.
   * Triggered when user selects files via the file input dialog.
   */
  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  /**
   * Handles file drop event in dropzone mode.
   * Prevents default browser behavior and processes dropped files.
   */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  /**
   * Handles drag over event to enable drop functionality.
   * Prevents default to allow dropping files.
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Triggers the hidden file input click event.
   * Used by both button and dropzone modes.
   */
  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  /**
   * Removes a file from the file list by index.
   *
   * @param {number} index - Index of file to remove
   */
  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const wrapperClasses = [
    "inputFile_wrapper",
    `inputFile-${size}`,
    `inputFile-${mode}`,
    disabled && "inputFile-wrapper-disabled",
    validation && `inputFile-wrapper-${validation}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      {/* Label */}
      {label && (
        <label htmlFor={id} className="inputFile_label">
          {label}
        </label>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        className="inputFile_input"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        disabled={disabled}
        id={id}
        name={name}
        {...restProps}
      />

      {/* Button Mode */}
      {mode === "button" && (
        <button
          type="button"
          className="inputFile_button"
          onClick={handleButtonClick}
          disabled={disabled}>
          <UploadIcon className="inputFile_buttonIcon" />
          <span>Choose File{multiple ? "s" : ""}</span>
        </button>
      )}

      {/* Dropzone Mode */}
      {mode === "dropzone" && (
        <div
          className="inputFile_dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleButtonClick}>
          <UploadIcon className="inputFile_dropzoneIcon" />
          <p className="inputFile_dropzoneText">
            Drag & drop file{multiple ? "s" : ""} here or click to browse
          </p>
          {accept && (
            <p className="inputFile_dropzoneHint">Accepted: {accept}</p>
          )}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="inputFile_fileList">
          {files.map((file, index) => (
            <div key={index} className="inputFile_fileItem">
              <div className="inputFile_fileInfo">
                <FileIcon className="inputFile_fileIcon" />
                <div className="inputFile_fileDetails">
                  <span className="inputFile_fileName">{file.name}</span>
                  {file.size && (
                    <span className="inputFile_fileSize">
                      {(file.size / 1024).toFixed(2)} KB
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              {file.progress < 100 && (
                <div className="inputFile_progressBar">
                  <div
                    className="inputFile_progressFill"
                    style={{ width: `${file.progress}%` }}
                  />
                  <span className="inputFile_progressText">
                    {file.progress}%
                  </span>
                </div>
              )}

              {/* Remove button */}
              {!disabled && (
                <button
                  type="button"
                  className="inputFile_removeButton"
                  onClick={() => handleRemoveFile(index)}
                  title="Remove file">
                  <XIcon className="inputFile_removeIcon" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

Input_file.propTypes = {
  mode: PropTypes.oneOf(["button", "dropzone"]),
  label: PropTypes.string,
  onChange: PropTypes.func,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl"]),
  validation: PropTypes.oneOf(["error", "success", "warning"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

Input_file.displayName = "Input_file";

export default Input_file;
