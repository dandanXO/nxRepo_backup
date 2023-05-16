import { IEnvironment } from '../app/modules/appEnvironment/IEnvironment';
import { IndiaCountry } from '../../../../libs/shared/domain/src/country/IndiaCountry';

export const environment: IEnvironment = {
  production: true,
  ...IndiaCountry,
};
