import ChildComponent from "./ChildComponent";

function ParentComponent() {
  function prikaziAlert(text) {
    alert(text);
  }

  return (
    <div>
      <h1>Hello from Parent Component</h1>
      <ChildComponent
        klik={prikaziAlert}
        text={"Neki tekst iz parent komponente"}
      />
    </div>
  );
}

export default ParentComponent;
