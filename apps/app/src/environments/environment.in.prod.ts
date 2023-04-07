import {IEnvironment} from "../app/modules/IEnvironment";
import {IndiaCountry} from "../app/domain/country/constants/IndiaCountry";

export const environment: IEnvironment = {
  production: true,
  ...IndiaCountry,
};
