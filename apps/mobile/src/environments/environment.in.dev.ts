import {IEnvironment} from "./types/IEnvironment";
import {IndiaCountry} from "./countries/IndiaCountry";

export const environment: IEnvironment = {
  production: false,
  country: IndiaCountry.country,
  countryName: IndiaCountry.countryName,
  currency: IndiaCountry.currency,
};
