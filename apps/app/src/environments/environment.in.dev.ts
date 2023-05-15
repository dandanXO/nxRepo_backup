import { IEnvironment } from '../app/modules/environment/IEnvironment';
import { IndiaCountry } from '../../../../libs/shared/domain/src/country/IndiaCountry';

export const environment: IEnvironment = {
  production: false,
  ...IndiaCountry,
};
