"use strict";

console.log("Komentar");

// komentar jedna linija

/*
Komentar
u
vise
redova
*/

let message = "Hello World!"; // lokalna varijabla
var message1 = "Pozdrav"; // globalna varijabla
const message2 = "Konstanta"; // konstantna varijabla

let user = "John",
  age = 25,
  message3 = "Test";

console.log(message);

const broj = 15;

console.log(broj);

let str1 = "Hello";
let str2 = "World";
let str3 = `Str3 ${str1} ${str2}`;

console.log(str3);

console.log(`Rezultat 1+2=${1 + 2}`);

// Boolean varijable
let isLoggedIn = true;
let hasPermission = false;

if (isLoggedIn) {
  console.log("Korisnik je prijavljen");
}

if (!hasPermission) {
  console.log("Korisnik nema dozvolu");
}

let value = "";

if (!value) {
  console.log("Prazna vrijednost se tretira kao false");
}

let x;

console.log(x);

function noReturn() {
  // funkcija koja ništa ne vraća
}

let rezultat = noReturn();
console.log(rezultat);

let student = {
  name: "Eldina",
};

console.log(student.age);

let nesto;

if (nesto === undefined) {
  console.log("Vrijednost nije definisana");
}

let y = null;

let a = undefined;
let b = null;

console.log(a == b); // true - jednostavna provjera
console.log(a === b); // false - stroga provjera
