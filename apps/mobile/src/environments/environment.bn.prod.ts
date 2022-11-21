import {IEnvironment} from "./types/IEnvironment";
import {BengalCountry} from "./config/countries/BengalCountry";

export const environment: IEnvironment = {
  production: true,
  ...BengalCountry,
}
