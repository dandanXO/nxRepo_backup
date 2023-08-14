import { ICountry } from '../../country/types/ICountry';

export type IEnvironment = ICountry & {
  // NOTE:
  production: boolean;
};
