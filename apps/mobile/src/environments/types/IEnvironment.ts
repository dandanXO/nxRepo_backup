import {ICountry} from "./ICountry";

export type IEnvironment = ICountry & {
  // NOTE:
  production: boolean;
}

