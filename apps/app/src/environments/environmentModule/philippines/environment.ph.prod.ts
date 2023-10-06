import {IEnvironment, PhilippinesCountry} from '@frontend/shared/domain';

export const environment: IEnvironment = {
  production: true,
  ...PhilippinesCountry,
};
