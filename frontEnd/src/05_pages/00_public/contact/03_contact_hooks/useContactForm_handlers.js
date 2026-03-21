import { useCallback } from "react";

export const useContactForm_handlers = ({ states, setters }) => {
  const handlesUpdate = (field, value) =>
    setters.setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setters.setSending(true);
    // Placeholder — no backend endpoint yet
    await new Promise((r) => setTimeout(r, 800));
    setters.setSending(false);
    setters.setSubmitted(true);
  }, []);
  return {
    handlers: { handlesUpdate, handleSubmit },
  };
};
