import { IEnvironment, IndiaCountry } from '@frontend/shared/domain';

export const environment: IEnvironment = {
  production: false,
  ...IndiaCountry,
};
