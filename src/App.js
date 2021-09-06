import React from "react";
import "./App.css";
import CustomDataGrid from "./components/CustomDataGrid";
import CustomSelector from "./components/CustomInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>享悅診所 - 簡訊輸入小幫手</h1>
      </header>
      <section className="App-section">
        <div className="App-sub">
          <CustomSelector />
        </div>
        <div className="App-sub">
          <CustomDataGrid />
        </div>
      </section>
    </div>
  );
}

export default App;
