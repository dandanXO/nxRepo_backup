import {IEnvironment} from "../app/modules/IEnvironment";
import {PakistanCountry} from "../app/modules/country/constants/PakistanCountry";

export const environment: IEnvironment = {
  production: true,
  ...PakistanCountry,
};
