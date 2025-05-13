import ArrowChildComponent from "./ArrowChildComponent";
import ChildComponent from "./ChildComponent";

function ParentComponent() {
  return (
    <div>
      <h1>Hello from Parent Component</h1>
      <ChildComponent text={"Hello from Child 1"} />
      <ChildComponent text={"Hello from Child 2"} />
      <ChildComponent text={"Hello from Child 3"} />
      <ChildComponent text={"Hello from Child 4"} />
      <ChildComponent text={"Hello from Child 5"} />

      <ArrowChildComponent eldina={"Test Eldina"} />
    </div>
  );
}

export default ParentComponent;
