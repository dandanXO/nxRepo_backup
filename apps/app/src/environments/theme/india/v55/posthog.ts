import { PostHogConfig } from 'posthog-js';

import { commonPosthogConfig } from '../../../devPosthogConfig';

export type PosthogConfig = {
  token: string;
  config: Partial<PostHogConfig>;
};

export const v55PosthogConfig: PosthogConfig = {
  token: 'phc_XgUV9Wyjjny3nt7JVjEVlD3c4r4LJBkzb0w3Jb3I8Ov',
  config: {
    ...commonPosthogConfig,
    api_host: 'https://13.234.216.21:6600',
  },
};

const person = {
  name: "andy",
  age: 11,
}
const {name, age} = person
console.log("name", name);

function *test() {
  yield 1;
  yield 2;
}
console.log("test", test());
console.log("test", test());
console.log("test", test());

console.log("??", person ?? "yes" );
