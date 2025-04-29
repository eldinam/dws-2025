const user = new Object();
const user1 = {};

const user2 = {
  name: "John",
  age: 30,
  password: "12345",
  email: "john@gmail.com",

  sayHi() {
    console.log(this.name);
  },
};

console.log(user2.name, user2.age);

console.log("age" in user2);
console.log("blabla" in user2);

// for (key in object) {
//   // tijelo for petlje
// }

for (key in user2) {
  console.log(key);
  console.log(user2[key]);
}

console.log("----------------------");

user2.sayHi();
