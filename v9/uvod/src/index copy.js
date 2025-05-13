// ReactDOM.render(STA, GDJE)

// ReactDOM.render(<div><h1>Hello World</h1> <p>Test</p></div>, document.getElementById("root"));

// Cisti JS
// const rootElement = document.getElementById("root");
// const div = document.createElement("div");

// const h1 = document.createElement("h1");
// h1.textContent = "Hello World";

// const p = document.createElement("p");
// p.textContent = "Test";

// div.appendChild(h1);
// div.appendChild(p);

// rootElement.appendChild(div);

// REACT
import React from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// const element = React.createElement('div', {children: 'Hello world', className: 'container'});

// const element = React.createElement('div', {
//   // children: 'Hello world',
//   className: 'container'
// }, 'Hello World', 'Goodbye Hello World');

// const element = React.createElement("div", {
//   children: ["Hello world", ", Bye"],
//   className: "container",
// });

// const element = React.createElement("div", {
//   children: React.createElement("span", null, "Hello", "World"),
//   className: "container",
// });

let tekstZaNaslov = "Pozdrav";
let cssKlasa = "container-fluid";

const element = (
  <div className={cssKlasa}>
    <h1>{tekstZaNaslov}</h1>
    <p>Neki tekst {tekstZaNaslov}</p>
  </div>
);

root.render(element);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
