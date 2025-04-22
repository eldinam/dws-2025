// ?? operator

// // sintaksa
// c = a ?? b

// ako je a definisano - onda će u c biti vrijednost od a
// ako a nije definisano - onda će u c biti vrijednost od b

let user; // user je undefined
console.log(user ?? "Anonymous"); // Anonymous

let user1 = "John"; // user je undefined
console.log(user1 ?? "Anonymous"); // John

let firstName = null;
let lastName = null;
let nickName = "Programer";

console.log(firstName ?? lastName ?? nickName ?? "Anonymous"); // Programer

// || logički OR operator (falsy - false, 0, "", null, undefined, NaN)

let name = "" || "Gost";
console.log(name);

let name1 = "" ?? "Gost";
console.log(name1);
