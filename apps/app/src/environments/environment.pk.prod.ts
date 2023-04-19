import {IEnvironment} from "../app/modules/IEnvironment";
import {PakistanCountry} from "../../../../libs/shared/domain/src/country/PakistanCountry";

export const environment: IEnvironment = {
  production: true,
  ...PakistanCountry,
};
