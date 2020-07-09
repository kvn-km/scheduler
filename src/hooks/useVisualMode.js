import { useState } from "react";

export default function useVisualMode(init) {

  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  function transition(init, replace = false) {
    if (replace) {
      history.pop();
      setMode(init);
      history.push(init);
    } else {
      setMode(init);
      history.push(init);
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back };
}