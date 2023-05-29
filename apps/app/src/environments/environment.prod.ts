import { BangladeshCountry } from '../../../../libs/shared/domain/src/country/BangladeshCountry';
import { IEnvironment } from '../app/modules/appEnvironment/IEnvironment';

export const environment: IEnvironment = {
  production: true,
  ...BangladeshCountry,
};
