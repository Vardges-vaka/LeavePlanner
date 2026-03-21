import { useState } from "react";

export const useContactForm_states = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  return {
    states: {
      form,
      submitted,
      sending,
    },
    setters: {
      setForm,
      setSubmitted,
      setSending,
    },
  };
};
