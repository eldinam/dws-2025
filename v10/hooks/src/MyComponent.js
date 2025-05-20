import { useEffect } from "react";

function MyComponent() {
  const message = `Hello Eldina`;
  // document.title = message;

  useEffect(() => {
    document.title = "Web";
  }, []);

  return <div>{message}</div>;
}

export default MyComponent;
