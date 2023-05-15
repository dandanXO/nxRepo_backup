import { IEnvironment } from '../app/modules/environment/IEnvironment';
import { BangladeshCountry } from '../../../../libs/shared/domain/src/country/BangladeshCountry';

export const environment: IEnvironment = {
  production: true,
  ...BangladeshCountry,
};
