import { PakistanCountry } from '../../../../libs/shared/domain/src/country/PakistanCountry';
import { IEnvironment } from '../../../../libs/shared/domain/src/Environment/types/IEnvironment';

export const environment: IEnvironment = {
  production: true,
  ...PakistanCountry,
};
