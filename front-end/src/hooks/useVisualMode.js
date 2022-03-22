import { useState } from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {
    // if (replace){
    //   setHistory((prev) =>  [...prev.slice(0, prev.length-1)] );
    // } 
    setMode(newMode);
    //setHistory((prev) =>  [...prev, newMode] );
  }

  return { mode, transition }
}