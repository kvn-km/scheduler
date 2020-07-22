import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(mode, replace = false) {
    if (replace) {
      setMode(mode);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  }

  function back() {
    if (history.length === 1) {
      setMode(initialMode);
    } else {
      setMode(history[history.length - 2]);
      history.pop();
      setHistory(history);
    }
  }

  return { mode, transition, back };
}
