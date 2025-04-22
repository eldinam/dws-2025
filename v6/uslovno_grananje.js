// if - else

function checkTemp(temp) {
  if (temp > 30) {
    console.log("Prevruće je");
  } else if (temp < 10) {
    console.log("Prehladno je");
  } else {
    console.log("Temperatura je ok");
  }
}

checkTemp(20);

let accessAlowed;
let age = 101;

if (age > 18) {
  accessAlowed = true;
} else {
  accessAlowed = false;
}

console.log(accessAlowed);

// ? operator

//  sintaksa
// let rezultat = uslov ? vrijednost1 : vrijednost2

let dozvoljenPristup = age > 18 ? true : false;

console.log(dozvoljenPristup);

let message =
  age < 3 ? "Hello baby" : age < 18 ? "Hello" : age < 100 ? "Hi" : "Woow";

console.log(message);
