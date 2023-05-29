import { IndiaCountry } from '../../../../libs/shared/domain/src/country/IndiaCountry';
import { IEnvironment } from '../app/modules/appEnvironment/IEnvironment';

export const environment: IEnvironment = {
  production: false,
  ...IndiaCountry,
};
