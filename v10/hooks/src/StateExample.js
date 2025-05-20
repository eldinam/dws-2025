import { useState } from "react";

function StateExample() {
  const [brojac, setBrojac] = useState(10);
  const [godine, setGodine] = useState(15);
  const [cvijece, setCvijece] = useState("Orhideja");

  // let brojac = 10;

  function povecajBrojac() {
    console.log("povecajBrojac");
    // brojac++;
    setBrojac(brojac + 1);
  }

  return (
    <div className="center">
      <p>Brojac: {brojac}</p>
      <p>Cvijece: {cvijece}</p>
      <button onClick={povecajBrojac}>Klikni + 1</button>
      <button onClick={() => setBrojac(brojac + 5)}>Klikni + 5</button>
    </div>
  );
}

export default StateExample;
