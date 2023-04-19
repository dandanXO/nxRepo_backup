import {IEnvironment} from "../app/modules/IEnvironment";
import {IndiaCountry} from "../../../../libs/shared/domain/src/country/constants/IndiaCountry";

export const environment: IEnvironment = {
  production: true,
  ...IndiaCountry,
};
