function ChildComponent(props) {
  let tekstChild = `Child tekst + ${props.text}`;

  return (
    <div>
      <hr></hr>
      <p>{props.text}</p>
      {/* Na klik dugmića treba da se pozove funkcija "klik" iz Parent komponente */}
      <button onClick={() => props.klik(tekstChild)}>Click</button>
      <hr></hr>
    </div>
  );
}

export default ChildComponent;
