import {ICountry} from "../../../../../libs/shared/domain/src/country/ICountry";

export type IEnvironment = ICountry & {
  // NOTE:
  production: boolean;
}

