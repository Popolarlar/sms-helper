import React, { useState } from "react";
import "./App.css";
import CustomSelector from "./CustomSelector";

const formatResultToString = (result) =>
  result.map((input) => input.label).join("");

function App() {
  const [result, setResult] = useState([]);

  const handleClear = () => {
    setResult([]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formatResultToString(result));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SMS輸入小幫手</h1>
      </header>
      <section className="App-section">
        <div className="App-sub">
          <h3>輸入:</h3>
          <p>R/檢測結果、S/建議</p>
          <CustomSelector result={result} setResult={setResult} />
        </div>
        <div className="App-sub">
          <h3>結果:</h3>
          <div className="App-result">
            <div>{formatResultToString(result)}</div>
            <button className="App-warnBtn" onClick={handleClear}>
              清除
            </button>
            <button onClick={handleCopy}>複製</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
