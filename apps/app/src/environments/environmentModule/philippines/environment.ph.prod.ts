import { IEnvironment } from '../../../../../../libs/shared/domain/src/environment/types/IEnvironment';
import { PhilippinesCountry } from 'libs/shared/domain/src/country/PhilippinesCountry';

export const environment: IEnvironment = {
  production: true,
  ...PhilippinesCountry,
};
