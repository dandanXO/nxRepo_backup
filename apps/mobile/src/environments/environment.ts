// NOTE: [nx-environment] https://stackoverflow.com/questions/68926271/nx-react-inject-environment-variables-at-runtime
// NOTE: [Environment Variables](https://nx.dev/reference/environment-variables)
// NOTE: [Define Environment Variables](https://nx.dev/recipes/environment-variables/define-environment-variables)
// console.log("process.env.NX_TEST_GENERAL", process.env.NX_VERBOSE_LOGGING)
// console.log("process.env.NX_TEST_SINGLE", process.env.NX_SERVE)

import { IEnvironment } from "./types/IEnvironment";
import { BangladeshCountry } from "./config/countries/BangladeshCountry";

export const environment: IEnvironment = {
    production: false,
    ...BangladeshCountry,
};
