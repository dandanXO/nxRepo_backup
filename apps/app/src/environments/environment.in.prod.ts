import {IEnvironment} from "../app/modules/IEnvironment";
import {IndiaCountry} from "../../../../libs/shared/domain/src/country/IndiaCountry";

export const environment: IEnvironment = {
  production: true,
  ...IndiaCountry,
};
