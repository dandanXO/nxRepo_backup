import {IEnvironment} from "../app/modules/IEnvironment";
import {BangladeshCountry} from "../app/modules/country/constants/BangladeshCountry";

export const environment: IEnvironment = {
  production: true,
  ...BangladeshCountry,
}
