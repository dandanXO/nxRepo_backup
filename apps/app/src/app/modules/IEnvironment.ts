import {ICountry} from "../../../../../libs/shared/domain/src/country/types/ICountry";

export type IEnvironment = ICountry & {
  // NOTE:
  production: boolean;
}

