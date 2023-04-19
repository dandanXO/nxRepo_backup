import {IEnvironment} from "../app/modules/IEnvironment";
import {PakistanCountry} from "../../../../libs/shared/domain/src/country/constants/PakistanCountry";

export const environment: IEnvironment = {
  production: false,
  ...PakistanCountry,
};
