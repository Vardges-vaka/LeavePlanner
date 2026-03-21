import { useState } from "react";

export const usexXX_states = () => {
  const [xXX, setxXX] = useState(null);
  const [yYY, setyYY] = useState(null);
  return { states: { xXX, yYY }, setters: { setxXX, setyYY } };
};
