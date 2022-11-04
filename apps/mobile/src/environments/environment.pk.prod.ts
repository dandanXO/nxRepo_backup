import {IEnvironment} from "./types/IEnvironment";
import {PakistanCountry} from "./countries/PakistanCountry";

export const environment: IEnvironment = {
  production: true,
  country: PakistanCountry.country,
  countryName: PakistanCountry.countryName,
  currency: PakistanCountry.currency,
};
