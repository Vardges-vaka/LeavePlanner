import { forwardRef, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import ButtonGeneric from "../00_buttons/ButtonGeneric.jsx";
import "./_styles/modalGeneric.css";

// Helper: Extracts data-* attributes from props object
const extractDataAttrs = (allProps) => {
  const attrs = {};
  for (const key in allProps) {
    if (key.startsWith("data_")) {
      attrs[key.replace("data_", "data-")] = allProps[key];
    }
  }
  return attrs;
};

/**
 * ModalGeneric - A reusable, accessible modal dialog
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {string} [props.title] - Header title
 * @param {React.ReactNode} [props.content] - Body content (can also use children)
 * @param {React.ReactNode} [props.children] - Body content (alternative to content prop)
 * @param {Function} [props.onCancel] - Handler for Cancel and Close button clicks
 * @param {Function} [props.onConfirm] - Handler for Confirm button click
 * @param {string} [props.size="m"] - Size of the modal: "s", "m", "l", "xl", "full"
 * @param {string} [props.cancelText="Cancel"] - Text for the cancel button
 * @param {string} [props.confirmText="Confirm"] - Text for the confirm button
 * @param {boolean} [props.hideFooter=false] - If true, hides the default action footer
 * @param {boolean} [props.closeOnOverlayClick=true] - If true, clicking outside the modal triggers onCancel
 * @param {string} [props.className] - Additional classes for the modal container
 * @param {boolean} [props.loading=false] - Sets the confirm button into a loading state
 * @param {boolean} [props.confirmDisabled=false] - Disables the confirm button
 */
const ModalGeneric = forwardRef(function ModalGeneric(props, ref) {
  const {
    isOpen = false,
    title,
    content,
    children,
    onCancel,
    onConfirm,
    size = "m",
    cancelText = "Cancel",
    confirmText = "Confirm",
    hideFooter = false,
    closeOnOverlayClick = true,
    className = "",
    loading = false,
    confirmDisabled = false,
    ...restProps
  } = props;

  const dataAttrs = useMemo(() => extractDataAttrs(restProps), [restProps]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && onCancel) {
        onCancel();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Lock body scroll
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Restore body scroll when closed
      document.body.style.overflow = "";
    };
  }, [isOpen, onCancel]);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget && closeOnOverlayClick && onCancel) {
        onCancel();
      }
    },
    [closeOnOverlayClick, onCancel]
  );

  const containerClasses = useMemo(() => {
    const classes = ["modalGeneric_container", `modalGeneric-${size}`];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [size, className]);

  // Render nothing to DOM if not open AND not animating.
  // Actually, we keep it in DOM but hidden via CSS for smooth transitions.
  // Or conditionally render it? If conditionally rendered, animations drop immediately.
  // We use CSS visibility/opacity so keeping it in DOM is fine, but to prevent
  // interaction issues, pointer-events are managed natively or we conditionally render.
  // A standard approach is pointer-events. 

  return (
    <div
      className={`modalGeneric_overlay ${isOpen ? "modalGeneric_overlay-open" : ""}`}
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      <div
        ref={ref}
        className={containerClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        {...dataAttrs}
      >
        {/* Header */}
        <div className="modalGeneric_header">
          {title && (
            <h2 id="modal-title" className="modalGeneric_title">
              {title}
            </h2>
          )}
          {onCancel && (
            <button
              type="button"
              className="modalGeneric_closeBtn"
              onClick={onCancel}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="modalGeneric_body">
          {content}
          {children}
        </div>

        {/* Footer */}
        {!hideFooter && (
          <div className="modalGeneric_footer">
            {onCancel && (
              <ButtonGeneric
                version="secondary"
                text={cancelText}
                onClick={onCancel}
                disabled={loading}
              />
            )}
            {onConfirm && (
              <ButtonGeneric
                version="primary"
                text={confirmText}
                onClick={onConfirm}
                loading={loading}
                disabled={confirmDisabled}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
});

ModalGeneric.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  content: PropTypes.node,
  children: PropTypes.node,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  size: PropTypes.oneOf(["s", "m", "l", "xl", "full"]),
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  hideFooter: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  className: PropTypes.string,
  loading: PropTypes.bool,
  confirmDisabled: PropTypes.bool,
};

ModalGeneric.displayName = "ModalGeneric";

export default ModalGeneric;
