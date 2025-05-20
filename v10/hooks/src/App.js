import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [brojac, setBrojac] = useState(0);
  const [brojac2, setBrojac2] = useState(100);

  useEffect(() => {
    console.log(`EFFECT: ${brojac}`);
    document.title = `EFFECT: ${brojac}`;
  }, [brojac, brojac2]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Brojac: {brojac} || Brojac2: {brojac2}
        </h2>
        <button onClick={povecajBrojac}>Promijeni</button>
      </header>
    </div>
  );

  function povecajBrojac() {
    if (brojac2 % 5 === 0) {
      setBrojac(brojac + 2);
    }

    setBrojac2(brojac2 - 1);
  }
}

export default App;
