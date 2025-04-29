let arr = ["John", "Smith"];

const [firstName, lastName] = arr;

console.log(`${firstName} ${lastName}`);

// const firstName = arr[0]
// const lastName = arr[1]

const [ime, prezime] = "John Smith".split(" ");
console.log(`${ime} ${prezime}`);
const [jedan, , tri] = ["Jedan", "Dva", "Tri", "Cetiri", "Pet", "Šest"];
console.log(jedan, tri);
const [a, b, c] = "abc";

// ... rest
const [jedan1, dva1, ...rest] = [
  "Jedan",
  "Dva",
  "Tri",
  "Cetiri",
  "Pet",
  "Šest",
];
console.log(rest.length);

//  objekti

// const {var1, var2} = {var1: ..., var2: ...}
let options = {
  title: "Test",
  width: 100,
  height: 200,
};

let { title, width, height } = options;
console.log(title, width, height);

let { title1, ...rest1 } = options;
console.log(rest1.height);

// ffunkcije
function sum1(a, b) {
  return a + b;
}

function sum2(...args) {
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

console.log(sum2(1, 2, 3, 4, 5));

// spread operator ...

let arr2 = [3, 5, 140];
console.log(Math.max(...arr2));

let arr3 = [1, 2, 30];
console.log(Math.max(...arr2, ...arr3));

console.log(Math.max(1, ...arr2, 2, ...arr3, 340));

let merged = [0, ...arr2, 1, 2, ...arr3];
console.log(merged);
