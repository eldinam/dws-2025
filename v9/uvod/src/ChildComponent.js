function ChildComponent(props) {
  return (
    <div>
      <h3>Hello from Child Component</h3>
      <p>{props.text}</p>
      <hr></hr>
    </div>
  );
}

export default ChildComponent;
