import React from "react";
import LibroForm from "./components/LibroForm";
import LibroList from "./components/LibroList";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📖 BiblioSoftware</h1>
      <LibroForm />
      <hr />
      <LibroList />
    </div>
  );
}

export default App;
