import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    console.log(counter);
  }, [counter]);

  const buttonRef = useRef();

  const setCount = () => {
    setCounter(counter + 1);
    console.log(counter);
    buttonRef.current.style.width = counter * 40 + "px";
    buttonRef.current.style.height = counter * 30 + "px";
    console.log(buttonRef?.current.style.width);
  };

  return (
    <div className="App">
      <header className="App-header">
        {counter}
        <button
          onClick={() => setCount()}
          style={{ width: "50px" }}
          ref={buttonRef}
        >
          Add
        </button>
      </header>
    </div>
  );
};

export default App;
