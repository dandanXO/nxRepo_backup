const person = {
  name: "andy",
  age: 11
}

function *test() {
  yield "hi"
  yield "hello"
}


console.log(test())
console.log(test())
console.log(test())
