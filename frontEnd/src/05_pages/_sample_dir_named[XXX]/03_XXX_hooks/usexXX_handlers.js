import { useCallback } from "react";

export const usexXX_handlers = ({ states, setters, t }) => {
  const handlexXX = useCallback(() => {
    setters.setxXX(states.xXX + 1);
  }, [states.xXX, setters]);
  return { handlers: { handlexXX } };
};
