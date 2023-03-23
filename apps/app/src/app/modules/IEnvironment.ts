import {ICountry} from "./country/ICountry";

export type IEnvironment = ICountry & {
  // NOTE:
  production: boolean;
}

