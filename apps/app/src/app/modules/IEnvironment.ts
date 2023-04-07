import {ICountry} from "../domain/country/ICountry";

export type IEnvironment = ICountry & {
  // NOTE:
  production: boolean;
}

