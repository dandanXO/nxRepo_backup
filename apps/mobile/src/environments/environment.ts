// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

// NOTE: [nx-environment] https://stackoverflow.com/questions/68926271/nx-react-inject-environment-variables-at-runtime
export const environment = {
  production: false,
  country: "in",
  countryName: "india",
};

// NOTE: [Environment Variables](https://nx.dev/reference/environment-variables)
// NOTE: [Define Environment Variables](https://nx.dev/recipes/environment-variables/define-environment-variables)
// console.log("process.env.NX_TEST_GENERAL", process.env.NX_VERBOSE_LOGGING)
// console.log("process.env.NX_TEST_SINGLE", process.env.NX_SERVE)
