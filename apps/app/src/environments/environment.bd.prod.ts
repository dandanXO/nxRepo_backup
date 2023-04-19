import {IEnvironment} from "../app/modules/IEnvironment";
import {BangladeshCountry} from "../../../../libs/shared/domain/src/country/constants/BangladeshCountry";

export const environment: IEnvironment = {
  production: true,
  ...BangladeshCountry,
}
