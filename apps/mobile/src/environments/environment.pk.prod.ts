import {IEnvironment} from "./types/IEnvironment";
import {PakistanCountry} from "./config/countries/PakistanCountry";

export const environment: IEnvironment = {
  production: true,
  ...PakistanCountry,
};
