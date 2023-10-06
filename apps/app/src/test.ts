import * as Sentry from '@sentry/react';

const a = new Sentry.Replay();

console.log("a", a);


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

console.log("??2", person ?? "yes2" );
