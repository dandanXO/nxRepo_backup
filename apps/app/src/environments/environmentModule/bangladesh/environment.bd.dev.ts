import { BangladeshCountry } from '../../../../../../libs/shared/domain/src/country/BangladeshCountry';
import { IEnvironment } from '../../../../../../libs/shared/domain/src/environment/types/IEnvironment';

export const environment: IEnvironment = {
  production: false,
  ...BangladeshCountry,
};
