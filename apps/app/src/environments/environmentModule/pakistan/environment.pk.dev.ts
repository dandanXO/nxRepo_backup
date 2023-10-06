import {IEnvironment, PakistanCountry} from '@frontend/shared/domain';

export const environment: IEnvironment = {
  production: false,
  ...PakistanCountry,
};
