import { IndiaCountry } from '../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { IEnvironment } from '../../../../../../libs/shared/domain/src/environment/types/IEnvironment';

export const environment: IEnvironment = {
  production: true,
  ...IndiaCountry,
};
