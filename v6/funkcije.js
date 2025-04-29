function teest(xx, yy) {
  console.log(xx, yy);
}

// arrow function

// let func = (arg1, arg2, ..., argN) => expression

// više argumenata
const suma = (a, b) => a + b; // funkcija
console.log(suma(2, 3));

// jedan argument
const duplaVrijednost = (n) => n * 2; // funkcija
console.log(duplaVrijednost(4));

// funkcija bez argumenata
const pozdrav = () => console.log("Pozdrav");
pozdrav();

// razni primjeri
const sum = (a, b) => {
  // tijelo funkcije - može imati redova koliko hoćete
  const result = a + b;
  return result;
};
console.log(sum(5, 5));
